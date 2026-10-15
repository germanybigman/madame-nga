# Buyer Handoff Summary

## Overview

Madame Nga is a restaurant website and content-management system built for a hospitality business. It is designed to let the restaurant owner update menu selections without needing a developer to handle each change.

## Included

- Modern restaurant landing page
- Menu page with categories and items
- Contact and location information
- Legal pages (Impressum / Datenschutz)
- Admin panel for menu management
- Supabase-powered data layer
- Deployment and setup documentation
- CI validation for build, lint and TS checks

## Business value

This project gives the restaurant a clean digital storefront and a simple way to manage the menu themselves. It is designed for a handoff model: the restaurant can maintain text and prices without needing ongoing developer support for routine edits.

## What is already working

- Site structure and UI are built
- Menu data is stored in Supabase
- Admin page allows category/item/option management
- Deployment config exists for Vercel and Netlify
- CI validation exists for build and type safety

## What still must be configured live

Before the website is fully operational, the buyer must complete a few live setup steps:

1. Create a production Supabase project.
2. Set the VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.
3. Create a password-protected admin user in Supabase Authentication.
4. Deploy the site to a production host.
5. Point the restaurant domain to the host.
6. Confirm legal pages and contact data match the restaurant.

## Recommended handoff model

The cleanest setup is:

- Restaurant owns the hosted website and domain
- Restaurant owns the Supabase project (or receives a copy of project access)
- Admin user credentials are created by the restaurant owner or designated staff member
- The original developer provides the handoff docs and optional one-time support package

## Suggested offer structure

- One-time setup handoff: business setup, domain and deployment config, admin creation
- Optional monthly maintenance plan: light updates, copy changes, menu edits, backups, issue triage

## Suggested handoff to owner

The site is ready for transfer, but the final launch depends on live production setup outside GitHub. Once the host, domain and Supabase project are connected, the platform is ready for daily restaurant use.

## Transfer note

This should be positioned as a website transfer, not a dependency on the original developer for daily operations. The admin panel is intended to reduce ongoing developer involvement.
