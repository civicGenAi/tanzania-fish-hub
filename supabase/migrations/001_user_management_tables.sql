-- =============================================
-- User Management Tables
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User types enum
CREATE TYPE user_type AS ENUM ('customer', 'seller', 'distributor', 'admin');
CREATE TYPE user_status AS ENUM ('active', 'inactive', 'suspended');
CREATE TYPE verification_status AS ENUM ('pending', 'verified', 'rejected');
CREATE TYPE customer_tier AS ENUM ('bronze', 'silver', 'gold', 'platinum');
CREATE TYPE distributor_status AS ENUM ('available', 'busy', 'offline');

-- =============================================
-- Profiles Table (extends auth.users)
-- =============================================
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    phone TEXT,
    avatar_url TEXT,
    user_type user_type NOT NULL DEFAULT 'customer',
    status user_status NOT NULL DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- Customer Profiles
-- =============================================
CREATE TABLE customer_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    tier customer_tier NOT NULL DEFAULT 'bronze',
    loyalty_points INTEGER DEFAULT 0,
    total_spent DECIMAL(10, 2) DEFAULT 0,
    total_orders INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- Seller Profiles
-- =============================================
CREATE TABLE seller_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    business_name TEXT NOT NULL,
    business_license TEXT,
    verification_status verification_status DEFAULT 'pending',
    rating DECIMAL(3, 2) DEFAULT 0,
    total_sales DECIMAL(12, 2) DEFAULT 0,
    commission_rate DECIMAL(5, 4) DEFAULT 0.15,
    bank_account TEXT,
    mpesa_number TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- Distributor Profiles
-- =============================================
CREATE TABLE distributor_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    vehicle_type TEXT,
    vehicle_registration TEXT,
    license_number TEXT,
    verification_status verification_status DEFAULT 'pending',
    rating DECIMAL(3, 2) DEFAULT 0,
    total_deliveries INTEGER DEFAULT 0,
    active_delivery_id UUID,
    status distributor_status DEFAULT 'offline',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- Indexes for User Tables
-- =============================================
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_user_type ON profiles(user_type);
CREATE INDEX idx_profiles_status ON profiles(status);
CREATE INDEX idx_customer_profiles_user_id ON customer_profiles(user_id);
CREATE INDEX idx_seller_profiles_user_id ON seller_profiles(user_id);
CREATE INDEX idx_distributor_profiles_user_id ON distributor_profiles(user_id);
CREATE INDEX idx_distributor_profiles_status ON distributor_profiles(status);

-- =============================================
-- Updated_at trigger function
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to profiles
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
