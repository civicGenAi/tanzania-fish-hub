-- =============================================
-- Review & Rating Tables
-- =============================================

CREATE TYPE review_status AS ENUM ('pending', 'published', 'flagged', 'rejected');
CREATE TYPE vote_type AS ENUM ('helpful', 'not_helpful');

-- =============================================
-- Reviews Table
-- =============================================
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    order_item_id UUID NOT NULL REFERENCES order_items(id) ON DELETE CASCADE,
    customer_id UUID NOT NULL REFERENCES customer_profiles(id) ON DELETE CASCADE,
    seller_id UUID NOT NULL REFERENCES seller_profiles(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title TEXT,
    comment TEXT,
    images TEXT[] DEFAULT '{}',
    status review_status DEFAULT 'pending',
    verified_purchase BOOLEAN DEFAULT TRUE,
    helpful_count INTEGER DEFAULT 0,
    not_helpful_count INTEGER DEFAULT 0,
    seller_response TEXT,
    responded_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- Review Votes Table
-- =============================================
CREATE TABLE review_votes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    review_id UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    vote_type vote_type NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(review_id, user_id)
);

-- =============================================
-- Indexes
-- =============================================
CREATE INDEX idx_reviews_product_id ON reviews(product_id);
CREATE INDEX idx_reviews_customer_id ON reviews(customer_id);
CREATE INDEX idx_reviews_seller_id ON reviews(seller_id);
CREATE INDEX idx_reviews_status ON reviews(status);
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_reviews_created_at ON reviews(created_at DESC);
CREATE INDEX idx_review_votes_review_id ON review_votes(review_id);
CREATE INDEX idx_review_votes_user_id ON review_votes(user_id);

-- =============================================
-- Triggers
-- =============================================
CREATE TRIGGER update_reviews_updated_at
    BEFORE UPDATE ON reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to update product rating when review is added/updated
CREATE OR REPLACE FUNCTION update_product_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE products
    SET
        rating = (
            SELECT COALESCE(AVG(rating), 0)
            FROM reviews
            WHERE product_id = NEW.product_id
            AND status = 'published'
        ),
        total_reviews = (
            SELECT COUNT(*)
            FROM reviews
            WHERE product_id = NEW.product_id
            AND status = 'published'
        )
    WHERE id = NEW.product_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update product rating
CREATE TRIGGER update_product_rating_on_review
    AFTER INSERT OR UPDATE ON reviews
    FOR EACH ROW
    WHEN (NEW.status = 'published')
    EXECUTE FUNCTION update_product_rating();

-- Function to update review vote counts
CREATE OR REPLACE FUNCTION update_review_vote_counts()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE reviews
    SET
        helpful_count = (
            SELECT COUNT(*)
            FROM review_votes
            WHERE review_id = NEW.review_id
            AND vote_type = 'helpful'
        ),
        not_helpful_count = (
            SELECT COUNT(*)
            FROM review_votes
            WHERE review_id = NEW.review_id
            AND vote_type = 'not_helpful'
        )
    WHERE id = NEW.review_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update vote counts
CREATE TRIGGER update_review_vote_counts_on_vote
    AFTER INSERT OR UPDATE OR DELETE ON review_votes
    FOR EACH ROW
    EXECUTE FUNCTION update_review_vote_counts();
