import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testSubmit() {
  console.log("Testing insert into demo_requests...");
  const { data, error } = await supabase.from('demo_requests').insert({
    full_name: 'Test Agent',
    work_email: 'test@agent.com',
    organization: 'Test Org'
  }).select();

  if (error) {
    console.error("Error inserting into demo_requests:", error);
    process.exit(1);
  }
  
  console.log("Insert successful! Data:", data);
}

testSubmit();
