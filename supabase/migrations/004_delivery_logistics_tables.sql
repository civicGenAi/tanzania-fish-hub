-- =============================================
-- Delivery & Logistics Tables
-- =============================================

CREATE TYPE delivery_status AS ENUM ('pending', 'assigned', 'picked_up', 'in_transit', 'delivered', 'failed', 'cancelled');
CREATE TYPE delivery_priority AS ENUM ('normal', 'high', 'urgent');

-- =============================================
-- Deliveries Table
-- =============================================
CREATE TABLE deliveries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    delivery_number TEXT UNIQUE NOT NULL,
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE RESTRICT,
    distributor_id UUID REFERENCES distributor_profiles(id) ON DELETE SET NULL,
    status delivery_status DEFAULT 'pending',
    priority delivery_priority DEFAULT 'normal',
    pickup_location TEXT NOT NULL,
    delivery_location TEXT NOT NULL,
    pickup_lat DECIMAL(10, 8),
    pickup_lng DECIMAL(11, 8),
    delivery_lat DECIMAL(10, 8),
    delivery_lng DECIMAL(11, 8),
    distance DECIMAL(8, 2),
    estimated_time INTEGER,
    scheduled_time TIMESTAMP WITH TIME ZONE,
    pickup_time TIMESTAMP WITH TIME ZONE,
    delivery_time TIMESTAMP WITH TIME ZONE,
    proof_of_delivery TEXT,
    signature TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- Delivery Tracking Table
-- =============================================
CREATE TABLE delivery_tracking (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    delivery_id UUID NOT NULL REFERENCES deliveries(id) ON DELETE CASCADE,
    lat DECIMAL(10, 8) NOT NULL,
    lng DECIMAL(11, 8) NOT NULL,
    status TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- Addresses Table
-- =============================================
CREATE TYPE address_type AS ENUM ('home', 'work', 'other');

CREATE TABLE addresses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    type address_type DEFAULT 'home',
    label TEXT,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    street_address TEXT NOT NULL,
    city TEXT NOT NULL,
    region TEXT NOT NULL,
    postal_code TEXT,
    country TEXT DEFAULT 'Tanzania',
    lat DECIMAL(10, 8),
    lng DECIMAL(11, 8),
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- Indexes
-- =============================================
CREATE INDEX idx_deliveries_delivery_number ON deliveries(delivery_number);
CREATE INDEX idx_deliveries_order_id ON deliveries(order_id);
CREATE INDEX idx_deliveries_distributor_id ON deliveries(distributor_id);
CREATE INDEX idx_deliveries_status ON deliveries(status);
CREATE INDEX idx_deliveries_created_at ON deliveries(created_at DESC);
CREATE INDEX idx_delivery_tracking_delivery_id ON delivery_tracking(delivery_id);
CREATE INDEX idx_delivery_tracking_created_at ON delivery_tracking(created_at DESC);
CREATE INDEX idx_addresses_user_id ON addresses(user_id);
CREATE INDEX idx_addresses_is_default ON addresses(is_default);

-- =============================================
-- Triggers
-- =============================================
CREATE TRIGGER update_deliveries_updated_at
    BEFORE UPDATE ON deliveries
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_addresses_updated_at
    BEFORE UPDATE ON addresses
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to generate delivery number
CREATE OR REPLACE FUNCTION generate_delivery_number()
RETURNS TRIGGER AS $$
BEGIN
    NEW.delivery_number := 'DEL-' || LPAD(nextval('delivery_number_seq')::TEXT, 6, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create sequence for delivery numbers
CREATE SEQUENCE delivery_number_seq START 1000;

-- Trigger to auto-generate delivery number
CREATE TRIGGER set_delivery_number
    BEFORE INSERT ON deliveries
    FOR EACH ROW
    WHEN (NEW.delivery_number IS NULL)
    EXECUTE FUNCTION generate_delivery_number();

-- Add foreign key constraint for active_delivery_id
ALTER TABLE distributor_profiles
ADD CONSTRAINT fk_active_delivery
FOREIGN KEY (active_delivery_id) REFERENCES deliveries(id) ON DELETE SET NULL;

-- Add foreign key for shipping address
ALTER TABLE orders
ADD CONSTRAINT fk_shipping_address
FOREIGN KEY (shipping_address_id) REFERENCES addresses(id) ON DELETE SET NULL;
