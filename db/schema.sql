-- ============================================================
-- Martin Solutions — D1 Database Schema
-- Run: wrangler d1 execute martin-solutions-db --file=db/schema.sql
-- ============================================================

-- Admin users (for dashboard access)
CREATE TABLE IF NOT EXISTS admin_users (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  email       TEXT NOT NULL UNIQUE,
  password    TEXT NOT NULL, -- bcrypt hashed
  name        TEXT NOT NULL,
  role        TEXT NOT NULL DEFAULT 'admin', -- admin | super_admin
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_login  DATETIME
);

-- Certified reviews
CREATE TABLE IF NOT EXISTS reviews (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  name          TEXT NOT NULL,
  company       TEXT,
  email         TEXT NOT NULL,
  rating        INTEGER NOT NULL CHECK(rating BETWEEN 1 AND 5),
  title         TEXT NOT NULL,
  content       TEXT NOT NULL,
  project       TEXT, -- which Martin Solutions project this references
  status        TEXT NOT NULL DEFAULT 'pending', -- pending | approved | rejected
  reject_reason TEXT,
  certified     BOOLEAN DEFAULT FALSE,
  submitted_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  reviewed_at   DATETIME,
  reviewed_by   INTEGER REFERENCES admin_users(id)
);

-- Newsletter subscribers
CREATE TABLE IF NOT EXISTS subscribers (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  email           TEXT NOT NULL UNIQUE,
  name            TEXT,
  status          TEXT NOT NULL DEFAULT 'pending', -- pending | confirmed | unsubscribed
  confirm_token   TEXT UNIQUE,
  subscribed_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
  confirmed_at    DATETIME,
  unsubscribed_at DATETIME,
  source          TEXT DEFAULT 'website' -- website | manual | import
);

-- Newsletter issues (archive)
CREATE TABLE IF NOT EXISTS newsletters (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  title        TEXT NOT NULL,
  slug         TEXT NOT NULL UNIQUE,
  content      TEXT NOT NULL, -- markdown or HTML
  summary      TEXT,
  status       TEXT NOT NULL DEFAULT 'draft', -- draft | sent
  sent_at      DATETIME,
  created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_by   INTEGER REFERENCES admin_users(id)
);

-- Contact form submissions
CREATE TABLE IF NOT EXISTS contacts (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  company     TEXT,
  subject     TEXT NOT NULL,
  message     TEXT NOT NULL,
  status      TEXT NOT NULL DEFAULT 'new', -- new | read | replied | archived
  submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  replied_at  DATETIME
);

-- Blog posts
CREATE TABLE IF NOT EXISTS posts (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  title        TEXT NOT NULL,
  slug         TEXT NOT NULL UNIQUE,
  content      TEXT NOT NULL, -- markdown
  excerpt      TEXT,
  status       TEXT NOT NULL DEFAULT 'draft', -- draft | published
  tags         TEXT, -- JSON array of tags
  published_at DATETIME,
  created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_by   INTEGER REFERENCES admin_users(id)
);

-- Showcase entries (dynamic, managed from admin)
CREATE TABLE IF NOT EXISTS showcases (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  title          TEXT NOT NULL,
  slug           TEXT NOT NULL UNIQUE,
  category       TEXT NOT NULL, -- live-demo | industry-spotlight | before-after | future-forecast | build-log
  tagline        TEXT NOT NULL,
  description    TEXT NOT NULL,
  problem        TEXT,
  solution       TEXT,
  impact         TEXT,
  status         TEXT NOT NULL DEFAULT 'draft', -- draft | published
  published_at   DATETIME,
  created_at     DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at     DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_by     INTEGER REFERENCES admin_users(id)
);

-- AI demo usage tracking (analytics)
CREATE TABLE IF NOT EXISTS ai_usage (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  feature     TEXT NOT NULL, -- chat | analyze | summarize
  input_chars INTEGER,
  output_chars INTEGER,
  model       TEXT,
  duration_ms INTEGER,
  ip_hash     TEXT, -- hashed IP for rate limiting, not tracking
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Rate limiting helper
CREATE TABLE IF NOT EXISTS rate_limits (
  key         TEXT PRIMARY KEY, -- e.g. "ai:192.168.x.x" or "contact:email@test.com"
  count       INTEGER NOT NULL DEFAULT 1,
  window_start DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_reviews_status ON reviews(status);
CREATE INDEX IF NOT EXISTS idx_subscribers_status ON subscribers(status);
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_posts_status_published ON posts(status, published_at);
CREATE INDEX IF NOT EXISTS idx_showcases_status ON showcases(status);
CREATE INDEX IF NOT EXISTS idx_ai_usage_feature ON ai_usage(feature, created_at);
CREATE INDEX IF NOT EXISTS idx_rate_limits_key ON rate_limits(key);
