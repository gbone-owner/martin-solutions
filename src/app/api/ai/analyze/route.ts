export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.text || body.text.trim().length < 30) {
      return Response.json({ error: 'Please provide at least 30 characters of text to analyze' }, { status: 400 });
    }

    if (body.text.length > 10000) {
      return Response.json({ error: 'Text too long (max 10,000 characters for demo)' }, { status: 400 });
    }

    const docType = body.type || 'general';
    const typeContext: Record<string, string> = {
      general: 'a general text document',
      email: 'a business email',
      report: 'a business report or document',
      feedback: 'customer feedback or a review',
    };

    const startTime = Date.now();
    const env = (process.env as unknown) as { AI?: { run: (model: string, input: unknown) => Promise<unknown> } };

    if (!env.AI) {
      return Response.json({
        sentiment: 'neutral', sentiment_score: 0.5,
        key_topics: ['AI configuration pending'],
        entities: [], tone: 'informative',
        summary: 'AI analysis service is being configured. Please check back soon.',
        action_items: [], word_count: body.text.split(/\s+/).length,
        reading_time_seconds: Math.ceil(body.text.split(/\s+/).length / 4),
        input_length: body.text.length, duration_ms: Date.now() - startTime,
        document_type: docType,
      });
    }

    const response = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
      messages: [
        {
          role: 'system',
          content: `You are an expert business document analyzer. Analyze the provided text as ${typeContext[docType] || 'a general text document'}. Return a JSON object (and ONLY the JSON, no markdown) with these fields:

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
        { role: 'user', content: body.text },
      ],
      max_tokens: 512,
      temperature: 0.2,
    });

    const duration = Date.now() - startTime;
    const rawResponse = (response as { response: string }).response;

    let analysis;
    try {
      const cleaned = rawResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      analysis = JSON.parse(cleaned);
    } catch {
      analysis = { raw_response: rawResponse, parse_note: 'AI returned non-standard format' };
    }

    analysis.input_length = body.text.length;
    analysis.duration_ms = duration;
    analysis.document_type = docType;

    return Response.json(analysis);
  } catch (err) {
    console.error('AI analyze error:', err);
    return Response.json({ error: 'AI service temporarily unavailable. Please try again.' }, { status: 503 });
  }
}
