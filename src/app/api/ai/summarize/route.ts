export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.text || body.text.trim().length < 50) {
      return Response.json({ error: 'Please provide at least 50 characters of text to summarize' }, { status: 400 });
    }

    if (body.text.length > 10000) {
      return Response.json({ error: 'Text too long (max 10,000 characters for demo)' }, { status: 400 });
    }

    const style = body.style || 'concise';
    const styleInstructions: Record<string, string> = {
      'concise': 'Provide a brief 2-3 sentence summary capturing the key points.',
      'detailed': 'Provide a thorough summary covering all main points in 1-2 paragraphs.',
      'bullet-points': 'Summarize as 3-5 clear bullet points, each one sentence.',
    };

    const startTime = Date.now();
    const env = (process.env as unknown) as { AI?: { run: (model: string, input: unknown) => Promise<unknown> } };

    if (!env.AI) {
      return Response.json({
        summary: 'AI summarization service is being configured. Please check back soon or contact us at martin@gbone.no.',
        style, input_length: body.text.length, output_length: 0, duration_ms: Date.now() - startTime,
      });
    }

    const response = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
      messages: [
        { role: 'system', content: `You are a professional text summarizer. ${styleInstructions[style] || styleInstructions.concise} Be accurate and don't add information not in the original text.` },
        { role: 'user', content: `Summarize the following text:\n\n${body.text}` },
      ],
      max_tokens: 512,
      temperature: 0.3,
    });

    const duration = Date.now() - startTime;
    const summary = (response as { response: string }).response;

    return Response.json({
      summary, style,
      input_length: body.text.length,
      output_length: summary.length,
      duration_ms: duration,
    });
  } catch (err) {
    console.error('AI summarize error:', err);
    return Response.json({ error: 'AI service temporarily unavailable. Please try again.' }, { status: 503 });
  }
}
