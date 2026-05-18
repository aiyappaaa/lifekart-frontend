export type UnitType = 'kg' | 'liter' | 'piece' | 'pack' | 'meter' | 'pair';

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  unit_type: UnitType;
  avg_lifetime_consumption_per_year: number;
}

export interface Product {
  id: string;
  category_id: string;
  manufacturer_id: string;
  name: string;
  sku: string;
  image_url: string | null;
  unit_size: string;
  unit_price_wholesale: number;
  unit_price_retail: number;
  min_order_quantity: number;
  max_order_quantity: number | null;
  is_active: boolean;
}

export interface ProductFilter {
  category_id?: string;
  search?: string;
  min_price?: number;
  max_price?: number;
  page?: number;
  page_size?: number;
}