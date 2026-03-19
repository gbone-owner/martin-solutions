// GET    /api/reviews/:id          — Admin: get single review details
// PATCH  /api/reviews/:id          — Admin: approve or reject a review
// DELETE /api/reviews/:id          — Admin: permanently delete (use sparingly)

import { Env, json, error, requireAuth } from '../_helpers';

interface ReviewAction {
  action: 'approve' | 'reject';
  reject_reason?: string;
}

// GET — Admin: single review with full details
export const onRequestGet: PagesFunction<Env> = async (context) => {
  const auth = await requireAuth(context.request, context.env);
  if (auth instanceof Response) return auth;

  const id = context.params.id;
  const review = await context.env.DB.prepare('SELECT * FROM reviews WHERE id = ?')
    .bind(id)
    .first();

  if (!review) return error('Review not found', 404);
  return json(review);
};

// PATCH — Admin: approve or reject
export const onRequestPatch: PagesFunction<Env> = async (context) => {
  const auth = await requireAuth(context.request, context.env);
  if (auth instanceof Response) return auth;

  const id = context.params.id;
  const body = (await context.request.json()) as ReviewAction;

  if (!body.action || !['approve', 'reject'].includes(body.action)) {
    return error('Action must be "approve" or "reject"');
  }

  const review = await context.env.DB.prepare('SELECT * FROM reviews WHERE id = ?')
    .bind(id)
    .first();

  if (!review) return error('Review not found', 404);

  if (body.action === 'approve') {
    await context.env.DB.prepare(
      `UPDATE reviews
       SET status = 'approved', certified = TRUE, reviewed_at = CURRENT_TIMESTAMP, reviewed_by = ?
       WHERE id = ?`
    )
      .bind((auth as Record<string, unknown>).id, id)
      .run();

    return json({ message: 'Review approved and certified' });
  }

  if (body.action === 'reject') {
    if (!body.reject_reason) {
      return error('Reject reason is required');
    }

    await context.env.DB.prepare(
      `UPDATE reviews
       SET status = 'rejected', reject_reason = ?, reviewed_at = CURRENT_TIMESTAMP, reviewed_by = ?
       WHERE id = ?`
    )
      .bind(body.reject_reason, (auth as Record<string, unknown>).id, id)
      .run();

    return json({ message: 'Review rejected' });
  }

  return error('Invalid action');
};

// Admin: list all reviews (including pending/rejected)
export const onRequestGetAll: PagesFunction<Env> = async (context) => {
  const auth = await requireAuth(context.request, context.env);
  if (auth instanceof Response) return auth;

  const url = new URL(context.request.url);
  const status = url.searchParams.get('status') || 'pending';

  const reviews = await context.env.DB.prepare(
    'SELECT * FROM reviews WHERE status = ? ORDER BY submitted_at DESC'
  )
    .bind(status)
    .all();

  return json(reviews.results);
};
