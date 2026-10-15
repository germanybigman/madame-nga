#!/usr/bin/env node
// Simple environment validator script. Checks for VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
const fs = require('fs');
const path = require('path');

function readEnvFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split(/\r?\n/);
    const env = {};
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim();
      env[key] = value;
    }
    return env;
  } catch (err) {
    return {};
  }
}

const envPath = path.resolve(process.cwd(), '.env');
const env = readEnvFile(envPath);

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || env.VITE_SUPABASE_URL;
const SUPABASE_ANON = process.env.VITE_SUPABASE_ANON_KEY || env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON) {
  console.error('\nERROR: Supabase environment variables are missing. Please set the following:');
  console.error('  VITE_SUPABASE_URL=your-supabase-url');
  console.error('  VITE_SUPABASE_ANON_KEY=your-anon-key\n');
  process.exit(1);
}

console.log('Environment check passed. Found VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
