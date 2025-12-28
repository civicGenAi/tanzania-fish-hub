import React from 'react';
import { Star, MessageSquare, ThumbsUp, Filter } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import SellerSidebar from '@/components/dashboard/SellerSidebar';
import { Button } from '@/components/ui/button';

const SellerReviews: React.FC = () => {
  const reviews = [
    { id: '1', customer: 'John M.', product: 'Fresh Tilapia', rating: 5, comment: 'Excellent quality fish! Very fresh and well packaged.', date: '2 hours ago', replied: true },
    { id: '2', customer: 'Grace K.', product: 'Nile Perch', rating: 4, comment: 'Good quality but delivery was slightly delayed.', date: '1 day ago', replied: false },
    { id: '3', customer: 'Peter N.', product: 'Dagaa (Sardines)', rating: 5, comment: 'Best dagaa in the market! Will order again.', date: '3 days ago', replied: true },
    { id: '4', customer: 'Mary L.', product: 'Octopus', rating: 5, comment: 'Perfect size and very tender. Great for my restaurant.', date: '1 week ago', replied: true },
  ];

  const ratingStats = { 5: 45, 4: 12, 3: 3, 2: 1, 1: 0 };
  const totalReviews = Object.values(ratingStats).reduce((a, b) => a + b, 0);
  const avgRating = 4.8;

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
                <span className="text-5xl font-bold">{avgRating}</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className={`h-6 w-6 ${star <= Math.round(avgRating) ? 'text-yellow-500 fill-yellow-500' : 'text-muted'}`} />
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground">{totalReviews} total reviews</p>
            </div>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-2">
                  <span className="w-4 text-sm">{rating}</span>
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-yellow-500 rounded-full"
                      style={{ width: `${(ratingStats[rating as keyof typeof ratingStats] / totalReviews) * 100}%` }}
                    />
                  </div>
                  <span className="w-8 text-sm text-muted-foreground">{ratingStats[rating as keyof typeof ratingStats]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4" />
            All Reviews
          </Button>
          <Button variant="ghost" size="sm">Needs Reply</Button>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-card border border-border rounded-2xl p-4 md:p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-semibold">
                    {review.customer.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{review.customer}</p>
                    <p className="text-sm text-muted-foreground">{review.product}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className={`h-4 w-4 ${star <= review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted'}`} />
                  ))}
                </div>
              </div>
              <p className="text-sm mb-3">{review.comment}</p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{review.date}</p>
                <div className="flex gap-2">
                  {review.replied ? (
                    <span className="text-xs text-secondary flex items-center gap-1">
                      <ThumbsUp className="h-3 w-3" />
                      Replied
                    </span>
                  ) : (
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4" />
                      Reply
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SellerReviews;
