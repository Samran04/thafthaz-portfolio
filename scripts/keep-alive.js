const https = require('https');
const path = require('path');
const fs = require('fs');

// Try loading env vars from .env.local if present
let url = process.env.NEXT_PUBLIC_SUPABASE_URL;
let key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  const envPath = path.resolve(__dirname, '../.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach((line) => {
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        const envKey = match[1].trim();
        const envVal = match[2].trim();
        if (envKey === 'NEXT_PUBLIC_SUPABASE_URL') url = envVal;
        if (envKey === 'NEXT_PUBLIC_SUPABASE_ANON_KEY') key = envVal;
      }
    });
  }
}

if (!url || !key) {
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

const endpoint = `${url}/rest/v1/hero_settings?select=id&limit=1`;
console.log(`📡 Sending Keep-Alive Ping to Supabase: ${url}...`);

const req = https.get(
  endpoint,
  {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
    },
  },
  (res) => {
    let data = '';
    res.on('data', (chunk) => (data += chunk));
    res.on('end', () => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        console.log(`✅ Supabase Keep-Alive Success! Status: ${res.statusCode}`);
        console.log(`Timestamp: ${new Date().toISOString()}`);
      } else {
        console.warn(`⚠️ Supabase returned status ${res.statusCode}: ${data}`);
      }
    });
  }
);

req.on('error', (err) => {
  console.error('❌ Keep-Alive Ping Failed:', err.message);
  process.exit(1);
});
