// POST /api/ai/analyze — AI text/document analysis demo
// Visitors paste text and get AI-powered analysis (sentiment, key topics, entities, actionable insights)

import { Env, json, error, checkRateLimit, hashIP } from '../_helpers';

interface AnalyzeBody {
  text: string;
  type?: 'general' | 'email' | 'report' | 'feedback';
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const body = (await request.json()) as AnalyzeBody;

  if (!body.text || body.text.trim().length < 30) {
    return error('Please provide at least 30 characters of text to analyze');
  }

  if (body.text.length > 10000) {
    return error('Text too long (max 10,000 characters for demo)');
  }

  // Rate limit: 10 analyses per hour per IP
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const allowed = await checkRateLimit(env.DB, `ai-analyze:${ip}`, 10, 60 * 60 * 1000);
  if (!allowed) {
    return error('Rate limit reached. Please try again later.', 429);
  }

  const docType = body.type || 'general';
  const typeContext: Record<string, string> = {
    general: 'a general text document',
    email: 'a business email',
    report: 'a business report or document',
    feedback: 'customer feedback or a review',
  };

  const startTime = Date.now();

  try {
    const response = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
      messages: [
        {
          role: 'system',
          content: `You are an expert business document analyzer. Analyze the provided text as ${typeContext[docType]}. Return a JSON object (and ONLY the JSON, no markdown) with these fields:

{
  "sentiment": "positive" | "negative" | "neutral" | "mixed",
  "sentiment_score": 0.0 to 1.0 (0 = very negative, 1 = very positive),
  "key_topics": ["topic1", "topic2", "topic3"],
  "entities": ["entity1", "entity2"],
  "tone": "formal" | "informal" | "urgent" | "persuasive" | "informative",
  "summary": "One sentence summary",
  "action_items": ["action1", "action2"],
  "word_count": number,
  "reading_time_seconds": number
}

Be accurate and concise. Only include action items if the text implies actions needed.`,
        },
        {
          role: 'user',
          content: body.text,
        },
      ],
      max_tokens: 512,
      temperature: 0.2,
    });

    const duration = Date.now() - startTime;
    const rawResponse = (response as { response: string }).response;

    // Try to parse as JSON, fall back to raw response
    let analysis;
    try {
      // Clean up potential markdown wrapping
      const cleaned = rawResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      analysis = JSON.parse(cleaned);
    } catch {
      analysis = {
        raw_response: rawResponse,
        parse_note: 'AI returned non-standard format, showing raw analysis',
      };
    }

    // Add metadata
    analysis.input_length = body.text.length;
    analysis.duration_ms = duration;
    analysis.document_type = docType;

    // Log usage
    const ipHash = await hashIP(ip);
    await env.DB.prepare(
      'INSERT INTO ai_usage (feature, input_chars, output_chars, model, duration_ms, ip_hash) VALUES (?, ?, ?, ?, ?, ?)'
    )
      .bind('analyze', body.text.length, rawResponse.length, 'llama-3.1-8b', duration, ipHash)
      .run();

    return json(analysis);
  } catch (err) {
    console.error('AI analyze error:', err);
    return error('AI service temporarily unavailable. Please try again.', 503);
  }
};
