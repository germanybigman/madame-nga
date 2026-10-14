/*
# Create menu management tables

1. New Tables
- `menu_categories` — top-level sections of the menu (e.g. Vorspeisen, Sushi, Desserts)
  - `id` (uuid, primary key)
  - `title` (text, not null) — display name
  - `subtitle` (text, nullable) — optional description shown under the title
  - `slug` (text, unique, not null) — URL-friendly identifier
  - `sort_order` (int, default 0) — controls display order
  - `created_at` (timestamptz)
- `menu_items` — individual dishes within a category
  - `id` (uuid, primary key)
  - `category_id` (uuid, foreign key → menu_categories.id ON DELETE CASCADE)
  - `name` (text, not null)
  - `description` (text, nullable)
  - `price` (text, not null) — stored as text to allow formats like "ab 12,90 €"
  - `sort_order` (int, default 0)
  - `created_at` (timestamptz)
- `menu_item_options` — optional variants for a menu item (e.g. choice of protein)
  - `id` (uuid, primary key)
  - `menu_item_id` (uuid, foreign key → menu_items.id ON DELETE CASCADE)
  - `name` (text, not null)
  - `price` (text, not null)
  - `sort_order` (int, default 0)
  - `created_at` (timestamptz)

2. Security
- Enable RLS on all three tables.
- This is a single-tenant app with no sign-in screen for visitors. The admin panel uses Supabase auth (email/password) so only the owner can manage the menu. Public visitors need read access via the anon key.
- SELECT: TO anon, authenticated USING (true) — public can read all menu data.
- INSERT/UPDATE/DELETE: TO authenticated only — only the signed-in admin can modify.

3. Important Notes
- The admin authenticates via Supabase email/password auth. No custom auth tables.
- Visitor-facing pages use the anon key and can only read.
- All write policies are scoped to `authenticated` so only the logged-in admin can make changes.
*/

CREATE TABLE IF NOT EXISTS menu_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text,
  slug text UNIQUE NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid NOT NULL REFERENCES menu_categories(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  price text NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS menu_item_options (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_item_id uuid NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,
  name text NOT NULL,
  price text NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_item_options ENABLE ROW LEVEL SECURITY;

-- Read policies: public can read everything
DROP POLICY IF EXISTS "public_read_menu_categories" ON menu_categories;
CREATE POLICY "public_read_menu_categories"
  ON menu_categories FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public_read_menu_items" ON menu_items;
CREATE POLICY "public_read_menu_items"
  ON menu_items FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public_read_menu_item_options" ON menu_item_options;
CREATE POLICY "public_read_menu_item_options"
  ON menu_item_options FOR SELECT TO anon, authenticated USING (true);

-- Write policies: only authenticated admin can modify
DROP POLICY IF EXISTS "admin_insert_menu_categories" ON menu_categories;
CREATE POLICY "admin_insert_menu_categories"
  ON menu_categories FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_menu_categories" ON menu_categories;
CREATE POLICY "admin_update_menu_categories"
  ON menu_categories FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_menu_categories" ON menu_categories;
CREATE POLICY "admin_delete_menu_categories"
  ON menu_categories FOR DELETE TO authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_menu_items" ON menu_items;
CREATE POLICY "admin_insert_menu_items"
  ON menu_items FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_menu_items" ON menu_items;
CREATE POLICY "admin_update_menu_items"
  ON menu_items FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_menu_items" ON menu_items;
CREATE POLICY "admin_delete_menu_items"
  ON menu_items FOR DELETE TO authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_menu_item_options" ON menu_item_options;
CREATE POLICY "admin_insert_menu_item_options"
  ON menu_item_options FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_menu_item_options" ON menu_item_options;
CREATE POLICY "admin_update_menu_item_options"
  ON menu_item_options FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_menu_item_options" ON menu_item_options;
CREATE POLICY "admin_delete_menu_item_options"
  ON menu_item_options FOR DELETE TO authenticated USING (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_menu_items_category_id ON menu_items(category_id);
CREATE INDEX IF NOT EXISTS idx_menu_item_options_menu_item_id ON menu_item_options(menu_item_id);
CREATE INDEX IF NOT EXISTS idx_menu_categories_sort_order ON menu_categories(sort_order);
CREATE INDEX IF NOT EXISTS idx_menu_items_sort_order ON menu_items(sort_order);
