-- =============================================
-- Analytics & Audit Trail Tables
-- =============================================

-- =============================================
-- Analytics Events Table
-- =============================================
CREATE TABLE analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_type TEXT NOT NULL,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    session_id TEXT,
    data JSONB DEFAULT '{}',
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- Daily Stats Table
-- =============================================
CREATE TABLE daily_stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE UNIQUE NOT NULL,
    total_orders INTEGER DEFAULT 0,
    total_revenue DECIMAL(12, 2) DEFAULT 0,
    total_customers INTEGER DEFAULT 0,
    new_customers INTEGER DEFAULT 0,
    avg_order_value DECIMAL(10, 2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- Audit Logs Table
-- =============================================
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    resource_type TEXT NOT NULL,
    resource_id UUID,
    changes JSONB DEFAULT '{}',
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- Indexes
-- =============================================
CREATE INDEX idx_analytics_events_event_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_events_user_id ON analytics_events(user_id);
CREATE INDEX idx_analytics_events_created_at ON analytics_events(created_at DESC);
CREATE INDEX idx_daily_stats_date ON daily_stats(date DESC);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_resource_type ON audit_logs(resource_type);
CREATE INDEX idx_audit_logs_resource_id ON audit_logs(resource_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at DESC);

-- =============================================
-- Function to log audit trail
-- =============================================
CREATE OR REPLACE FUNCTION log_audit_trail()
RETURNS TRIGGER AS $$
DECLARE
    current_user_id UUID;
    action_type TEXT;
    old_data JSONB;
    new_data JSONB;
BEGIN
    -- Get current user ID from auth context
    current_user_id := auth.uid();

    -- Determine action type
    IF TG_OP = 'INSERT' THEN
        action_type := 'create';
        new_data := to_jsonb(NEW);
        old_data := NULL;
    ELSIF TG_OP = 'UPDATE' THEN
        action_type := 'update';
        new_data := to_jsonb(NEW);
        old_data := to_jsonb(OLD);
    ELSIF TG_OP = 'DELETE' THEN
        action_type := 'delete';
        new_data := NULL;
        old_data := to_jsonb(OLD);
    END IF;

    -- Insert audit log
    INSERT INTO audit_logs (
        user_id,
        action,
        resource_type,
        resource_id,
        changes
    ) VALUES (
        current_user_id,
        action_type,
        TG_TABLE_NAME,
        COALESCE(NEW.id, OLD.id),
        jsonb_build_object(
            'old', old_data,
            'new', new_data
        )
    );

    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- Apply audit logging to key tables
-- =============================================
CREATE TRIGGER audit_products
    AFTER INSERT OR UPDATE OR DELETE ON products
    FOR EACH ROW EXECUTE FUNCTION log_audit_trail();

CREATE TRIGGER audit_orders
    AFTER INSERT OR UPDATE OR DELETE ON orders
    FOR EACH ROW EXECUTE FUNCTION log_audit_trail();

CREATE TRIGGER audit_profiles
    AFTER INSERT OR UPDATE OR DELETE ON profiles
    FOR EACH ROW EXECUTE FUNCTION log_audit_trail();

-- =============================================
-- Function to calculate daily stats
-- =============================================
CREATE OR REPLACE FUNCTION calculate_daily_stats(target_date DATE)
RETURNS VOID AS $$
BEGIN
    INSERT INTO daily_stats (
        date,
        total_orders,
        total_revenue,
        total_customers,
        new_customers,
        avg_order_value
    )
    SELECT
        target_date,
        COUNT(DISTINCT o.id),
        COALESCE(SUM(o.total), 0),
        COUNT(DISTINCT o.customer_id),
        COUNT(DISTINCT CASE
            WHEN cp.created_at::DATE = target_date THEN cp.id
        END),
        COALESCE(AVG(o.total), 0)
    FROM orders o
    LEFT JOIN customer_profiles cp ON o.customer_id = cp.id
    WHERE o.created_at::DATE = target_date
    ON CONFLICT (date) DO UPDATE SET
        total_orders = EXCLUDED.total_orders,
        total_revenue = EXCLUDED.total_revenue,
        total_customers = EXCLUDED.total_customers,
        new_customers = EXCLUDED.new_customers,
        avg_order_value = EXCLUDED.avg_order_value;
END;
$$ LANGUAGE plpgsql;
