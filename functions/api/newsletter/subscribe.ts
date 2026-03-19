// POST /api/newsletter/subscribe — Subscribe to newsletter (double opt-in)

import { Env, json, error, validateEmail, sanitize, checkRateLimit } from '../_helpers';

interface SubscribeBody {
  email: string;
  name?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const body = (await request.json()) as SubscribeBody;

  if (!body.email || !validateEmail(body.email)) {
    return error('Valid email address is required');
  }

  const email = body.email.trim().toLowerCase();

  // Rate limit: 5 subscribe attempts per hour per IP
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const allowed = await checkRateLimit(env.DB, `subscribe:${ip}`, 5, 60 * 60 * 1000);
  if (!allowed) {
    return error('Too many attempts. Please try again later.', 429);
  }

  // Check if already subscribed
  const existing = await env.DB.prepare('SELECT * FROM subscribers WHERE email = ?')
    .bind(email)
    .first<{ status: string }>();

  if (existing) {
    if (existing.status === 'confirmed') {
      return json({ message: 'You are already subscribed!' });
    }
    if (existing.status === 'unsubscribed') {
      // Re-subscribe: generate new token
      const token = crypto.randomUUID();
      await env.DB.prepare(
        `UPDATE subscribers SET status = 'pending', confirm_token = ?, subscribed_at = CURRENT_TIMESTAMP
         WHERE email = ?`
      )
        .bind(token, email)
        .run();

      await sendConfirmationEmail(env, email, body.name || '', token);
      return json({ message: 'Welcome back! Check your email to confirm.' });
    }
    // Status is pending — resend confirmation
    return json({ message: 'Confirmation email already sent. Check your inbox.' });
  }

  // New subscriber
  const token = crypto.randomUUID();
  await env.DB.prepare(
    'INSERT INTO subscribers (email, name, confirm_token) VALUES (?, ?, ?)'
  )
    .bind(email, body.name ? sanitize(body.name) : null, token)
    .run();

  await sendConfirmationEmail(env, email, body.name || '', token);

  return json({ message: 'Check your email to confirm your subscription.' }, 201);
};

async function sendConfirmationEmail(env: Env, email: string, name: string, token: string) {
  const confirmUrl = `${env.SITE_URL || 'https://martin.solutions'}/api/newsletter/confirm?token=${token}`;
  const greeting = name ? `Hi ${name}` : 'Hi';

  if (!env.RESEND_API_KEY) {
    console.log(`[Newsletter] Confirmation URL for ${email}: ${confirmUrl}`);
    return; // Skip email if Resend not configured
  }

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Martin Solutions <newsletter@martin.solutions>',
      to: email,
      subject: 'Confirm your subscription — Martin Solutions',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1A5276;">${greeting},</h2>
          <p>Thanks for subscribing to the Martin Solutions newsletter.</p>
          <p>Click the button below to confirm your subscription:</p>
          <a href="${confirmUrl}" style="display: inline-block; background: #1A5276; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin: 16px 0;">
            Confirm Subscription
          </a>
          <p style="color: #7F8C8D; font-size: 14px;">If you didn't subscribe, you can safely ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #D6EAF8; margin: 24px 0;" />
          <p style="color: #7F8C8D; font-size: 12px;">Martin Solutions — AI Tools for Business</p>
        </div>
      `,
    }),
  });
}
