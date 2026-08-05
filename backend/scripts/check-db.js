const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../frontend/.env.local') });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in frontend/.env.local');
  process.exit(1);
}

const supabase = createClient(url, key);

async function checkConnection() {
  console.log(`📡 Connecting to Supabase project: ${url}...`);
  try {
    const { count, error } = await supabase.from('projects').select('*', { count: 'exact', head: true });
    if (error) {
      console.warn('⚠️ Supabase reached, but table query returned warning/error (Tables might need creation):', error.message);
    } else {
      console.log(`✅ Supabase Database Connected successfully! Found ${count !== null ? count : 0} projects in DB.`);
    }
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
  }
}

checkConnection();
