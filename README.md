# Madame Nga – Vietnamese Cuisine

Restaurant website for Madame Nga in Selb, featuring a Supabase-powered menu management system.

## Tech Stack

- React + TypeScript + Vite
- Tailwind CSS
- Supabase (database + auth)
- Lucide React (icons)

## Features

- Home, Menu, About, Contact pages
- Impressum & Datenschutz (German legal pages)
- Admin panel with email/password login to manage menu items
- Menu data stored in Supabase (categories, items, options)
- Row Level Security: public read, authenticated write

## Setup

1. Clone the repo
2. `npm install`
3. Copy `.env.example` to `.env` and fill in your Supabase credentials
4. Run the migration in `supabase/migrations/` on your Supabase project
5. `npm run dev`

## Admin Access

Navigate to `/admin` (or click Admin in the footer) to log in and manage the menu.
