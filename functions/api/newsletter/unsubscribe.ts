// GET /api/newsletter/unsubscribe?email=xxx&token=xxx — Unsubscribe from newsletter

import { Env } from '../_helpers';

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const email = url.searchParams.get('email');

  if (!email) {
    return new Response('Missing email parameter', { status: 400 });
  }

  const subscriber = await context.env.DB.prepare(
    "SELECT * FROM subscribers WHERE email = ? AND status = 'confirmed'"
  )
    .bind(email.toLowerCase())
    .first();

  if (!subscriber) {
    return new Response(renderPage('Not Found', 'This email is not in our subscriber list.'), {
      headers: { 'Content-Type': 'text/html' },
    });
  }

  await context.env.DB.prepare(
    "UPDATE subscribers SET status = 'unsubscribed', unsubscribed_at = CURRENT_TIMESTAMP WHERE email = ?"
  )
    .bind(email.toLowerCase())
    .run();

  return new Response(
    renderPage('Unsubscribed', 'You have been removed from the Martin Solutions newsletter. You can resubscribe anytime from our website.'),
    { headers: { 'Content-Type': 'text/html' } }
  );
};

function renderPage(title: string, message: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — Martin Solutions</title>
</head>
<body style="font-family: 'Inter', sans-serif; background: #f8f9fa; margin: 0; padding: 40px 20px; display: flex; justify-content: center; align-items: center; min-height: 100vh;">
  <div style="background: white; border-radius: 16px; padding: 48px; max-width: 480px; text-align: center; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
    <h1 style="color: #1A5276; margin: 0 0 12px; font-size: 24px;">${title}</h1>
    <p style="color: #7F8C8D; line-height: 1.6;">${message}</p>
    <a href="https://martin.solutions" style="display: inline-block; background: #1A5276; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 24px;">
      Visit Martin Solutions
    </a>
  </div>
</body>
</html>`;
}
