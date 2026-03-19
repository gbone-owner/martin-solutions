// POST /api/admin/auth — Admin login
// POST /api/admin/auth?action=setup — First-time admin setup

import { Env, json, error, verifyPassword, hashPassword, createToken } from '../_helpers';

interface LoginBody {
  email: string;
  password: string;
}

interface SetupBody {
  email: string;
  password: string;
  name: string;
  setupKey: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const url = new URL(request.url);

  // --- First-time setup ---
  if (url.searchParams.get('action') === 'setup') {
    const body = (await request.json()) as SetupBody;

    // Check if any admin exists
    const existing = await env.DB.prepare('SELECT COUNT(*) as count FROM admin_users').first<{ count: number }>();
    if (existing && existing.count > 0) {
      return error('Admin already exists. Use login instead.', 403);
    }

    if (!body.email || !body.password || !body.name) {
      return error('Email, password, and name are required');
    }

    if (body.password.length < 8) {
      return error('Password must be at least 8 characters');
    }

    const hashed = await hashPassword(body.password);
    await env.DB.prepare(
      'INSERT INTO admin_users (email, password, name, role) VALUES (?, ?, ?, ?)'
    )
      .bind(body.email, hashed, body.name, 'super_admin')
      .run();

    const token = await createToken(
      { email: body.email, role: 'super_admin' },
      env.ADMIN_JWT_SECRET
    );

    return json({ token, message: 'Admin account created' });
  }

  // --- Normal login ---
  const body = (await request.json()) as LoginBody;

  if (!body.email || !body.password) {
    return error('Email and password are required');
  }

  const user = await env.DB.prepare('SELECT * FROM admin_users WHERE email = ?')
    .bind(body.email)
    .first<{ id: number; email: string; password: string; name: string; role: string }>();

  if (!user) {
    return error('Invalid credentials', 401);
  }

  const valid = await verifyPassword(body.password, user.password);
  if (!valid) {
    return error('Invalid credentials', 401);
  }

  // Update last login
  await env.DB.prepare('UPDATE admin_users SET last_login = CURRENT_TIMESTAMP WHERE id = ?')
    .bind(user.id)
    .run();

  const token = await createToken(
    { id: user.id, email: user.email, name: user.name, role: user.role },
    env.ADMIN_JWT_SECRET
  );

  return json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
};
