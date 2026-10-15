 import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// Remember whether the visitor arrived from an invite / password-reset email link.
// Must be read before the client starts, because the client removes the link data from the URL.
const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
export const authLinkType = hashParams.get('type');

// Never crash the whole site if the settings are missing: the pages show a message instead.
export const supabase = createClient(
  supabaseUrl || 'https://not-configured.invalid',
  supabaseAnonKey || 'not-configured'
);
