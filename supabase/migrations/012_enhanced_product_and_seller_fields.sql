-- =============================================
-- Enhanced Product Fields for International Market
-- Migration: 012_enhanced_product_and_seller_fields.sql
-- =============================================

-- Add enhanced product fields
ALTER TABLE products
ADD COLUMN IF NOT EXISTS scientific_name TEXT,
ADD COLUMN IF NOT EXISTS product_type TEXT, -- Whole, Fillet, Steaks, etc.
ADD COLUMN IF NOT EXISTS source TEXT, -- Farmed, Wild-caught, Aquaculture
ADD COLUMN IF NOT EXISTS weight_per_unit DECIMAL(10, 2),
ADD COLUMN IF NOT EXISTS size_grade TEXT, -- Small, Medium, Large, etc.
ADD COLUMN IF NOT EXISTS harvest_date DATE,
ADD COLUMN IF NOT EXISTS expiry_date DATE,
ADD COLUMN IF NOT EXISTS storage_condition TEXT,
ADD COLUMN IF NOT EXISTS processing_status TEXT,
ADD COLUMN IF NOT EXISTS origin_location TEXT,
ADD COLUMN IF NOT EXISTS supplier_name TEXT,
ADD COLUMN IF NOT EXISTS supplier_contact TEXT,
ADD COLUMN IF NOT EXISTS quality_grade TEXT, -- A, B, C
ADD COLUMN IF NOT EXISTS product_notes TEXT;

-- =============================================
-- Enhanced Seller Profile Fields for Export Compliance
-- =============================================

ALTER TABLE seller_profiles
-- Store Information
ADD COLUMN IF NOT EXISTS avatar_url TEXT,
ADD COLUMN IF NOT EXISTS business_address TEXT,
ADD COLUMN IF NOT EXISTS business_description TEXT,
ADD COLUMN IF NOT EXISTS business_email TEXT,
ADD COLUMN IF NOT EXISTS business_phone TEXT,
ADD COLUMN IF NOT EXISTS operating_hours TEXT,
ADD COLUMN IF NOT EXISTS website_url TEXT,

-- Food Safety Certifications
ADD COLUMN IF NOT EXISTS haccp_certified BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS haccp_cert_number TEXT,
ADD COLUMN IF NOT EXISTS haccp_expiry_date DATE,
ADD COLUMN IF NOT EXISTS gap_certified BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS gap_cert_number TEXT,
ADD COLUMN IF NOT EXISTS gap_expiry_date DATE,
ADD COLUMN IF NOT EXISTS gmp_certified BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS gmp_cert_number TEXT,
ADD COLUMN IF NOT EXISTS gmp_expiry_date DATE,
ADD COLUMN IF NOT EXISTS sanitary_cert_number TEXT,
ADD COLUMN IF NOT EXISTS sanitary_cert_expiry DATE,

-- Traceability Information
ADD COLUMN IF NOT EXISTS farm_vessel_id TEXT,
ADD COLUMN IF NOT EXISTS processing_facility_id TEXT,
ADD COLUMN IF NOT EXISTS harvest_method TEXT,
ADD COLUMN IF NOT EXISTS feed_type TEXT,
ADD COLUMN IF NOT EXISTS antibiotic_policy TEXT,
ADD COLUMN IF NOT EXISTS chemical_usage_records TEXT,

-- Sustainability
ADD COLUMN IF NOT EXISTS msc_certified BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS msc_cert_number TEXT,
ADD COLUMN IF NOT EXISTS asc_certified BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS asc_cert_number TEXT,
ADD COLUMN IF NOT EXISTS environmental_compliance TEXT,

-- Export Packaging & Labeling
ADD COLUMN IF NOT EXISTS exporter_name TEXT,
ADD COLUMN IF NOT EXISTS exporter_address TEXT,
ADD COLUMN IF NOT EXISTS exporter_license TEXT,
ADD COLUMN IF NOT EXISTS processor_name TEXT,
ADD COLUMN IF NOT EXISTS processor_license TEXT,
ADD COLUMN IF NOT EXISTS destination_markets TEXT[], -- Array of target markets

