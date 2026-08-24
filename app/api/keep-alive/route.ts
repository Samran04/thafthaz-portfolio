import { NextResponse } from 'next/server';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = await getSupabaseBrowserClient();
    if (!supabase) {
      return NextResponse.json({ success: false, error: 'Supabase client not initialized' }, { status: 500 });
    }

    const { data, error } = await supabase.from('hero_settings').select('id').limit(1);

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Supabase heartbeat ping successful. Project is active.',
      timestamp: new Date().toISOString(),
      recordCount: data ? data.length : 0,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Unknown error' }, { status: 500 });
  }
}
