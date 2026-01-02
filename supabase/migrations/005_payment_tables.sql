-- =============================================
-- Payment Tables
-- =============================================

CREATE TYPE earning_status AS ENUM ('pending', 'available', 'paid');
CREATE TYPE payout_status AS ENUM ('pending', 'processing', 'completed', 'failed');
CREATE TYPE payout_method AS ENUM ('mpesa', 'bank_transfer');

-- =============================================
-- Payments Table
-- =============================================
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE RESTRICT,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    payment_method TEXT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    currency TEXT DEFAULT 'TZS',
    status payment_status DEFAULT 'pending',
    transaction_id TEXT UNIQUE,
    mpesa_receipt TEXT,
    provider_response JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- Seller Earnings Table
-- =============================================
CREATE TABLE seller_earnings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    seller_id UUID NOT NULL REFERENCES seller_profiles(id) ON DELETE CASCADE,
    order_item_id UUID NOT NULL REFERENCES order_items(id) ON DELETE RESTRICT,
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE RESTRICT,
    gross_amount DECIMAL(10, 2) NOT NULL,
    commission_amount DECIMAL(10, 2) NOT NULL,
    net_amount DECIMAL(10, 2) NOT NULL,
    status earning_status DEFAULT 'pending',
    payout_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- Payouts Table
-- =============================================
CREATE TABLE payouts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    seller_id UUID NOT NULL REFERENCES seller_profiles(id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL,
    method payout_method NOT NULL,
    account_details JSONB NOT NULL,
    status payout_status DEFAULT 'pending',
    transaction_id TEXT,
    processed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- Indexes
-- =============================================
CREATE INDEX idx_payments_order_id ON payments(order_id);
CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_transaction_id ON payments(transaction_id);
CREATE INDEX idx_payments_created_at ON payments(created_at DESC);
CREATE INDEX idx_seller_earnings_seller_id ON seller_earnings(seller_id);
CREATE INDEX idx_seller_earnings_order_id ON seller_earnings(order_id);
CREATE INDEX idx_seller_earnings_status ON seller_earnings(status);
CREATE INDEX idx_seller_earnings_payout_id ON seller_earnings(payout_id);
CREATE INDEX idx_payouts_seller_id ON payouts(seller_id);
CREATE INDEX idx_payouts_status ON payouts(status);
CREATE INDEX idx_payouts_created_at ON payouts(created_at DESC);

-- =============================================
-- Triggers
-- =============================================
CREATE TRIGGER update_payments_updated_at
    BEFORE UPDATE ON payments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add foreign key for payout_id in seller_earnings
ALTER TABLE seller_earnings
ADD CONSTRAINT fk_payout
FOREIGN KEY (payout_id) REFERENCES payouts(id) ON DELETE SET NULL;
