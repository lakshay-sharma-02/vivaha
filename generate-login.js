import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function generateLink() {
  const email = process.argv[2];
  if (!email) {
    console.error("Please provide an email. Usage: node generate-login.js <your-email>");
    process.exit(1);
  }

  console.log(`Generating magic link for: ${email}...`);
  const { data, error } = await supabase.auth.admin.generateLink({
    type: 'magiclink',
    email: email,
  });

  if (error) {
    console.error("Error generating link:", error.message);
  } else {
    console.log("\n✅ SUCCESS! Use this Verification Code to log in manually:");
    console.log("\n   " + data.properties.email_otp + "\n");
    console.log("On your login screen, click 'Enter code manually' and paste the code above.");
    console.log("If the input is restricted to 6 digits, you might need to temporarily remove `maxLength={6}` in app/(auth)/login/page.tsx");
  }
}

generateLink();
