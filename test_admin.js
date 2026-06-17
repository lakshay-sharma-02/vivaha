const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://cbxtzkzzhgjzimaroahc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNieHR6a3p6aGdqemltYXJvYWhjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTU3Njk4NSwiZXhwIjoyMDk3MTUyOTg1fQ.5SVuxYSm6EuEIQKGuaPUtterVhN5eT0q91DUP_37cVY'
);

async function run() {
  const userId = '0a729527-603e-4319-a808-281c4ff139cc';

  // 1. Approve the profile
  const { error: e1 } = await supabase
    .from('profiles')
    .update({ status: 'approved', is_verified: true, role: 'admin' })
    .eq('id', userId);
  console.log('Approve + set admin:', e1 || 'OK');

  // 2. Verify the doc  
  const { error: e2 } = await supabase
    .from('verification_docs')
    .update({ status: 'approved' })
    .eq('profile_id', userId);
  console.log('Verify doc:', e2 || 'OK');

  // 3. Check final profile
  const { data } = await supabase.from('profiles').select('id,full_name,status,is_verified,role').eq('id', userId).single();
  console.log('Profile:', data);
}

run();
