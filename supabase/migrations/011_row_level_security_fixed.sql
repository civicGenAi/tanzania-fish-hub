-- =============================================
-- Row Level Security (RLS) Policies - FIXED
-- Complete RLS setup for Tanzania Fish Hub
-- Run this AFTER all migrations are complete
-- =============================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE seller_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE distributor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE deliveries ENABLE ROW LEVEL SECURITY;
ALTER TABLE delivery_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE seller_earnings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE regions ENABLE ROW LEVEL SECURITY;
ALTER TABLE region_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- =============================================
-- Helper Functions for RLS (in public schema)
-- =============================================

-- Check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND user_type = 'admin'
  );
$$ LANGUAGE SQL STABLE SECURITY DEFINER;

-- Check if user is seller
CREATE OR REPLACE FUNCTION public.is_seller()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND user_type = 'seller'
  );
$$ LANGUAGE SQL STABLE SECURITY DEFINER;

-- Check if user is distributor
CREATE OR REPLACE FUNCTION public.is_distributor()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND user_type = 'distributor'
  );
$$ LANGUAGE SQL STABLE SECURITY DEFINER;

-- Check if user is customer
CREATE OR REPLACE FUNCTION public.is_customer()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND user_type = 'customer'
  );
$$ LANGUAGE SQL STABLE SECURITY DEFINER;

-- =============================================
-- PROFILES TABLE POLICIES
-- =============================================

-- Users can read their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- Admins can update all profiles
CREATE POLICY "Admins can update all profiles"
  ON profiles FOR UPDATE
  TO authenticated
  USING (public.is_admin());

-- Allow profile creation on signup
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- =============================================
-- CUSTOMER PROFILES POLICIES
-- =============================================

CREATE POLICY "Customers can view own profile"
  ON customer_profiles FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() OR public.is_admin());

CREATE POLICY "Customers can update own profile"
  ON customer_profiles FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid() OR public.is_admin());

CREATE POLICY "Customers can insert own profile"
  ON customer_profiles FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- =============================================
-- SELLER PROFILES POLICIES
-- =============================================

CREATE POLICY "Sellers can view own profile"
  ON seller_profiles FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() OR public.is_admin());

CREATE POLICY "Sellers can update own profile"
  ON seller_profiles FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid() OR public.is_admin());

CREATE POLICY "Sellers can insert own profile"
  ON seller_profiles FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Public can view verified sellers"
  ON seller_profiles FOR SELECT
  TO public
  USING (verification_status = 'verified');

-- =============================================
-- DISTRIBUTOR PROFILES POLICIES
-- =============================================

CREATE POLICY "Distributors can view own profile"
  ON distributor_profiles FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() OR public.is_admin());

CREATE POLICY "Distributors can update own profile"
  ON distributor_profiles FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid() OR public.is_admin());

CREATE POLICY "Distributors can insert own profile"
  ON distributor_profiles FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- =============================================
-- CATEGORIES POLICIES
-- =============================================

CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins can manage categories"
  ON categories FOR ALL
  TO authenticated
  USING (public.is_admin());

-- =============================================
-- PRODUCTS POLICIES
-- =============================================

-- Public can view active products
CREATE POLICY "Public can view active products"
  ON products FOR SELECT
  TO public
  USING (status = 'active');

-- Sellers can view own products
CREATE POLICY "Sellers can view own products"
  ON products FOR SELECT
  TO authenticated
  USING (
    seller_id IN (SELECT id FROM seller_profiles WHERE user_id = auth.uid())
    OR public.is_admin()
  );

-- Sellers can insert own products
CREATE POLICY "Sellers can create own products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (
    seller_id IN (SELECT id FROM seller_profiles WHERE user_id = auth.uid())
  );

-- Sellers can update own products
CREATE POLICY "Sellers can update own products"
  ON products FOR UPDATE
  TO authenticated
  USING (
    seller_id IN (SELECT id FROM seller_profiles WHERE user_id = auth.uid())
    OR public.is_admin()
  );

