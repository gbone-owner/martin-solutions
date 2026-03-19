// GET /api/newsletter/confirm?token=xxx — Confirm newsletter subscription (double opt-in)

import { Env } from '../_helpers';

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const token = url.searchParams.get('token');

  if (!token) {
    return new Response(renderPage('Invalid Link', 'No confirmation token provided.', false), {
      headers: { 'Content-Type': 'text/html' },
      status: 400,
    });
  }

  const subscriber = await context.env.DB.prepare(
    "SELECT * FROM subscribers WHERE confirm_token = ? AND status = 'pending'"
  )
    .bind(token)
    .first<{ email: string }>();

  if (!subscriber) {
    return new Response(
      renderPage(
        'Already Confirmed',
        'This subscription is already confirmed, or the link has expired.',
        true
      ),
      { headers: { 'Content-Type': 'text/html' } }
    );
  }

  await context.env.DB.prepare(
    `UPDATE subscribers
     SET status = 'confirmed', confirmed_at = CURRENT_TIMESTAMP, confirm_token = NULL
     WHERE confirm_token = ?`
  )
    .bind(token)
    .run();

  return new Response(
    renderPage(
      'Subscription Confirmed!',
      `Welcome aboard! You'll receive our newsletter with AI insights, product updates, and industry analysis.`,
      true
    ),
    { headers: { 'Content-Type': 'text/html' } }
  );
};

function renderPage(title: string, message: string, success: boolean): string {
  const color = success ? '#27AE60' : '#E74C3C';
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — Martin Solutions</title>
</head>
<body style="font-family: 'Inter', sans-serif; background: #f8f9fa; margin: 0; padding: 40px 20px; display: flex; justify-content: center; align-items: center; min-height: 100vh;">
  <div style="background: white; border-radius: 16px; padding: 48px; max-width: 480px; text-align: center; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
    <div style="width: 64px; height: 64px; border-radius: 50%; background: ${color}20; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center;">
      <span style="font-size: 28px;">${success ? '✓' : '✕'}</span>
    </div>
    <h1 style="color: #1A5276; margin: 0 0 12px; font-size: 24px;">${title}</h1>
    <p style="color: #7F8C8D; line-height: 1.6;">${message}</p>
    <a href="https://martin.solutions" style="display: inline-block; background: #1A5276; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 24px;">
      Visit Martin Solutions
    </a>
  </div>
</body>
</html>`;
}
