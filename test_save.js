const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://cbxtzkzzhgjzimaroahc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNieHR6a3p6aGdqemltYXJvYWhjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTU3Njk4NSwiZXhwIjoyMDk3MTUyOTg1fQ.5SVuxYSm6EuEIQKGuaPUtterVhN5eT0q91DUP_37cVY'
);

async function run() {
  const { data, error } = await supabase
    .from('profiles')
    .update({ onboarding_step: 1 })
    .eq('id', '00000000-0000-0000-0000-000000000000');
  
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Success:', data);
  }
}

run();
