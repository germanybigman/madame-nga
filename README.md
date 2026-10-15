# Madame Nga – Vietnamese Cuisine

Restaurant website for Madame Nga in Selb, featuring a Supabase-backed menu management system.

## Overview

This repository contains a Vite + React + TypeScript single-page application with an admin area (Supabase auth) to manage menu categories, items and options.

## Quickstart (local development)

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env` and set your Supabase credentials:

   VITE_SUPABASE_URL=your-supabase-url

   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

3. Run migrations in your Supabase project (see `supabase/migrations/`)
4. (Optional) Seed with example data: `psql < supabase/seed.sql` or run the SQL in the Supabase SQL editor
5. Start dev server: `npm run dev`

## Production build

- Build: `npm run build`
- Deploy to Vercel/Netlify/GitHub Pages (see Deployment section)

## Supabase setup

1. Create a new Supabase project.
2. Run the migration SQL in `supabase/migrations/20261013163059_create_menu_tables.sql` to create the required tables.
3. (Optional) Run `supabase/seed.sql` to insert starter menu data.
4. Go to Project Settings → API to copy your `anon` key and URL and paste them into `.env`.
5. Make sure Row Level Security (RLS) policies allow public reads for menu tables and authenticated writes for admin actions. The project was originally built with public read / authenticated write in mind.

## Admin access

- Visit `/admin` to sign in using email/password.
- Use Supabase auth to manage users. When creating the restaurant account for the buyer, create one admin user and share credentials securely.

## CI

A GitHub Actions workflow has been added to run lint, typecheck and build on PRs and pushes to main.

## Handoff checklist (recommended before sale)

- [ ] Deploy to a production host (Vercel / Netlify)
- [ ] Configure production Supabase project and seed data
- [ ] Create admin user and provide secure credentials to the buyer
- [ ] Add favicon and social image assets under `public/` or `static/`
- [ ] Replace placeholder URLs in `index.html` and README with the real domain
- [ ] Review legal pages (Impressum / Datenschutzerklärung) for accuracy

## Contact

For developer questions, contact: info@madame-nga.de
