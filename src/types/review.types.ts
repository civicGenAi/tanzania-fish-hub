// Review types based on database schema

export type ReviewStatus = 'pending' | 'published' | 'flagged' | 'rejected';
export type VoteType = 'helpful' | 'not_helpful';

export interface Review {
  id: string;
  product_id: string;
  order_item_id: string;
  customer_id: string;
  seller_id: string;
  rating: number;
  title: string | null;
  comment: string | null;
  images: string[];
  status: ReviewStatus;
  verified_purchase: boolean;
  helpful_count: number;
  not_helpful_count: number;
  seller_response: string | null;
  responded_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ReviewWithDetails extends Review {
  customer?: {
    id: string;
    user_id: string;
    full_name: string;
  };
  product?: {
    id: string;
    name: string;
    images: string[];
  };
}

export interface ReviewVote {
  id: string;
  review_id: string;
  user_id: string;
  vote_type: VoteType;
  created_at: string;
}

export interface CreateReviewData {
  product_id: string;
  order_item_id: string;
  customer_id: string;
  seller_id: string;
  rating: number;
  title?: string;
  comment?: string;
  images?: string[];
}

export interface UpdateReviewData {
  rating?: number;
  title?: string;
  comment?: string;
  images?: string[];
  status?: ReviewStatus;
  seller_response?: string;
}

export interface ReviewFilters {
  product_id?: string;
  customer_id?: string;
  seller_id?: string;
  status?: ReviewStatus;
  rating?: number;
  verified_purchase?: boolean;
}

export interface ReviewStats {
  average_rating: number;
  total_reviews: number;
  rating_distribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}
