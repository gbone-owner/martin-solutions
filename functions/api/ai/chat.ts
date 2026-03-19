// POST /api/ai/chat — AI chatbot that knows about Martin Solutions
// Visitors can ask questions about AI, the company, and its tools

import { Env, json, error, checkRateLimit, hashIP } from '../_helpers';

interface ChatBody {
  message: string;
  history?: { role: 'user' | 'assistant'; content: string }[];
}

const SYSTEM_PROMPT = `You are the Martin Solutions AI assistant. You represent Martin Solutions, a company that builds high-quality AI tools for businesses.

Core philosophy:
- AI will reshape how we work. The question isn't whether to embrace it — it's whether to do it right.
- We believe in human-AI coexistence: AI amplifying human capability, not replacing human purpose.
- Quality over speed. We ship when it's ready, not when it's rushed.

Our products:
- DocuFlow AI: Intelligent document processing (classification, extraction, 97%+ accuracy)
- InsightEngine: AI-powered business analytics with natural language queries
- ReplyHub: AI-powered customer communication that maintains a human touch

Your behavior:
- Be helpful, confident, and knowledgeable about AI
- Keep responses concise (2-3 paragraphs max)
- If asked about pricing or specifics you don't know, direct them to the contact page
- Embody the Martin Solutions brand: professional, approachable, future-forward
- Never make up technical claims or statistics
- If the question is unrelated to AI or business, politely redirect`;

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const body = (await request.json()) as ChatBody;

  if (!body.message || body.message.trim().length === 0) {
    return error('Message is required');
  }

  if (body.message.length > 2000) {
    return error('Message too long (max 2000 characters)');
  }

  // Rate limit: 20 messages per hour per IP
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const allowed = await checkRateLimit(env.DB, `ai-chat:${ip}`, 20, 60 * 60 * 1000);
  if (!allowed) {
    return error('Rate limit reached. Please try again later.', 429);
  }

  const startTime = Date.now();

  // Build messages array with history
  const messages = [
    { role: 'system' as const, content: SYSTEM_PROMPT },
    ...(body.history || []).slice(-6), // Keep last 6 messages for context
    { role: 'user' as const, content: body.message },
  ];

  try {
    const response = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
      messages,
      max_tokens: 512,
      temperature: 0.7,
    });

    const duration = Date.now() - startTime;
    const reply = (response as { response: string }).response;

    // Log usage (privacy-friendly)
    const ipHash = await hashIP(ip);
    await env.DB.prepare(
      'INSERT INTO ai_usage (feature, input_chars, output_chars, model, duration_ms, ip_hash) VALUES (?, ?, ?, ?, ?, ?)'
    )
      .bind('chat', body.message.length, reply.length, 'llama-3.1-8b', duration, ipHash)
      .run();

    return json({ reply, model: 'llama-3.1-8b', duration_ms: duration });
  } catch (err) {
    console.error('AI chat error:', err);
    return error('AI service temporarily unavailable. Please try again.', 503);
  }
};
