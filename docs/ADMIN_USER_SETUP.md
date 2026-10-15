# Admin User Setup Guide

This guide explains how the restaurant can create an admin user for the site once the production Supabase project is active.

## 1. Create the Supabase project

Go to https://supabase.com and create a new project.

## 2. Run the migration

Open the Supabase SQL editor and run the migration file:

- `supabase/migrations/20261013163059_create_menu_tables.sql`

Optional: run the seed file if you want default starter content:

- `supabase/seed.sql`

## 3. Copy the project keys

Go to:

- Project Settings → API

Copy:

- Project URL
- anon public key

Then add them to the hosting environment variables:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 4. Add the admin user

Open the Supabase dashboard:

- Authentication → Users → Add user

Create a real admin account for the restaurant and share the login details securely.

## 5. Log in to the site

Visit the deployed site and go to the `/admin` page.

Use the admin email and password you created in Supabase.

## 6. Update menu content

Once logged in, the restaurant can:

- create new categories
- add items to categories
- edit dish prices and descriptions
- manage item options and ingredient modifiers

## 7. Security reminder

- Do not publish the `service_role` key
- Do not store secret keys in plain GitHub repos or public documentation
- Use a password manager or secure business communication method to share credentials
