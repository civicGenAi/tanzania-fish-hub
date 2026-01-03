import { supabase } from '@/lib/supabase';
import {
  Review,
  ReviewWithDetails,
  CreateReviewData,
  UpdateReviewData,
  ReviewFilters,
  ReviewStats,
  VoteType,
} from '@/types/review.types';

class ReviewsService {
  // Create a new review
  async createReview(reviewData: CreateReviewData): Promise<Review> {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert({
          product_id: reviewData.product_id,
          order_item_id: reviewData.order_item_id,
          customer_id: reviewData.customer_id,
          seller_id: reviewData.seller_id,
          rating: reviewData.rating,
          title: reviewData.title,
          comment: reviewData.comment,
          images: reviewData.images || [],
          status: 'published',
          verified_purchase: true,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating review:', error);
      throw error;
    }
  }

  // Get review by ID
  async getReviewById(reviewId: string): Promise<ReviewWithDetails | null> {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          customer:customer_profiles(id, user_id, full_name),
          product:products(id, name, images)
        `)
        .eq('id', reviewId)
        .single();

      if (error) throw error;
      return data as ReviewWithDetails;
    } catch (error) {
      console.error('Error fetching review:', error);
      return null;
    }
  }

  // Get reviews with filters
  async getReviews(filters?: ReviewFilters): Promise<ReviewWithDetails[]> {
    try {
      let query = supabase
        .from('reviews')
        .select(`
          *,
          customer:customer_profiles(id, user_id, full_name)
        `)
        .order('created_at', { ascending: false });

      if (filters?.product_id) {
        query = query.eq('product_id', filters.product_id);
      }

      if (filters?.customer_id) {
        query = query.eq('customer_id', filters.customer_id);
      }

      if (filters?.seller_id) {
        query = query.eq('seller_id', filters.seller_id);
      }

      if (filters?.status) {
        query = query.eq('status', filters.status);
      }

      if (filters?.rating) {
        query = query.eq('rating', filters.rating);
      }

      if (filters?.verified_purchase !== undefined) {
        query = query.eq('verified_purchase', filters.verified_purchase);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as ReviewWithDetails[] || [];
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  }

  // Get product reviews (published only)
  async getProductReviews(productId: string): Promise<ReviewWithDetails[]> {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          customer:customer_profiles(id, user_id, full_name)
        `)
        .eq('product_id', productId)
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as ReviewWithDetails[] || [];
    } catch (error) {
      console.error('Error fetching product reviews:', error);
      throw error;
    }
  }

  // Update review
  async updateReview(reviewId: string, updates: UpdateReviewData): Promise<Review> {
    try {
      const updateData: any = { ...updates };

      if (updates.seller_response) {
        updateData.responded_at = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from('reviews')
        .update(updateData)
        .eq('id', reviewId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating review:', error);
      throw error;
    }
  }

  // Add seller response
  async addSellerResponse(reviewId: string, response: string): Promise<Review> {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .update({
          seller_response: response,
          responded_at: new Date().toISOString(),
        })
        .eq('id', reviewId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error adding seller response:', error);
      throw error;
    }
  }

  // Vote on review
  async voteReview(reviewId: string, userId: string, voteType: VoteType): Promise<void> {
    try {
      const { error } = await supabase
        .from('review_votes')
        .upsert({
          review_id: reviewId,
          user_id: userId,
          vote_type: voteType,
        }, {
          onConflict: 'review_id,user_id'
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error voting on review:', error);
      throw error;
    }
  }

  // Remove vote from review
  async removeVote(reviewId: string, userId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('review_votes')
        .delete()
        .eq('review_id', reviewId)
        .eq('user_id', userId);

      if (error) throw error;
    } catch (error) {
      console.error('Error removing vote:', error);
      throw error;
    }
  }

  // Get review statistics for a product
  async getProductReviewStats(productId: string): Promise<ReviewStats> {
    try {
      const { data: reviews, error } = await supabase
        .from('reviews')
        .select('rating')
        .eq('product_id', productId)
        .eq('status', 'published');

      if (error) throw error;

      const stats: ReviewStats = {
        average_rating: 0,
        total_reviews: reviews?.length || 0,
        rating_distribution: {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
        },
      };

      if (reviews && reviews.length > 0) {
        let totalRating = 0;
        reviews.forEach((review: any) => {
          totalRating += review.rating;
          stats.rating_distribution[review.rating as keyof typeof stats.rating_distribution]++;
        });
        stats.average_rating = totalRating / reviews.length;
      }

      return stats;
    } catch (error) {
      console.error('Error fetching review stats:', error);
      throw error;
    }
  }

  // Check if user can review product
  async canUserReviewProduct(customerId: string, productId: string): Promise<{
    canReview: boolean;
    orderItemId?: string;
    existingReviewId?: string;
  }> {
    try {
      // Check if user has already reviewed this product
      const { data: existingReview } = await supabase
        .from('reviews')
        .select('id')
        .eq('customer_id', customerId)
        .eq('product_id', productId)
        .single();

      if (existingReview) {
        return {
          canReview: false,
          existingReviewId: existingReview.id,
        };
      }

      // Check if user has purchased this product
      const { data: orderItem } = await supabase
        .from('order_items')
        .select('id, order:orders(customer_id, status)')
        .eq('product_id', productId)
        .eq('order.customer_id', customerId)
        .eq('order.status', 'delivered')
        .single();

      if (!orderItem) {
        return { canReview: false };
      }

      return {
        canReview: true,
        orderItemId: orderItem.id,
      };
    } catch (error) {
      console.error('Error checking review eligibility:', error);
      return { canReview: false };
    }
  }

  // Delete review
  async deleteReview(reviewId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', reviewId);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting review:', error);
      throw error;
    }
  }

  // Get seller reviews (for seller dashboard)
  async getSellerReviews(sellerId: string, status?: string): Promise<ReviewWithDetails[]> {
    try {
      let query = supabase
        .from('reviews')
        .select(`
          *,
          customer:customer_profiles(id, user_id, full_name),
          product:products(id, name, images)
        `)
        .eq('seller_id', sellerId)
        .order('created_at', { ascending: false });

      if (status) {
        query = query.eq('status', status);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as ReviewWithDetails[] || [];
    } catch (error) {
      console.error('Error fetching seller reviews:', error);
      throw error;
    }
  }
}

export const reviewsService = new ReviewsService();
