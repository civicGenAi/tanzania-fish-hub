-- =============================================
-- Fix Infinite Recursion in RLS Policies
-- Migration: 015_fix_infinite_recursion_rls.sql
-- =============================================

-- The issue: orders policies query order_items, and order_items policies query orders
-- Solution: Use security definer functions to break the circular dependency

-- Drop problematic policies
DROP POLICY IF EXISTS "Allow order updates" ON orders;
DROP POLICY IF EXISTS "Sellers can view orders with their products" ON orders;
DROP POLICY IF EXISTS "Customers can view own order items" ON order_items;

-- Create helper function to check if user owns an order (as customer)
CREATE OR REPLACE FUNCTION public.user_owns_order(order_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM orders o
    JOIN customer_profiles cp ON o.customer_id = cp.id
    WHERE o.id = order_id
    AND cp.user_id = auth.uid()
  );
END;
$$;

-- Create helper function to check if seller has products in order
CREATE OR REPLACE FUNCTION public.seller_has_products_in_order(order_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM order_items oi
    JOIN seller_profiles sp ON oi.seller_id = sp.id
    WHERE oi.order_id = order_id
    AND sp.user_id = auth.uid()
  );
END;
$$;

-- Recreate orders UPDATE policy without querying order_items directly
CREATE POLICY "Allow order updates"
  ON orders FOR UPDATE
  TO authenticated
  USING (
    -- Customers can update their own pending orders
    (customer_id IN (SELECT id FROM customer_profiles WHERE user_id = auth.uid())
     AND status = 'pending')
    -- Sellers can update orders (checked via function)
    OR public.seller_has_products_in_order(id)
    -- Distributors can update assigned orders
    OR assigned_distributor_id IN (SELECT id FROM distributor_profiles WHERE user_id = auth.uid())
    -- Admins can update any order
    OR public.is_admin()
  );

-- Recreate orders SELECT policy for sellers
CREATE POLICY "Sellers can view orders with their products"
  ON orders FOR SELECT
  TO authenticated
  USING (
    -- Sellers can view orders (checked via function)
    public.seller_has_products_in_order(id)
    OR public.is_admin()
  );

-- Recreate order_items SELECT policy without querying orders directly
CREATE POLICY "Customers can view own order items"
  ON order_items FOR SELECT
  TO authenticated
  USING (
    -- Use helper function instead of subquery
    public.user_owns_order(order_id)
    OR public.is_admin()
  );

-- Grant execute permissions on helper functions
GRANT EXECUTE ON FUNCTION public.user_owns_order(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.seller_has_products_in_order(UUID) TO authenticated;
