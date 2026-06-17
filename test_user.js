const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://cbxtzkzzhgjzimaroahc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNieHR6a3p6aGdqemltYXJvYWhjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTU3Njk4NSwiZXhwIjoyMDk3MTUyOTg1fQ.5SVuxYSm6EuEIQKGuaPUtterVhN5eT0q91DUP_37cVY'
);

async function run() {
  const { data: profile, error: pError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', '0a729527-603e-4319-a808-281c4ff139cc');
    
  console.log('Profile:', profile);
  
  if (profile && profile.length === 0) {
    // If missing, let's insert them manually to fix it
    console.log('Fixing missing profile...');
    await supabase.from('profiles').insert({
      id: '0a729527-603e-4319-a808-281c4ff139cc',
      full_name: 'User',
      gender: 'male',
      date_of_birth: '2000-01-01'
    });
    await supabase.from('profile_details').insert({
      profile_id: '0a729527-603e-4319-a808-281c4ff139cc'
    });
    console.log('Profile created successfully');
  }
}

run();
