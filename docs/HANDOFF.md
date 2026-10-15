# Handoff and Deployment Checklist — Madame Nga

This document collects step-by-step instructions to hand the project over to the buyer and deploy the site to production.

1) Create production Supabase project
   - Go to supabase.com and create a new project.
   - In the SQL editor, run the migration file `supabase/migrations/20261013163059_create_menu_tables.sql`.
   - Optional: run `supabase/seed.sql` (import the file in the SQL editor) to add starter menu content.
   - In Project Settings → API, copy the `anon` key and the project URL.

2) Configure environment variables (Vercel / Netlify / environment)
   - Set VITE_SUPABASE_URL to the Supabase URL (e.g. https://xxxxx.supabase.co)
   - Set VITE_SUPABASE_ANON_KEY to the anon key
   - On Vercel: add variables under Project → Settings → Environment Variables (Production)
   - On Netlify: Site settings → Build & deploy → Environment → Environment variables

3) Create initial admin user
   - In Supabase → Authentication → Users, create a new user for the restaurant admin (email + password)
   - Or use the signup flow via `/admin` and then promote the user in the Supabase dashboard if necessary

4) Deployment
   - Vercel: Import the GitHub repo and set the project to build using `npm run build`. Use `dist` as the output dir.
   - Netlify: Connect the repo, build command `npm run build`, publish directory `dist`.
   - Custom domain: configure DNS (A/CNAME) to Vercel/Netlify and add the domain in the hosting dashboard.

5) Post-deploy smoke checks
   - Visit site root and check the home page loads.
   - Visit `/speisekarte` and confirm the menu loads (public read). If you see an error, verify env variables.
   - Visit `/admin`, sign in with the admin user and confirm you can create/edit categories and items.

6) Security & privacy notes
   - Ensure RLS (Row Level Security) policies allow public read on menu tables and authenticated write for admin users.
   - Do not publish your Supabase `service_role` key — only the `anon` public key should be used client-side.

7) Final handoff
   - Provide the buyer with:
     - Admin email + password (or steps to create their own admin account)
     - Supabase project URL and branding instructions
     - Domain DNS access (or add domain to host account)

8) Optional next steps
   - Set up automatic deployment from `main` with preview branches for PRs.
   - Add a scheduled backup for Supabase data.
   - Add monitoring (Sentry/LogRocket) if desired.
