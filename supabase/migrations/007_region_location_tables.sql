-- =============================================
-- Region & Location Tables
-- =============================================

-- =============================================
-- Regions Table
-- =============================================
CREATE TABLE regions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    code TEXT UNIQUE NOT NULL,
    population INTEGER,
    delivery_fee DECIMAL(10, 2) NOT NULL,
    avg_delivery_time INTEGER,
    coverage DECIMAL(5, 2) DEFAULT 0,
    active BOOLEAN DEFAULT TRUE,
    bounds JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- Region Stats Table
-- =============================================
CREATE TABLE region_stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    region_id UUID NOT NULL REFERENCES regions(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    total_orders INTEGER DEFAULT 0,
    total_customers INTEGER DEFAULT 0,
    total_revenue DECIMAL(12, 2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(region_id, date)
);

-- =============================================
-- Indexes
-- =============================================
CREATE INDEX idx_regions_code ON regions(code);
CREATE INDEX idx_regions_active ON regions(active);
CREATE INDEX idx_region_stats_region_id ON region_stats(region_id);
CREATE INDEX idx_region_stats_date ON region_stats(date DESC);

-- =============================================
-- Insert Default Regions
-- =============================================
INSERT INTO regions (name, code, population, delivery_fee, avg_delivery_time, coverage, active) VALUES
('Dar es Salaam', 'DSM', 6500000, 3000, 45, 95.00, true),
('Mwanza', 'MWZ', 1120000, 4000, 60, 78.00, true),
('Arusha', 'ARU', 617000, 4500, 50, 82.00, true),
('Dodoma', 'DOD', 765000, 3500, 55, 70.00, true),
('Mbeya', 'MBY', 547000, 5000, 90, 65.00, true),
('Morogoro', 'MOR', 460000, 4000, 60, 58.00, true),
('Tanga', 'TAN', 375000, 4500, 70, 60.00, true),
('Zanzibar', 'ZNZ', 590000, 5000, 120, 55.00, true);
