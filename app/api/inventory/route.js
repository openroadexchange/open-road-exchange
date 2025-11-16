
import { createServerSupabase } from '../../../lib/supabaseServer';
export async function GET() {
  const supabase = createServerSupabase();
  const { data, error } = await supabase.from('inventory').select('*, images(*)').order('created_at', { ascending: false });
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify(data), { status: 200 });
}
