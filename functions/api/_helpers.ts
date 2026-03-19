// ============================================================
// Shared helpers for all API routes
// ============================================================

export interface Env {
  DB: D1Database;
  AI: Ai;
  ADMIN_JWT_SECRET: string;
  RESEND_API_KEY: string;
  TURNSTILE_SECRET: string;
  SITE_URL: string;
}

// --- Response helpers ---

export function json(data: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      ...headers,
    },
  });
}

export function error(message: string, status = 400) {
  return json({ error: message }, status);
}

export function success(data: unknown = { ok: true }) {
  return json(data);
}

// --- Auth helpers ---

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  const salt = crypto.randomUUID();
  const saltedData = encoder.encode(salt + password);
  const saltedHash = await crypto.subtle.digest('SHA-256', saltedData);
  return salt + ':' + arrayBufferToHex(saltedHash);
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [salt, hash] = stored.split(':');
  const encoder = new TextEncoder();
  const saltedData = encoder.encode(salt + password);
  const saltedHash = await crypto.subtle.digest('SHA-256', saltedData);
  return arrayBufferToHex(saltedHash) === hash;
}

function arrayBufferToHex(buffer: ArrayBuffer): string {
  return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function createToken(payload: Record<string, unknown>, secret: string): Promise<string> {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = btoa(JSON.stringify({ ...payload, exp: Date.now() + 24 * 60 * 60 * 1000 }));
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(`${header}.${body}`));
  return `${header}.${body}.${arrayBufferToHex(signature)}`;
}

export async function verifyToken(token: string, secret: string): Promise<Record<string, unknown> | null> {
  try {
    const [header, body, sig] = token.split('.');
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );
    const valid = await crypto.subtle.verify(
      'HMAC',
      key,
      hexToArrayBuffer(sig),
      encoder.encode(`${header}.${body}`)
    );
    if (!valid) return null;
    const payload = JSON.parse(atob(body));
    if (payload.exp && payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

function hexToArrayBuffer(hex: string): ArrayBuffer {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
  }
  return bytes.buffer;
}

export async function requireAuth(request: Request, env: Env): Promise<Record<string, unknown> | Response> {
  const auth = request.headers.get('Authorization');
  if (!auth || !auth.startsWith('Bearer ')) {
    return error('Unauthorized', 401);
  }
  const payload = await verifyToken(auth.slice(7), env.ADMIN_JWT_SECRET);
  if (!payload) {
    return error('Invalid or expired token', 401);
  }
  return payload;
}

// --- Turnstile verification ---

export async function verifyTurnstile(token: string, secret: string, ip: string): Promise<boolean> {
  if (!secret) return true; // skip if not configured
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret, response: token, remoteip: ip }),
  });
  const data = (await res.json()) as { success: boolean };
  return data.success;
}

// --- Rate limiting ---

export async function checkRateLimit(
  db: D1Database,
  key: string,
  maxRequests: number,
  windowMs: number
): Promise<boolean> {
  const now = new Date().toISOString();
  const windowStart = new Date(Date.now() - windowMs).toISOString();

  // Clean old entries and check
  await db.prepare('DELETE FROM rate_limits WHERE window_start < ?').bind(windowStart).run();

  const existing = await db
    .prepare('SELECT count FROM rate_limits WHERE key = ? AND window_start > ?')
    .bind(key, windowStart)
    .first<{ count: number }>();

  if (existing && existing.count >= maxRequests) {
    return false; // rate limited
  }

  if (existing) {
    await db.prepare('UPDATE rate_limits SET count = count + 1 WHERE key = ?').bind(key).run();
  } else {
    await db.prepare('INSERT INTO rate_limits (key, count, window_start) VALUES (?, 1, ?)').bind(key, now).run();
  }

  return true;
}

// --- Validation ---

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function sanitize(input: string): string {
  return input.replace(/[<>]/g, '').trim();
}

// --- IP hashing (privacy-friendly) ---

export async function hashIP(ip: string): Promise<string> {
  const encoder = new TextEncoder();
  const hash = await crypto.subtle.digest('SHA-256', encoder.encode(ip + 'martin-solutions-salt'));
  return arrayBufferToHex(hash).substring(0, 16);
}
