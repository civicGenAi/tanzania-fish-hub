// Product types based on database schema

export type ProductStatus = 'active' | 'inactive' | 'out_of_stock' | 'discontinued';
export type ProductUnit = 'kg' | 'piece' | 'dozen' | 'bundle';

export interface Product {
  id: string;
  seller_id: string;
  category_id: string;
  name: string;
  slug: string;
  sku: string;
  description: string | null;
  price: number;
  status: ProductStatus;
  stock: number;
  unit: ProductUnit;
  min_order_quantity: number;
  images: string[];
  rating?: number;
  total_reviews?: number;
  created_at: string;
  updated_at: string;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  name: string;
  price: number;
  stock: number;
  sku: string | null;
  attributes: Record<string, any> | null;
  created_at: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  parent_id: string | null;
  icon_url: string | null;
  created_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  display_order: number;
  created_at: string;
}

// DTOs for creating/updating products
export interface CreateProductData {
  category_id: string;
  name: string;
  slug: string;
  sku: string;
  description?: string;
  price: number;
  stock: number;
  unit: ProductUnit;
  min_order_quantity?: number;
  images?: string[];
}

export interface UpdateProductData {
  category_id?: string;
  name?: string;
  slug?: string;
  sku?: string;
  description?: string;
  price?: number;
  status?: ProductStatus;
  stock?: number;
  unit?: ProductUnit;
  min_order_quantity?: number;
  images?: string[];
}

export interface ProductFilters {
  category_id?: string;
  seller_id?: string;
  status?: ProductStatus;
  min_price?: number;
  max_price?: number;
  search?: string;
  in_stock?: boolean;
}

export interface ProductWithDetails extends Product {
  category?: ProductCategory;
  seller?: {
    id: string;
    business_name: string;
    user_id: string;
  };
  images?: ProductImage[];
  variants?: ProductVariant[];
}
