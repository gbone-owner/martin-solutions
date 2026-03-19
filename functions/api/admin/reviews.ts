// GET /api/admin/reviews          — List reviews by status (for admin dashboard)
// GET /api/admin/reviews?status=pending|approved|rejected

import { Env, json, error, requireAuth } from '../_helpers';

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const auth = await requireAuth(context.request, context.env);
  if (auth instanceof Response) return auth;

  const url = new URL(context.request.url);
  const status = url.searchParams.get('status'); // null = all
  const limit = Math.min(parseInt(url.searchParams.get('limit') || '50'), 100);
  const offset = parseInt(url.searchParams.get('offset') || '0');

  let query: string;
  let params: unknown[];

  if (status) {
    query = 'SELECT * FROM reviews WHERE status = ? ORDER BY submitted_at DESC LIMIT ? OFFSET ?';
    params = [status, limit, offset];
  } else {
    query = 'SELECT * FROM reviews ORDER BY submitted_at DESC LIMIT ? OFFSET ?';
    params = [limit, offset];
  }

  const reviews = await context.env.DB.prepare(query).bind(...params).all();

  // Get counts per status
  const counts = await context.env.DB.prepare(
    `SELECT
       COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending,
       COUNT(CASE WHEN status = 'approved' THEN 1 END) as approved,
       COUNT(CASE WHEN status = 'rejected' THEN 1 END) as rejected
     FROM reviews`
  ).first<{ pending: number; approved: number; rejected: number }>();

  return json({
    reviews: reviews.results,
    counts,
    limit,
    offset,
  });
};
