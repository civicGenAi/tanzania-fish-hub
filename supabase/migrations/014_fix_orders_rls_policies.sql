-- =============================================
-- Fix Orders RLS Policies
-- Migration: 014_fix_orders_rls_policies.sql
-- =============================================

-- Drop existing restrictive update policy
DROP POLICY IF EXISTS "Customers can update own pending orders" ON orders;

-- Create comprehensive update policy allowing:
-- 1. Customers to update their own pending orders
-- 2. Sellers to update orders containing their products
-- 3. Admins to update any orders
-- 4. Distributors to update assigned orders
CREATE POLICY "Allow order updates"
  ON orders FOR UPDATE
  TO authenticated
  USING (
    -- Customers can update their own pending orders
    (customer_id IN (SELECT id FROM customer_profiles WHERE user_id = auth.uid())
     AND status = 'pending')
    -- Sellers can update orders containing their products
    OR id IN (
      SELECT DISTINCT order_id FROM order_items
      WHERE seller_id IN (SELECT id FROM seller_profiles WHERE user_id = auth.uid())
    )
    -- Distributors can update assigned orders
    OR assigned_distributor_id IN (SELECT id FROM distributor_profiles WHERE user_id = auth.uid())
    -- Admins can update any order
    OR public.is_admin()
  );

-- Also ensure sellers can view orders containing their products
-- Drop and recreate the seller view policy to be more comprehensive
DROP POLICY IF EXISTS "Sellers can view own product orders" ON orders;

CREATE POLICY "Sellers can view orders with their products"
  ON orders FOR SELECT
  TO authenticated
  USING (
    -- Sellers can view orders containing their products
    id IN (
      SELECT DISTINCT order_id FROM order_items
      WHERE seller_id IN (SELECT id FROM seller_profiles WHERE user_id = auth.uid())
    )
    OR public.is_admin()
  );
