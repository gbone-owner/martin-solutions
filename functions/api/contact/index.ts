// POST /api/contact — Handle contact form submissions

import { Env, json, error, sanitize, validateEmail, verifyTurnstile, checkRateLimit } from '../_helpers';

interface ContactBody {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  turnstileToken?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const body = (await request.json()) as ContactBody;

  // Validate
  if (!body.name || !body.email || !body.subject || !body.message) {
    return error('Name, email, subject, and message are required');
  }

  if (!validateEmail(body.email)) {
    return error('Invalid email address');
  }

  if (body.message.length < 10) {
    return error('Message must be at least 10 characters');
  }

  // Turnstile
  if (env.TURNSTILE_SECRET) {
    const ip = request.headers.get('CF-Connecting-IP') || '';
    const valid = await verifyTurnstile(body.turnstileToken || '', env.TURNSTILE_SECRET, ip);
    if (!valid) {
      return error('Captcha verification failed', 403);
    }
  }

  // Rate limit: 5 messages per hour per IP
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const allowed = await checkRateLimit(env.DB, `contact:${ip}`, 5, 60 * 60 * 1000);
  if (!allowed) {
    return error('Too many messages. Please try again later.', 429);
  }

  // Store in database
  await env.DB.prepare(
    'INSERT INTO contacts (name, email, company, subject, message) VALUES (?, ?, ?, ?, ?)'
  )
    .bind(
      sanitize(body.name),
      body.email.trim().toLowerCase(),
      body.company ? sanitize(body.company) : null,
      sanitize(body.subject),
      sanitize(body.message)
    )
    .run();

  // Send notification email to Martin
  if (env.RESEND_API_KEY) {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Martin Solutions <noreply@martin.solutions>',
        to: 'martin@gbone.no',
        subject: `New contact: ${body.subject}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px;">
            <h2 style="color: #1A5276;">New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${sanitize(body.name)}</p>
            <p><strong>Email:</strong> ${body.email}</p>
            ${body.company ? `<p><strong>Company:</strong> ${sanitize(body.company)}</p>` : ''}
            <p><strong>Subject:</strong> ${sanitize(body.subject)}</p>
            <hr style="border: none; border-top: 1px solid #D6EAF8;" />
            <p>${sanitize(body.message)}</p>
          </div>
        `,
      }),
    });
  }

  return json({ message: 'Message sent! I\'ll get back to you soon.' }, 201);
};

// GET /api/contact — Admin: list contact submissions
export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env, request } = context;

  // Require auth for listing contacts
  const auth = request.headers.get('Authorization');
  if (!auth || !auth.startsWith('Bearer ')) {
    return error('Unauthorized', 401);
  }

  const url = new URL(request.url);
  const status = url.searchParams.get('status') || 'new';

  const contacts = await env.DB.prepare(
    'SELECT * FROM contacts WHERE status = ? ORDER BY submitted_at DESC LIMIT 50'
  )
    .bind(status)
    .all();

  return json(contacts.results);
};
