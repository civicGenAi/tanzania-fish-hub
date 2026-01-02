-- =============================================
-- Sample Data for Development/Testing
-- =============================================

-- =============================================
-- Insert Sample Categories
-- =============================================
INSERT INTO categories (name, slug, description, image_url) VALUES
('Fresh Fish', 'fresh-fish', 'Freshly caught fish from Lake Victoria and the Indian Ocean', 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=400'),
('Dried Fish', 'dried-fish', 'Sun-dried and preserved fish products', 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400'),
('Smoked Fish', 'smoked-fish', 'Traditionally smoked fish for rich flavor', 'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=400'),
('Seafood', 'seafood', 'Fresh prawns, crabs, lobsters and more', 'https://images.unsplash.com/photo-1559737558-2f99945bd d8f?w=400'),
('Fish Products', 'fish-products', 'Processed fish products and fish oil', 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400');

-- Note: Sample products, orders, and other data will be added through the application
-- to ensure proper seller IDs and customer IDs exist from authenticated users

-- =============================================
-- Useful Views for Dashboard
-- =============================================

-- View for seller dashboard statistics
CREATE OR REPLACE VIEW seller_dashboard_stats AS
SELECT
    sp.id AS seller_id,
    sp.user_id,
    COUNT(DISTINCT p.id) AS total_products,
    COUNT(DISTINCT oi.order_id) AS total_orders,
    COALESCE(SUM(oi.total_price), 0) AS total_sales,
    COALESCE(AVG(r.rating), 0) AS avg_rating,
    COUNT(DISTINCT r.id) AS total_reviews
FROM seller_profiles sp
LEFT JOIN products p ON sp.id = p.seller_id
LEFT JOIN order_items oi ON p.id = oi.product_id
LEFT JOIN reviews r ON sp.id = r.seller_id AND r.status = 'published'
GROUP BY sp.id, sp.user_id;

-- View for customer dashboard statistics
CREATE OR REPLACE VIEW customer_dashboard_stats AS
SELECT
    cp.id AS customer_id,
    cp.user_id,
    cp.tier,
    cp.loyalty_points,
    COUNT(DISTINCT o.id) AS total_orders,
    COALESCE(SUM(o.total), 0) AS total_spent,
    COUNT(DISTINCT r.id) AS total_reviews
FROM customer_profiles cp
LEFT JOIN orders o ON cp.id = o.customer_id
LEFT JOIN reviews r ON cp.id = r.customer_id
GROUP BY cp.id, cp.user_id, cp.tier, cp.loyalty_points;

-- View for distributor dashboard statistics
CREATE OR REPLACE VIEW distributor_dashboard_stats AS
SELECT
    dp.id AS distributor_id,
    dp.user_id,
    dp.status,
    dp.rating,
    COUNT(DISTINCT d.id) AS total_deliveries,
    COUNT(DISTINCT CASE WHEN d.status = 'delivered' THEN d.id END) AS completed_deliveries,
    COUNT(DISTINCT CASE WHEN d.status = 'in_transit' THEN d.id END) AS active_deliveries,
    COALESCE(AVG(CASE
        WHEN d.delivery_time IS NOT NULL AND d.pickup_time IS NOT NULL
        THEN EXTRACT(EPOCH FROM (d.delivery_time - d.pickup_time))/60
    END), 0) AS avg_delivery_time_minutes
FROM distributor_profiles dp
LEFT JOIN deliveries d ON dp.id = d.distributor_id
GROUP BY dp.id, dp.user_id, dp.status, dp.rating;

-- View for admin dashboard overview
CREATE OR REPLACE VIEW admin_overview_stats AS
SELECT
    (SELECT COUNT(*) FROM orders WHERE created_at >= CURRENT_DATE) AS today_orders,
    (SELECT COALESCE(SUM(total), 0) FROM orders WHERE created_at >= CURRENT_DATE) AS today_revenue,
    (SELECT COUNT(*) FROM customer_profiles WHERE created_at >= CURRENT_DATE) AS today_new_customers,
    (SELECT COUNT(*) FROM products WHERE status = 'active') AS active_products,
    (SELECT COUNT(*) FROM orders WHERE status IN ('pending', 'confirmed')) AS pending_orders,
    (SELECT COUNT(*) FROM deliveries WHERE status = 'in_transit') AS active_deliveries,
    (SELECT COUNT(*) FROM reviews WHERE status = 'pending') AS pending_reviews,
    (SELECT COUNT(*) FROM products WHERE stock < min_order_quantity) AS low_stock_products;

COMMENT ON VIEW seller_dashboard_stats IS 'Aggregated statistics for seller dashboards';
COMMENT ON VIEW customer_dashboard_stats IS 'Aggregated statistics for customer dashboards';
COMMENT ON VIEW distributor_dashboard_stats IS 'Aggregated statistics for distributor dashboards';
COMMENT ON VIEW admin_overview_stats IS 'Real-time overview statistics for admin dashboard';
