import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '../../../services/supabase-server';

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id');
    const email = req.nextUrl.searchParams.get('email');
    if (!id || !email) return NextResponse.json({ error: 'Missing params' }, { status: 400 });
    const supabase = getSupabaseServer();
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .eq('id', id)
      .eq('user_email', email)
      .single();
    if (error) throw error;
    return NextResponse.json(data);
  } catch (err: unknown) {
    console.error('Get report error:', err);
    return NextResponse.json({ error: 'Failed to fetch report' }, { status: 500 });
  }
}