-- Sellers can delete own products
CREATE POLICY "Sellers can delete own products"
  ON products FOR DELETE
  TO authenticated
  USING (
    seller_id IN (SELECT id FROM seller_profiles WHERE user_id = auth.uid())
    OR public.is_admin()
  );

-- =============================================
-- PRODUCT VARIANTS POLICIES
-- =============================================

CREATE POLICY "Public can view product variants"
  ON product_variants FOR SELECT
  TO public
  USING (
    product_id IN (SELECT id FROM products WHERE status = 'active')
  );

CREATE POLICY "Sellers can manage own product variants"
  ON product_variants FOR ALL
  TO authenticated
  USING (
    product_id IN (
      SELECT id FROM products
      WHERE seller_id IN (SELECT id FROM seller_profiles WHERE user_id = auth.uid())
    )
    OR public.is_admin()
  );

-- =============================================
-- ORDERS POLICIES
-- =============================================

-- Customers can view own orders
CREATE POLICY "Customers can view own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (
    customer_id IN (SELECT id FROM customer_profiles WHERE user_id = auth.uid())
    OR public.is_admin()
  );

-- Customers can create orders
CREATE POLICY "Customers can create orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (
    customer_id IN (SELECT id FROM customer_profiles WHERE user_id = auth.uid())
  );

-- Customers can update own pending orders
CREATE POLICY "Customers can update own pending orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (
    customer_id IN (SELECT id FROM customer_profiles WHERE user_id = auth.uid())
    AND status = 'pending'
  );

-- Admins can manage all orders
CREATE POLICY "Admins can manage all orders"
  ON orders FOR ALL
  TO authenticated
  USING (public.is_admin());

-- Distributors can view assigned orders
CREATE POLICY "Distributors can view assigned orders"
  ON orders FOR SELECT
  TO authenticated
  USING (
    assigned_distributor_id IN (SELECT id FROM distributor_profiles WHERE user_id = auth.uid())
  );

-- =============================================
-- ORDER ITEMS POLICIES
-- =============================================

-- Customers can view own order items
CREATE POLICY "Customers can view own order items"
  ON order_items FOR SELECT
  TO authenticated
  USING (
    order_id IN (
      SELECT id FROM orders
      WHERE customer_id IN (SELECT id FROM customer_profiles WHERE user_id = auth.uid())
    )
    OR public.is_admin()
  );

-- Sellers can view their product order items
CREATE POLICY "Sellers can view own product orders"
  ON order_items FOR SELECT
  TO authenticated
  USING (
    seller_id IN (SELECT id FROM seller_profiles WHERE user_id = auth.uid())
    OR public.is_admin()
  );

-- Sellers can update their order items status
CREATE POLICY "Sellers can update own order items"
  ON order_items FOR UPDATE
  TO authenticated
  USING (
    seller_id IN (SELECT id FROM seller_profiles WHERE user_id = auth.uid())
    OR public.is_admin()
  );

-- Allow insertion via orders
CREATE POLICY "Allow order item creation"
  ON order_items FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- =============================================
-- ORDER STATUS HISTORY POLICIES
-- =============================================

CREATE POLICY "Users can view order status history"
  ON order_status_history FOR SELECT
  TO authenticated
  USING (
    order_id IN (
      SELECT id FROM orders
      WHERE customer_id IN (SELECT id FROM customer_profiles WHERE user_id = auth.uid())
    )
    OR public.is_admin()
  );

CREATE POLICY "Admins can insert status history"
  ON order_status_history FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

-- =============================================
-- DELIVERIES POLICIES
-- =============================================

-- Customers can view own deliveries
CREATE POLICY "Customers can view own deliveries"
  ON deliveries FOR SELECT
  TO authenticated
  USING (
    order_id IN (
      SELECT id FROM orders
      WHERE customer_id IN (SELECT id FROM customer_profiles WHERE user_id = auth.uid())
    )
    OR public.is_admin()
  );

