export const runtime = 'edge';

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

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.message || body.message.trim().length === 0) {
      return Response.json({ error: 'Message is required' }, { status: 400 });
    }

    if (body.message.length > 2000) {
      return Response.json({ error: 'Message too long (max 2000 characters)' }, { status: 400 });
    }

    const messages = [
      { role: 'system' as const, content: SYSTEM_PROMPT },
      ...(body.history || []).slice(-6),
      { role: 'user' as const, content: body.message },
    ];

    const startTime = Date.now();

    // Access the AI binding from Cloudflare environment
    const env = (process.env as unknown) as { AI?: { run: (model: string, input: unknown) => Promise<unknown> } };

    if (!env.AI) {
      // Fallback response when AI binding is not available
      return Response.json({
        reply: "I'm the Martin Solutions AI assistant. The AI service is currently being configured. In the meantime, feel free to explore our website or contact us at martin@gbone.no for any questions about our AI tools and services.",
        model: 'fallback',
        duration_ms: Date.now() - startTime,
      });
    }

    const response = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
      messages,
      max_tokens: 512,
      temperature: 0.7,
    });

    const duration = Date.now() - startTime;
    const reply = (response as { response: string }).response;

    return Response.json({ reply, model: 'llama-3.1-8b', duration_ms: duration });
  } catch (err) {
    console.error('AI chat error:', err);
    return Response.json({ error: 'AI service temporarily unavailable. Please try again.' }, { status: 503 });
  }
}
