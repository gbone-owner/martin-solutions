// POST /api/ai/summarize — AI text summarizer demo
// Visitors paste text and get an AI-generated summary

import { Env, json, error, checkRateLimit, hashIP } from '../_helpers';

interface SummarizeBody {
  text: string;
  style?: 'concise' | 'detailed' | 'bullet-points';
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const body = (await request.json()) as SummarizeBody;

  if (!body.text || body.text.trim().length < 50) {
    return error('Please provide at least 50 characters of text to summarize');
  }

  if (body.text.length > 10000) {
    return error('Text too long (max 10,000 characters for demo)');
  }

  // Rate limit: 10 summaries per hour per IP
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const allowed = await checkRateLimit(env.DB, `ai-summarize:${ip}`, 10, 60 * 60 * 1000);
  if (!allowed) {
    return error('Rate limit reached. Please try again later.', 429);
  }

  const style = body.style || 'concise';
  const styleInstructions: Record<string, string> = {
    'concise': 'Provide a brief 2-3 sentence summary capturing the key points.',
    'detailed': 'Provide a thorough summary covering all main points in 1-2 paragraphs.',
    'bullet-points': 'Summarize as 3-5 clear bullet points, each one sentence.',
  };

  const startTime = Date.now();

  try {
    const response = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
      messages: [
        {
          role: 'system',
          content: `You are a professional text summarizer. ${styleInstructions[style]} Be accurate and don't add information not in the original text.`,
        },
        {
          role: 'user',
          content: `Summarize the following text:\n\n${body.text}`,
        },
      ],
      max_tokens: 512,
      temperature: 0.3,
    });

    const duration = Date.now() - startTime;
    const summary = (response as { response: string }).response;

    // Log usage
    const ipHash = await hashIP(ip);
    await env.DB.prepare(
      'INSERT INTO ai_usage (feature, input_chars, output_chars, model, duration_ms, ip_hash) VALUES (?, ?, ?, ?, ?, ?)'
    )
      .bind('summarize', body.text.length, summary.length, 'llama-3.1-8b', duration, ipHash)
      .run();

    return json({
      summary,
      style,
      input_length: body.text.length,
      output_length: summary.length,
      duration_ms: duration,
    });
  } catch (err) {
    console.error('AI summarize error:', err);
    return error('AI service temporarily unavailable. Please try again.', 503);
  }
};
