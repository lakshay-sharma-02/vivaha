require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

async function run() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  
  // Just test a simple query
  console.log("Fetching profiles...");
  const { data, error } = await supabase.from('profiles').select('id, gender, is_active').limit(5);
  console.log("Profiles:", data, error);
}
run();
