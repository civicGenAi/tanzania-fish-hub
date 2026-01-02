import React, { useState } from 'react';
import {
  Search,
  Filter,
  Star,
  ThumbsUp,
  ThumbsDown,
  Eye,
  MessageSquare,
  Flag,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Reviews = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const reviews = [
    {
      id: 'REV-001',
      customer: 'John Mwamba',
      product: 'Fresh Tilapia (1kg)',
      productId: 'PRD-001',
      rating: 5,
      comment: 'Excellent quality! The fish was very fresh and the delivery was prompt. Will definitely order again.',
      date: '2024-01-15',
      status: 'published',
      helpful: 24,
      notHelpful: 2,
      verified: true,
      response: 'Thank you for your kind words! We appreciate your business.'
    },
    {
      id: 'REV-002',
      customer: 'Sarah Kimaro',
      product: 'Dried Dagaa (500g)',
      productId: 'PRD-003',
      rating: 4,
      comment: 'Good product overall. Quality was nice but packaging could be improved.',
      date: '2024-01-14',
      status: 'published',
      helpful: 18,
      notHelpful: 1,
      verified: true,
      response: 'Thank you for the feedback. We will work on improving our packaging.'
    },
    {
      id: 'REV-003',
      customer: 'David Mtui',
      product: 'Nile Perch Fillet',
      productId: 'PRD-002',
      rating: 2,
      comment: 'The fish arrived later than expected and was not as fresh as I hoped.',
      date: '2024-01-13',
      status: 'pending',
      helpful: 8,
      notHelpful: 15,
      verified: true,
      response: null
    },
    {
      id: 'REV-004',
      customer: 'Grace Mollel',
      product: 'Smoked Catfish',
      productId: 'PRD-004',
      rating: 5,
      comment: 'Perfect! Best smoked fish I have purchased online. Highly recommend.',
      date: '2024-01-12',
      status: 'published',
      helpful: 32,
      notHelpful: 0,
      verified: true,
      response: 'We are delighted to hear that! Thank you for choosing us.'
    },
    {
      id: 'REV-005',
      customer: 'James Kondo',
      product: 'Fresh Prawns (500g)',
      productId: 'PRD-005',
      rating: 1,
      comment: 'Very disappointed. The prawns were not fresh at all.',
      date: '2024-01-11',
      status: 'flagged',
      helpful: 12,
      notHelpful: 8,
      verified: false,
      response: null
    }
  ];

  const stats = [
    {
      label: 'Total Reviews',
      value: '2,456',
      change: '+234',
      icon: MessageSquare,
      color: 'bg-blue-500'
    },
    {
      label: 'Average Rating',
      value: '4.2',
      change: '+0.3',
      icon: Star,
      color: 'bg-yellow-500'
    },
    {
      label: 'Pending Review',
      value: '45',
      change: '+12',
      icon: Clock,
      color: 'bg-orange-500'
    },
    {
      label: 'Flagged',
      value: '8',
      change: '-3',
      icon: Flag,
      color: 'bg-red-500'
    }
  ];

  const ratingDistribution = [
    { rating: '5 Star', count: 1245, percentage: 50.7 },
    { rating: '4 Star', count: 678, percentage: 27.6 },
    { rating: '3 Star', count: 312, percentage: 12.7 },
    { rating: '2 Star', count: 145, percentage: 5.9 },
    { rating: '1 Star', count: 76, percentage: 3.1 }
  ];

  const COLORS = ['#10b981', '#84cc16', '#f59e0b', '#f97316', '#ef4444'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'flagged': return 'bg-red-100 text-red-800';
      case 'rejected': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`h-4 w-4 ${
              index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.product.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = ratingFilter === 'all' || review.rating === parseInt(ratingFilter);
    const matchesStatus = statusFilter === 'all' || review.status === statusFilter;
    return matchesSearch && matchesRating && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reviews Management</h1>
          <p className="text-gray-600 mt-1">Monitor and manage customer reviews</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.change} this week</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Rating Distribution</h3>
        <div className="space-y-4">
          {ratingDistribution.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">{item.rating}</span>
                <span className="text-sm font-semibold text-gray-900">{item.count} ({item.percentage}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="h-2.5 rounded-full"
                  style={{
                    width: `${item.percentage}%`,
                    backgroundColor: COLORS[index]
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by customer or product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="pending">Pending</option>
            <option value="flagged">Flagged</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                    {review.customer.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-gray-900">{review.customer}</p>
                      {review.verified && (
                        <CheckCircle className="h-4 w-4 text-blue-500" title="Verified Purchase" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{review.date}</p>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="font-medium text-gray-900 mb-1">{review.product}</p>
                  {renderStars(review.rating)}
                </div>

                <p className="text-gray-700 mb-4">{review.comment}</p>

                {review.response && (
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
                    <p className="text-sm font-medium text-gray-900 mb-1">Seller Response:</p>
                    <p className="text-sm text-gray-700">{review.response}</p>
                  </div>
                )}

                <div className="flex items-center space-x-4 text-sm">
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-green-600">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{review.helpful}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-red-600">
                    <ThumbsDown className="h-4 w-4" />
                    <span>{review.notHelpful}</span>
                  </button>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(review.status)}`}>
                    {review.status}
                  </span>
                </div>
              </div>

              <div className="flex flex-col space-y-2 ml-4">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                  <CheckCircle className="h-4 w-4" />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                  <XCircle className="h-4 w-4" />
                </button>
                <button className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg">
                  <Flag className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