-- Distributors can view assigned deliveries
CREATE POLICY "Distributors can view assigned deliveries"
  ON deliveries FOR SELECT
  TO authenticated
  USING (
    distributor_id IN (SELECT id FROM distributor_profiles WHERE user_id = auth.uid())
    OR public.is_admin()
  );

-- Distributors can update assigned deliveries
CREATE POLICY "Distributors can update assigned deliveries"
  ON deliveries FOR UPDATE
  TO authenticated
  USING (
    distributor_id IN (SELECT id FROM distributor_profiles WHERE user_id = auth.uid())
    OR public.is_admin()
  );

-- Admins can manage all deliveries
CREATE POLICY "Admins can manage deliveries"
  ON deliveries FOR ALL
  TO authenticated
  USING (public.is_admin());

-- =============================================
-- DELIVERY TRACKING POLICIES
-- =============================================

CREATE POLICY "Users can view delivery tracking"
  ON delivery_tracking FOR SELECT
  TO authenticated
  USING (
    delivery_id IN (
      SELECT d.id FROM deliveries d
      JOIN orders o ON d.order_id = o.id
      WHERE o.customer_id IN (SELECT id FROM customer_profiles WHERE user_id = auth.uid())
    )
    OR delivery_id IN (
      SELECT id FROM deliveries
      WHERE distributor_id IN (SELECT id FROM distributor_profiles WHERE user_id = auth.uid())
    )
    OR public.is_admin()
  );

CREATE POLICY "Distributors can insert tracking"
  ON delivery_tracking FOR INSERT
  TO authenticated
  WITH CHECK (
    delivery_id IN (
      SELECT id FROM deliveries
      WHERE distributor_id IN (SELECT id FROM distributor_profiles WHERE user_id = auth.uid())
    )
    OR public.is_admin()
  );

-- =============================================
-- ADDRESSES POLICIES
-- =============================================

CREATE POLICY "Users can view own addresses"
  ON addresses FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() OR public.is_admin());

CREATE POLICY "Users can manage own addresses"
  ON addresses FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- =============================================
-- PAYMENTS POLICIES
-- =============================================

CREATE POLICY "Users can view own payments"
  ON payments FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() OR public.is_admin());

CREATE POLICY "Users can create payments"
  ON payments FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can manage payments"
  ON payments FOR ALL
  TO authenticated
  USING (public.is_admin());

-- =============================================
-- SELLER EARNINGS POLICIES
-- =============================================

CREATE POLICY "Sellers can view own earnings"
  ON seller_earnings FOR SELECT
  TO authenticated
  USING (
    seller_id IN (SELECT id FROM seller_profiles WHERE user_id = auth.uid())
    OR public.is_admin()
  );

CREATE POLICY "Admins can manage earnings"
  ON seller_earnings FOR ALL
  TO authenticated
  USING (public.is_admin());

-- =============================================
-- PAYOUTS POLICIES
-- =============================================

CREATE POLICY "Sellers can view own payouts"
  ON payouts FOR SELECT
  TO authenticated
  USING (
    seller_id IN (SELECT id FROM seller_profiles WHERE user_id = auth.uid())
    OR public.is_admin()
  );

CREATE POLICY "Admins can manage payouts"
  ON payouts FOR ALL
  TO authenticated
  USING (public.is_admin());

-- =============================================
-- REVIEWS POLICIES
-- =============================================

-- Public can view published reviews
CREATE POLICY "Public can view published reviews"
  ON reviews FOR SELECT
  TO public
  USING (status = 'published');

-- Authenticated users can view all reviews
CREATE POLICY "Authenticated can view reviews"
  ON reviews FOR SELECT
  TO authenticated
  USING (true);

-- Customers can create reviews for purchased products
CREATE POLICY "Customers can create reviews"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (
    customer_id IN (SELECT id FROM customer_profiles WHERE user_id = auth.uid())
  );

-- Customers can update own reviews
CREATE POLICY "Customers can update own reviews"
  ON reviews FOR UPDATE
  TO authenticated
  USING (
    customer_id IN (SELECT id FROM customer_profiles WHERE user_id = auth.uid())
  );

