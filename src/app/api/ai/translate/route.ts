export const runtime = 'edge';

const LANGUAGES: Record<string, string> = {
  en: 'English', no: 'Norwegian', es: 'Spanish', fr: 'French',
  de: 'German', it: 'Italian', pt: 'Portuguese', nl: 'Dutch',
  sv: 'Swedish', da: 'Danish', fi: 'Finnish', pl: 'Polish',
  ja: 'Japanese', ko: 'Korean', zh: 'Chinese (Simplified)',
  ar: 'Arabic', hi: 'Hindi', ru: 'Russian', tr: 'Turkish',
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.text || body.text.trim().length === 0) {
      return Response.json({ error: 'Text is required' }, { status: 400 });
    }

    if (body.text.length > 5000) {
      return Response.json({ error: 'Text too long (max 5,000 characters)' }, { status: 400 });
    }

    const sourceLang = body.from || 'auto';
    const targetLang = body.to || 'en';

    if (targetLang !== 'auto' && !LANGUAGES[targetLang]) {
      return Response.json({ error: 'Unsupported target language' }, { status: 400 });
    }

    const sourceLabel = sourceLang === 'auto' ? 'auto-detected' : (LANGUAGES[sourceLang] || sourceLang);
    const targetLabel = LANGUAGES[targetLang] || targetLang;

    const startTime = Date.now();
    const env = (process.env as unknown) as { AI?: { run: (model: string, input: unknown) => Promise<unknown> } };

    if (!env.AI) {
      return Response.json({
        translation: 'Translation service is being configured. Please check back soon.',
        from: sourceLabel, to: targetLabel,
        duration_ms: Date.now() - startTime,
      });
    }

    const detectPrompt = sourceLang === 'auto'
      ? 'First detect the language of the text, then translate it.'
      : `The text is in ${sourceLabel}.`;

    const response = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
      messages: [
        {
          role: 'system',
          content: `You are a professional translator. ${detectPrompt} Translate the given text into ${targetLabel}.

Rules:
- Output ONLY the translation, nothing else
- Preserve the original formatting (paragraphs, line breaks, punctuation)
- Maintain the tone and style of the original
- For technical terms, use the standard translation in the target language
- Do not add explanations, notes, or commentary`,
        },
        { role: 'user', content: body.text },
      ],
      max_tokens: 1024,
      temperature: 0.3,
    });

    const duration = Date.now() - startTime;
    const translation = (response as { response: string }).response;

    // If auto-detect, try to identify the source language
    let detectedLang = sourceLabel;
    if (sourceLang === 'auto') {
      const detectResponse = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
        messages: [
          { role: 'system', content: 'Identify the language of the following text. Reply with ONLY the language name, nothing else.' },
          { role: 'user', content: body.text.substring(0, 200) },
        ],
        max_tokens: 20,
        temperature: 0.1,
      });
      detectedLang = (detectResponse as { response: string }).response.trim();
    }

    return Response.json({
      translation,
      from: detectedLang,
      to: targetLabel,
      input_length: body.text.length,
      output_length: translation.length,
      duration_ms: duration,
    });
  } catch (err) {
    console.error('AI translate error:', err);
    return Response.json({ error: 'AI service temporarily unavailable. Please try again.' }, { status: 503 });
  }
}

// GET — return supported languages
export async function GET() {
  return Response.json({ languages: LANGUAGES });
}
