import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '../../../services/supabase-server';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });
    const supabase = getSupabaseServer();
    const { error } = await supabase
      .from('subscribers')
      .upsert({ email }, { onConflict: 'email' });
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error('Subscribe error:', err);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