-- Sellers can respond to reviews
CREATE POLICY "Sellers can respond to reviews"
  ON reviews FOR UPDATE
  TO authenticated
  USING (
    seller_id IN (SELECT id FROM seller_profiles WHERE user_id = auth.uid())
  );

-- Admins can manage all reviews
CREATE POLICY "Admins can manage reviews"
  ON reviews FOR ALL
  TO authenticated
  USING (public.is_admin());

-- =============================================
-- REVIEW VOTES POLICIES
-- =============================================

CREATE POLICY "Users can view review votes"
  ON review_votes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can vote on reviews"
  ON review_votes FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own votes"
  ON review_votes FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete own votes"
  ON review_votes FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- =============================================
-- REGIONS POLICIES
-- =============================================

CREATE POLICY "Anyone can view regions"
  ON regions FOR SELECT
  TO public
  USING (active = true);

CREATE POLICY "Admins can manage regions"
  ON regions FOR ALL
  TO authenticated
  USING (public.is_admin());

-- =============================================
-- REGION STATS POLICIES
-- =============================================

CREATE POLICY "Admins can view region stats"
  ON region_stats FOR SELECT
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admins can manage region stats"
  ON region_stats FOR ALL
  TO authenticated
  USING (public.is_admin());

-- =============================================
-- NOTIFICATIONS POLICIES
-- =============================================

CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() OR public.is_admin());

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "System can create notifications"
  ON notifications FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can delete own notifications"
  ON notifications FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- =============================================
-- CONVERSATIONS POLICIES
-- =============================================

CREATE POLICY "Customers can view own conversations"
  ON conversations FOR SELECT
  TO authenticated
  USING (customer_id = auth.uid() OR public.is_admin());

CREATE POLICY "Customers can create conversations"
  ON conversations FOR INSERT
  TO authenticated
  WITH CHECK (customer_id = auth.uid());

CREATE POLICY "Admins can manage conversations"
  ON conversations FOR ALL
  TO authenticated
  USING (public.is_admin());

-- =============================================
-- MESSAGES POLICIES
-- =============================================

CREATE POLICY "Users can view own conversation messages"
  ON messages FOR SELECT
  TO authenticated
  USING (
    conversation_id IN (SELECT id FROM conversations WHERE customer_id = auth.uid())
    OR public.is_admin()
  );

CREATE POLICY "Users can send messages"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (
    conversation_id IN (SELECT id FROM conversations WHERE customer_id = auth.uid())
    OR public.is_admin()
  );

CREATE POLICY "Users can update own messages"
  ON messages FOR UPDATE
  TO authenticated
  USING (sender_id = auth.uid() OR public.is_admin());

-- =============================================
-- ANALYTICS EVENTS POLICIES
-- =============================================

CREATE POLICY "Anyone can insert analytics events"
  ON analytics_events FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Admins can view analytics events"
  ON analytics_events FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- =============================================
-- DAILY STATS POLICIES
-- =============================================

CREATE POLICY "Admins can view daily stats"
  ON daily_stats FOR SELECT
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "System can manage daily stats"
  ON daily_stats FOR ALL
  TO authenticated
  USING (public.is_admin());

-- =============================================
-- AUDIT LOGS POLICIES
-- =============================================

CREATE POLICY "Admins can view audit logs"
  ON audit_logs FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- Audit logs are insert-only
CREATE POLICY "System can insert audit logs"
  ON audit_logs FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- =============================================
-- GRANT ACCESS TO VIEWS
-- =============================================

GRANT SELECT ON seller_dashboard_stats TO authenticated;
GRANT SELECT ON customer_dashboard_stats TO authenticated;
GRANT SELECT ON distributor_dashboard_stats TO authenticated;
GRANT SELECT ON admin_overview_stats TO authenticated;

-- =============================================
-- SUCCESS MESSAGE
-- =============================================
DO $$
BEGIN
  RAISE NOTICE 'Row Level Security policies have been successfully applied!';
  RAISE NOTICE 'Total tables secured: 26';
  RAISE NOTICE 'Helper functions created: 4';
END $$;
