export interface MenuItemOption {
  id: string;
  menu_item_id: string;
  name: string;
  price: string;
  sort_order: number;
}

export interface MenuItem {
  id: string;
  category_id: string;
  name: string;
  description: string | null;
  price: string;
  sort_order: number;
  options?: MenuItemOption[];
}

export interface MenuCategory {
  id: string;
  title: string;
  subtitle: string | null;
  slug: string;
  sort_order: number;
  items?: MenuItem[];
}

export interface MenuCategoryInput {
  title: string;
  subtitle: string | null;
  slug: string;
  sort_order: number;
}

export interface MenuItemInput {
  category_id: string;
  name: string;
  description: string | null;
  price: string;
  sort_order: number;
}

export interface MenuItemOptionInput {
  menu_item_id: string;
  name: string;
  price: string;
  sort_order: number;
}
