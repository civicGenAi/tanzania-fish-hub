import { supabase } from '@/lib/supabase';
import {
  Product,
  ProductWithDetails,
  CreateProductData,
  UpdateProductData,
  ProductFilters,
  ProductCategory,
  ProductImage,
} from '@/types/product.types';

class ProductsService {
  // Get all products with filters
  async getProducts(filters?: ProductFilters): Promise<Product[]> {
    try {
      let query = supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (filters?.category_id) {
        query = query.eq('category_id', filters.category_id);
      }

      if (filters?.seller_id) {
        query = query.eq('seller_id', filters.seller_id);
      }

      if (filters?.status) {
        query = query.eq('status', filters.status);
      }

      if (filters?.min_price) {
        query = query.gte('base_price', filters.min_price);
      }

      if (filters?.max_price) {
        query = query.lte('base_price', filters.max_price);
      }

      if (filters?.search) {
        query = query.ilike('name', `%${filters.search}%`);
      }

      if (filters?.in_stock) {
        query = query.gt('stock_quantity', 0);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  // Get single product by ID with full details
  async getProductById(id: string): Promise<ProductWithDetails | null> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          category:product_categories(id, name, slug),
          seller:seller_profiles(id, business_name, user_id),
          images:product_images(id, image_url, display_order),
          variants:product_variants(id, name, price, stock_quantity, sku)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as ProductWithDetails;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  }

  // Get products by seller ID
  async getSellerProducts(sellerId: string): Promise<Product[]> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('seller_id', sellerId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching seller products:', error);
      throw error;
    }
  }

  // Create a new product
  async createProduct(sellerId: string, productData: CreateProductData): Promise<Product> {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert({
          seller_id: sellerId,
          ...productData,
          status: 'active',
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  // Update a product
  async updateProduct(productId: string, updates: UpdateProductData): Promise<Product> {
    try {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', productId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  // Delete a product
  async deleteProduct(productId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }

  // Update product stock
  async updateStock(productId: string, quantity: number): Promise<Product> {
    try {
      const { data, error } = await supabase
        .from('products')
        .update({ stock_quantity: quantity })
        .eq('id', productId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating stock:', error);
      throw error;
    }
  }

  // Get all categories
  async getCategories(): Promise<ProductCategory[]> {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  // Upload product image
  async uploadProductImage(file: File, productId: string): Promise<string> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${productId}-${Date.now()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }

  // Add product image to database
  async addProductImage(productId: string, imageUrl: string, displayOrder: number = 0): Promise<ProductImage> {
    try {
      const { data, error } = await supabase
        .from('product_images')
        .insert({
          product_id: productId,
          image_url: imageUrl,
          display_order: displayOrder,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error adding product image:', error);
      throw error;
    }
  }

  // Delete product image
  async deleteProductImage(imageId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('product_images')
        .delete()
        .eq('id', imageId);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting product image:', error);
      throw error;
    }
  }

  // Search products
  async searchProducts(query: string): Promise<Product[]> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
        .eq('status', 'active')
        .gt('stock_quantity', 0)
        .limit(20);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }
}

export const productsService = new ProductsService();
