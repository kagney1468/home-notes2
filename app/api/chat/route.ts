import Anthropic from '@anthropic-ai/sdk';
import { NextRequest } from 'next/server';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages?.length) {
      return new Response(JSON.stringify({ error: 'Messages are required' }), { status: 400 });
    }

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          const anthropicStream = client.messages.stream({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 1024,
            system: `You are a senior UK property professional and investment advisor. You have deep expertise in:
- UK residential and commercial property investment
- Planning permission and development appraisals  
- Rental yield calculations and ROI analysis
- UK property market trends and forecasting
- Estate agency practices and property law (England and Wales)
- Mortgage and finance products for property

You give concise, professional advice. Always clarify when something is general information vs regulated financial advice. Keep responses focused and actionable.`,
            messages: messages.map((m: { role: string; content: string }) => ({
              role: m.role as 'user' | 'assistant',
              content: m.content,
            })),
          });

          anthropicStream.on('text', (text) => {
            const data = `data: ${JSON.stringify({ text })}\n\n`;
            controller.enqueue(encoder.encode(data));
          });

          await anthropicStream.finalMessage();
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error) {
          console.error('Chat stream error:', error);
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ text: 'Sorry, an error occurred.' })}\n\n`)
          );
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Chat route error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
