import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '../../../services/supabase-server';

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get('user_id');
    if (!userId) return NextResponse.json({ error: 'user_id required' }, { status: 400 });
    const supabase = getSupabaseServer();
    const { data, error } = await supabase
      .from('reports')
      .select('id, address, postcode, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(20);
    if (error) throw error;
    return NextResponse.json({ reports: data });
  } catch (err: unknown) {
    console.error('Get reports error:', err);
    return NextResponse.json({ error: 'Failed to fetch reports' }, { status: 500 });
  }
}
