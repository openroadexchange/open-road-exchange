
import { createServerSupabase } from '../../../../lib/supabaseServer';
export async function GET(req, { params }) {
  const supabase = createServerSupabase();
  const { data, error } = await supabase.from('inventory').select('*, images(*)').eq('id', params.id).single();
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify(data), { status: 200 });
}
