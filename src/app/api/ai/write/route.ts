export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.brief || body.brief.trim().length < 10) {
      return Response.json({ error: 'Please provide a brief of at least 10 characters' }, { status: 400 });
    }

    if (body.brief.length > 2000) {
      return Response.json({ error: 'Brief too long (max 2,000 characters)' }, { status: 400 });
    }

    const format = body.format || 'blog-post';
    const tone = body.tone || 'professional';
    const length = body.length || 'medium';

    const formatInstructions: Record<string, string> = {
      'blog-post': 'Write a blog post with a compelling title, introduction, body paragraphs, and conclusion.',
      'email': 'Write a professional email with subject line, greeting, body, and sign-off.',
      'product-description': 'Write a persuasive product description highlighting benefits, features, and a call to action.',
      'social-media': 'Write a social media post that is engaging, concise, and includes relevant hashtags.',
      'press-release': 'Write a press release with headline, dateline, lead paragraph, body, and boilerplate.',
    };

    const toneInstructions: Record<string, string> = {
      'professional': 'Use a professional, authoritative tone.',
      'casual': 'Use a friendly, conversational tone.',
      'persuasive': 'Use a compelling, sales-oriented tone that drives action.',
      'technical': 'Use a precise, technical tone suited for expert audiences.',
    };

    const lengthInstructions: Record<string, string> = {
      'short': 'Keep it brief — around 100-150 words.',
      'medium': 'Aim for around 250-350 words.',
      'long': 'Write a comprehensive piece of around 500-700 words.',
    };

    const startTime = Date.now();
    const env = (process.env as unknown) as { AI?: { run: (model: string, input: unknown) => Promise<unknown> } };

    if (!env.AI) {
      return Response.json({
        content: 'AI content writing service is being configured. Please check back soon.',
        format, tone, length, word_count: 0, duration_ms: Date.now() - startTime,
      });
    }

    const response = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
      messages: [
        {
          role: 'system',
          content: `You are an expert content writer. ${formatInstructions[format] || formatInstructions['blog-post']} ${toneInstructions[tone] || ''} ${lengthInstructions[length] || ''} Write high-quality, original content based on the user's brief. Do not include meta-commentary about the writing process — just deliver the content.`,
        },
        {
          role: 'user',
          content: `Write content based on this brief:\n\n${body.brief}`,
        },
      ],
      max_tokens: 1024,
      temperature: 0.7,
    });

    const duration = Date.now() - startTime;
    const content = (response as { response: string }).response;
    const wordCount = content.split(/\s+/).length;

    return Response.json({
      content, format, tone, length,
      word_count: wordCount,
      duration_ms: duration,
    });
  } catch (err) {
    console.error('AI write error:', err);
    return Response.json({ error: 'AI service temporarily unavailable. Please try again.' }, { status: 503 });
  }
}
