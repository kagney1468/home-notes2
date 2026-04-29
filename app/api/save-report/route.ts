import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '../../../services/supabase-server';

export async function POST(req: NextRequest) {
  try {
    const { user_id, user_email, address, postcode, report_data } = await req.json();
    if (!user_id || !address || !report_data)
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    const supabase = getSupabaseServer();
    const { data, error } = await supabase
      .from('reports')
      .insert({ user_id, user_email, address, postcode, report_data })
      .select('id').single();
    if (error) throw error;
    return NextResponse.json({ id: data.id });
  } catch (err: unknown) {
    console.error('Save report error:', err);
    return NextResponse.json({ error: 'Failed to save report' }, { status: 500 });
  }
}
