// ============================================================
// Frontend API helper — talks to our Cloudflare Pages Functions
// ============================================================

const API_BASE = '/api';

export async function apiPost<T = unknown>(endpoint: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error((data as { error?: string }).error || 'Something went wrong');
  }
  return data as T;
}

export async function apiGet<T = unknown>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error((data as { error?: string }).error || 'Something went wrong');
  }
  return data as T;
}

// --- AI API types ---

export interface ChatResponse {
  reply: string;
  model: string;
  duration_ms: number;
}

export interface SummarizeResponse {
  summary: string;
  style: string;
  input_length: number;
  output_length: number;
  duration_ms: number;
}

export interface AnalyzeResponse {
  sentiment: string;
  sentiment_score: number;
  key_topics: string[];
  entities: string[];
  tone: string;
  summary: string;
  action_items: string[];
  word_count: number;
  reading_time_seconds: number;
  input_length: number;
  duration_ms: number;
  document_type: string;
  raw_response?: string;
  parse_note?: string;
}
