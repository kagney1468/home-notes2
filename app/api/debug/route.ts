import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

export async function GET() {
  const key = process.env.ANTHROPIC_API_KEY;
  const result: Record<string, unknown> = {
    key_present: !!key,
    key_length: key?.length,
    key_prefix: key?.slice(0, 14),
    node_version: process.version,
    env: process.env.NODE_ENV,
  };

  if (!key) {
    return NextResponse.json({ ...result, error: 'NO KEY' });
  }

  try {
    const client = new Anthropic({ apiKey: key });
    const msg = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 10,
      messages: [{ role: 'user', content: 'Reply with: OK' }],
    });
    result.api_test = 'PASS';
    result.api_response = msg.content[0].type === 'text' ? msg.content[0].text : 'non-text';
    result.model = msg.model;
  } catch (err: unknown) {
    result.api_test = 'FAIL';
    result.error = err instanceof Error ? err.message : String(err);
    result.error_type = (err as { constructor: { name: string } })?.constructor?.name;
    if ((err as { status?: number })?.status) {
      result.http_status = (err as { status: number }).status;
    }
  }

  return NextResponse.json(result);
}
