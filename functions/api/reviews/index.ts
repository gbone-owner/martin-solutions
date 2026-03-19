// GET  /api/reviews         — Public: get approved reviews
// POST /api/reviews         — Public: submit a new review

import { Env, json, error, success, sanitize, validateEmail, verifyTurnstile, checkRateLimit } from '../_helpers';

interface ReviewSubmission {
  name: string;
  company?: string;
  email: string;
  rating: number;
  title: string;
  content: string;
  project?: string;
  turnstileToken?: string;
}

// GET — Public list of approved, certified reviews
export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env } = context;
  const url = new URL(context.request.url);
  const limit = Math.min(parseInt(url.searchParams.get('limit') || '20'), 50);
  const offset = parseInt(url.searchParams.get('offset') || '0');

  const reviews = await env.DB.prepare(
    `SELECT id, name, company, rating, title, content, project, certified, submitted_at
     FROM reviews
     WHERE status = 'approved' AND certified = TRUE
     ORDER BY submitted_at DESC
     LIMIT ? OFFSET ?`
  )
    .bind(limit, offset)
    .all();

  const total = await env.DB.prepare(
    "SELECT COUNT(*) as count FROM reviews WHERE status = 'approved' AND certified = TRUE"
  ).first<{ count: number }>();

  return json({
    reviews: reviews.results,
    total: total?.count || 0,
    limit,
    offset,
  });
};

// POST — Submit a new review (goes to moderation queue)
export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const body = (await request.json()) as ReviewSubmission;

  // Validate
  if (!body.name || !body.email || !body.rating || !body.title || !body.content) {
    return error('Name, email, rating, title, and content are required');
  }

  if (!validateEmail(body.email)) {
    return error('Invalid email address');
  }

  if (body.rating < 1 || body.rating > 5) {
    return error('Rating must be between 1 and 5');
  }

  if (body.content.length < 20) {
    return error('Review must be at least 20 characters');
  }

  // Turnstile verification
  if (env.TURNSTILE_SECRET) {
    const ip = request.headers.get('CF-Connecting-IP') || '';
    const turnstileValid = await verifyTurnstile(
      body.turnstileToken || '',
      env.TURNSTILE_SECRET,
      ip
    );
    if (!turnstileValid) {
      return error('Captcha verification failed', 403);
    }
  }

  // Rate limit: 3 reviews per hour per email
  const allowed = await checkRateLimit(env.DB, `review:${body.email}`, 3, 60 * 60 * 1000);
  if (!allowed) {
    return error('Too many submissions. Please try again later.', 429);
  }

  // Insert
  await env.DB.prepare(
    `INSERT INTO reviews (name, company, email, rating, title, content, project)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(
      sanitize(body.name),
      body.company ? sanitize(body.company) : null,
      body.email.trim().toLowerCase(),
      body.rating,
      sanitize(body.title),
      sanitize(body.content),
      body.project ? sanitize(body.project) : null
    )
    .run();

  return json({ message: 'Review submitted. It will appear after certification.' }, 201);
};
