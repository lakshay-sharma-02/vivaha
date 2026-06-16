const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://cbxtzkzzhgjzimaroahc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNieHR6a3p6aGdqemltYXJvYWhjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTU3Njk4NSwiZXhwIjoyMDk3MTUyOTg1fQ.5SVuxYSm6EuEIQKGuaPUtterVhN5eT0q91DUP_37cVY'
);

async function run() {
  const profileUpdate = {
    onboarding_step: 1,
    onboarding_completed: false,
    full_name: 'Test Name',
    date_of_birth: '1990-01-01',
    gender: 'male',
    avatar_url: 'https://example.com/avatar.png'
  };

  const { data: pData, error: pError } = await supabase
    .from('profiles')
    .update(profileUpdate)
    .eq('id', '00000000-0000-0000-0000-000000000000');
  
  console.log('Profile update:', pError || 'Success');

  const detailsUpdate = {
    height_cm: 180
  };

  const { data: dData, error: dError } = await supabase
    .from('profile_details')
    .update(detailsUpdate)
    .eq('profile_id', '00000000-0000-0000-0000-000000000000');
    
  console.log('Details update:', dError || 'Success');
}

run();
