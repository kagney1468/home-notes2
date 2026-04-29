import { NextResponse } from 'next/server';

// Temporary diagnostic endpoint — DELETE after issue resolved
export async function GET() {
  const key = process.env.ANTHROPIC_API_KEY;
  return NextResponse.json({
    hasKey: !!key,
    keyLength: key?.length ?? 0,
    keyPreview: key ? key.slice(0, 12) + '...' + key.slice(-6) : null,
    startsCorrectly: key?.startsWith('sk-ant-') ?? false,
    hasWhitespace: key ? /[\s\n\r]/.test(key) : false,
    nodeEnv: process.env.NODE_ENV,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'set' : 'missing',
    supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'set' : 'missing',
  });
}
