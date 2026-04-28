import Anthropic from '@anthropic-ai/sdk';
import { NextRequest } from 'next/server';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { report } = await req.json();

    if (!report) {
      return new Response(JSON.stringify({ error: 'Report is required' }), { status: 400 });
    }

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          const anthropicStream = client.messages.stream({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 2048,
            system: `You are a senior UK property analyst and investment advisor. Provide professional, insightful analysis written in Markdown.`,
            messages: [
              {
                role: 'user',
                content: `Analyse this UK property area report for long-term investment potential and quality of life. 

Report data:
${JSON.stringify(report, null, 2)}

Structure your analysis with these four sections using Markdown headers:
## Gentrification Potential
## School Landscape  
## Connectivity Impact
## Lifestyle Score

Be concise, specific, and professional. Draw on all the data in the report.`,
              },
            ],
          });

          anthropicStream.on('text', (text) => {
            const data = `data: ${JSON.stringify({ text })}\n\n`;
            controller.enqueue(encoder.encode(data));
          });

          await anthropicStream.finalMessage();
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error) {
          console.error('Streaming error:', error);
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ text: '\n\nAnalysis could not be completed at this time.' })}\n\n`
            )
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
    console.error('Analysis route error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
