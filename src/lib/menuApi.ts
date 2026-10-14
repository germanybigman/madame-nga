import { supabase } from './supabase';
import type { MenuCategory, MenuItem, MenuItemOption } from './types';

export async function fetchMenuData(): Promise<MenuCategory[]> {
  const { data: categories, error: catError } = await supabase
    .from('menu_categories')
    .select('*')
    .order('sort_order', { ascending: true });

  if (catError) throw catError;
  if (!categories || categories.length === 0) return [];

  const { data: items, error: itemError } = await supabase
    .from('menu_items')
    .select('*')
    .order('sort_order', { ascending: true });

  if (itemError) throw itemError;

  const { data: options, error: optError } = await supabase
    .from('menu_item_options')
    .select('*')
    .order('sort_order', { ascending: true });

  if (optError) throw optError;

  const optionsByItem = new Map<string, MenuItemOption[]>();
  for (const opt of options || []) {
    const list = optionsByItem.get(opt.menu_item_id) || [];
    list.push(opt);
    optionsByItem.set(opt.menu_item_id, list);
  }

  const itemsByCategory = new Map<string, MenuItem[]>();
  for (const item of items || []) {
    const list = itemsByCategory.get(item.category_id) || [];
    list.push({ ...item, options: optionsByItem.get(item.id) || [] });
    itemsByCategory.set(item.category_id, list);
  }

  return categories.map((cat) => ({
    ...cat,
    items: itemsByCategory.get(cat.id) || [],
  }));
}
