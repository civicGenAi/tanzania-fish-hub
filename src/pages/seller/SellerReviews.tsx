import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, ThumbsUp, Filter, Loader2 } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import SellerSidebar from '@/components/dashboard/SellerSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { reviewsService } from '@/services/reviews.service';
import { ReviewWithDetails } from '@/types/review.types';
import { cn } from '@/lib/utils';

const SellerReviews: React.FC = () => {
  const { profile } = useAuth();
  const { toast } = useToast();

  const [reviews, setReviews] = useState<ReviewWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [sellerId, setSellerId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [respondingTo, setRespondingTo] = useState<string | null>(null);
  const [responseText, setResponseText] = useState('');
  const [submittingResponse, setSubmittingResponse] = useState(false);

  useEffect(() => {
    const fetchSellerIdAndReviews = async () => {
      if (!profile) return;

      try {
        setLoading(true);

        const { data: sellerProfile, error: sellerError } = await supabase
          .from('seller_profiles')
          .select('id')
          .eq('user_id', profile.id)
          .single();

        if (sellerError) throw sellerError;
        setSellerId(sellerProfile.id);

        const sellerReviews = await reviewsService.getSellerReviews(
          sellerProfile.id,
          filter === 'all' ? undefined : filter
        );
        setReviews(sellerReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        toast({
          title: 'Error',
          description: 'Failed to load reviews',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSellerIdAndReviews();
  }, [profile, toast, filter]);

  const handleSubmitResponse = async (reviewId: string) => {
    if (!responseText.trim()) return;

    try {
      setSubmittingResponse(true);

      await reviewsService.addSellerResponse(reviewId, responseText);

      setReviews(reviews.map(review =>
        review.id === reviewId
          ? { ...review, seller_response: responseText, responded_at: new Date().toISOString() }
          : review
      ));

      toast({
        title: 'Success',
        description: 'Response submitted successfully',
      });

      setRespondingTo(null);
      setResponseText('');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit response',
        variant: 'destructive',
      });
    } finally {
      setSubmittingResponse(false);
    }
  };

  const avgRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  const ratingStats = {
    1: reviews.filter(r => r.rating === 1).length,
    2: reviews.filter(r => r.rating === 2).length,
    3: reviews.filter(r => r.rating === 3).length,
    4: reviews.filter(r => r.rating === 4).length,
    5: reviews.filter(r => r.rating === 5).length,
  };

  return (
    <DashboardLayout
      sidebar={<SellerSidebar />}
      title="Reviews"
      subtitle="Customer feedback on your products"
    >
      <div className="space-y-6">
        {/* Rating Overview */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <span className="text-5xl font-bold">{avgRating.toFixed(1)}</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        "h-6 w-6",
                        star <= Math.round(avgRating)
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-muted-foreground"
                      )}
                    />
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground">{reviews.length} total reviews</p>
            </div>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-2">
                  <span className="w-4 text-sm">{rating}</span>
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-500 rounded-full"
                      style={{
                        width: reviews.length > 0
                          ? `${(ratingStats[rating as keyof typeof ratingStats] / reviews.length) * 100}%`
                          : '0%'
                      }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-8 text-right">
                    {ratingStats[rating as keyof typeof ratingStats]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="h-4 w-4 text-muted-foreground" />
          {['all', 'published', 'pending'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize",
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {/* Empty State */}
        {!loading && reviews.length === 0 && (
          <div className="bg-card border border-border rounded-2xl p-12 text-center">
            <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No reviews yet</h3>
            <p className="text-muted-foreground">
              {filter === 'all' ? 'You have no reviews yet' : `No ${filter} reviews`}
            </p>
          </div>
        )}

        {/* Reviews List */}
        {!loading && reviews.length > 0 && (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-semibold">{review.customer?.full_name || 'Anonymous'}</p>
                    <p className="text-sm text-muted-foreground">
                      {review.product?.name || 'Product'}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex gap-0.5 mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={cn(
                            "h-4 w-4",
                            star <= review.rating
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-muted-foreground"
                          )}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {review.title && (
                  <h4 className="font-semibold mb-2">{review.title}</h4>
                )}

                {review.comment && (
                  <p className="text-muted-foreground mb-4">{review.comment}</p>
                )}

                {review.verified_purchase && (
                  <span className="inline-flex items-center gap-1 text-xs text-secondary mb-4">
                    <ThumbsUp className="h-3 w-3" />
                    Verified Purchase
                  </span>
                )}

                {review.seller_response ? (
                  <div className="bg-muted rounded-xl p-4">
                    <p className="font-semibold text-sm mb-2">Your Response</p>
                    <p className="text-sm text-muted-foreground">{review.seller_response}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Responded on {new Date(review.responded_at!).toLocaleDateString()}
                    </p>
                  </div>
                ) : respondingTo === review.id ? (
                  <div className="border-t border-border pt-4">
                    <p className="font-semibold text-sm mb-2">Write Response</p>
                    <textarea
                      placeholder="Thank your customer and address their feedback..."
                      value={responseText}
                      onChange={(e) => setResponseText(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none mb-2"
                    />
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setRespondingTo(null);
                          setResponseText('');
                        }}
                        disabled={submittingResponse}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="ocean"
                        size="sm"
                        onClick={() => handleSubmitResponse(review.id)}
                        disabled={submittingResponse || !responseText.trim()}
                      >
                        {submittingResponse ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          'Submit Response'
                        )}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setRespondingTo(review.id)}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Respond
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SellerReviews;