-- Cold-chain & Logistics
ADD COLUMN IF NOT EXISTS cold_storage_certified BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS cold_storage_cert_number TEXT,
ADD COLUMN IF NOT EXISTS reefer_container_details TEXT,
ADD COLUMN IF NOT EXISTS transport_insurance_details TEXT,

-- Legal & Export Documents
ADD COLUMN IF NOT EXISTS certificate_of_origin TEXT,
ADD COLUMN IF NOT EXISTS export_permit_number TEXT,
ADD COLUMN IF NOT EXISTS export_permit_expiry DATE,

-- Digital Export Readiness
ADD COLUMN IF NOT EXISTS export_ready BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS compliance_status JSONB DEFAULT '{}', -- Compliance status per market
ADD COLUMN IF NOT EXISTS certification_documents JSONB DEFAULT '[]', -- Array of document URLs
ADD COLUMN IF NOT EXISTS export_readiness_score INTEGER DEFAULT 0; -- 0-100 score

-- =============================================
-- Create indexes for frequently queried fields
-- =============================================

CREATE INDEX IF NOT EXISTS idx_products_scientific_name ON products(scientific_name);
CREATE INDEX IF NOT EXISTS idx_products_product_type ON products(product_type);
CREATE INDEX IF NOT EXISTS idx_products_source ON products(source);
CREATE INDEX IF NOT EXISTS idx_products_quality_grade ON products(quality_grade);
CREATE INDEX IF NOT EXISTS idx_products_harvest_date ON products(harvest_date);
CREATE INDEX IF NOT EXISTS idx_products_expiry_date ON products(expiry_date);

CREATE INDEX IF NOT EXISTS idx_seller_profiles_export_ready ON seller_profiles(export_ready);
CREATE INDEX IF NOT EXISTS idx_seller_profiles_haccp_certified ON seller_profiles(haccp_certified);
CREATE INDEX IF NOT EXISTS idx_seller_profiles_msc_certified ON seller_profiles(msc_certified);
CREATE INDEX IF NOT EXISTS idx_seller_profiles_asc_certified ON seller_profiles(asc_certified);

-- =============================================
-- Comments for documentation
-- =============================================

COMMENT ON COLUMN products.scientific_name IS 'Scientific/Latin name of the fish species (e.g., Oreochromis niloticus)';
COMMENT ON COLUMN products.product_type IS 'Form of product: Whole, Fillet, Steaks, Portions, Gutted and Cleaned';
COMMENT ON COLUMN products.source IS 'Source of product: Farmed, Wild-caught, Aquaculture';
COMMENT ON COLUMN products.weight_per_unit IS 'Average weight per unit in kg';
COMMENT ON COLUMN products.size_grade IS 'Size classification: Small, Medium, Large, Extra Large, Jumbo';
COMMENT ON COLUMN products.quality_grade IS 'Quality grade: A (Premium), B (Standard), C (Economy)';

COMMENT ON COLUMN seller_profiles.haccp_certified IS 'Hazard Analysis and Critical Control Points certification';
COMMENT ON COLUMN seller_profiles.gap_certified IS 'Good Aquaculture Practices certification';
COMMENT ON COLUMN seller_profiles.gmp_certified IS 'Good Manufacturing Practices certification';
COMMENT ON COLUMN seller_profiles.msc_certified IS 'Marine Stewardship Council certification for sustainability';
COMMENT ON COLUMN seller_profiles.asc_certified IS 'Aquaculture Stewardship Council certification';
COMMENT ON COLUMN seller_profiles.export_readiness_score IS 'Calculated score (0-100) based on completeness of export documentation and certifications';
COMMENT ON COLUMN seller_profiles.compliance_status IS 'JSON object tracking compliance status for each target market';
COMMENT ON COLUMN seller_profiles.certification_documents IS 'JSON array of uploaded certification and document URLs';
