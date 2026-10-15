-- Seed data for Madame Nga (menu categories, items, options)

-- Categories
INSERT INTO menu_categories (title, subtitle, slug, sort_order) VALUES
  ('Vorspeisen', 'Kleine Leckerbissen', 'vorspeisen', 0),
  ('Hauptgerichte', NULL, 'hauptgerichte', 1),
  ('Sushi', NULL, 'sushi', 2)
ON CONFLICT DO NOTHING;

-- Example items
INSERT INTO menu_items (category_id, name, description, price, sort_order)
VALUES
  ((SELECT id FROM menu_categories WHERE slug = 'vorspeisen' LIMIT 1), 'Frühlingsrollen (3 Stück)', 'Knusprig gebratene Rollen mit Gemüse', '4,90 €', 0),
  ((SELECT id FROM menu_categories WHERE slug = 'hauptgerichte' LIMIT 1), 'Pho Ga', 'Hausgemachte Hühnerbrühe mit Reisbandnudeln', '12,90 €', 0),
  ((SELECT id FROM menu_categories WHERE slug = 'sushi' LIMIT 1), 'Crunchy Salmon Roll', 'Gebackene Lachsrolle mit Avocado und Rucola', '8,90 €', 0)
ON CONFLICT DO NOTHING;

-- Example options
INSERT INTO menu_item_options (menu_item_id, name, price, sort_order)
VALUES
  ((SELECT mi.id FROM menu_items mi JOIN menu_categories mc ON mi.category_id = mc.id WHERE mc.slug='vorspeisen' LIMIT 1), 'Extra Sauce', '0,50 €', 0),
  ((SELECT mi.id FROM menu_items mi JOIN menu_categories mc ON mi.category_id = mc.id WHERE mc.slug='hauptgerichte' LIMIT 1), 'Zusatz Fleisch', '3,50 €', 0)
ON CONFLICT DO NOTHING;
