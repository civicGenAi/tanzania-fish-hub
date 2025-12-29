import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Search, Calendar, Clock, User, ArrowRight, TrendingUp, Fish, Utensils, Leaf, Sparkles, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Posts', icon: Sparkles, count: 24 },
    { id: 'recipes', label: 'Recipes', icon: Utensils, count: 8 },
    { id: 'fishing', label: 'Fishing Tips', icon: Fish, count: 6 },
    { id: 'sustainability', label: 'Sustainability', icon: Leaf, count: 5 },
    { id: 'health', label: 'Health & Nutrition', icon: TrendingUp, count: 5 },
  ];

  const featuredPost = {
    id: 1,
    title: 'The Ultimate Guide to Cooking Fresh Tilapia: 10 Tanzanian Recipes',
    excerpt: 'Discover traditional and modern ways to prepare tilapia, from grilled samaki to fish curry. Learn from local chefs and grandmothers across Tanzania.',
    author: 'Fatuma Ali',
    date: '2025-12-20',
    readTime: '8 min read',
    category: 'Recipes',
    image: '🐟',
    tags: ['Tilapia', 'Cooking', 'Tanzanian Cuisine'],
  };

  const blogPosts = [
    {
      id: 2,
      title: 'Sustainable Fishing Practices in Lake Victoria',
      excerpt: 'How local fishermen are protecting fish populations while maintaining their livelihoods.',
      author: 'Juma Mwinyipembe',
      date: '2025-12-18',
      readTime: '5 min read',
      category: 'Sustainability',
      image: '🌊',
      tags: ['Lake Victoria', 'Sustainability', 'Conservation'],
    },
    {
      id: 3,
      title: '5 Health Benefits of Eating Fresh Fish Weekly',
      excerpt: 'Nutritionists explain why fresh fish should be a staple in every Tanzanian household.',
      author: 'Dr. Amina Hassan',
      date: '2025-12-15',
      readTime: '6 min read',
      category: 'Health & Nutrition',
      image: '🥗',
      tags: ['Health', 'Nutrition', 'Omega-3'],
    },
    {
      id: 4,
      title: 'Best Times to Fish in Tanzania: A Seasonal Guide',
      excerpt: 'Learn when different fish species are most abundant throughout the year.',
      author: 'Ibrahim Mwangi',
      date: '2025-12-12',
      readTime: '7 min read',
      category: 'Fishing Tips',
      image: '🎣',
      tags: ['Fishing', 'Seasons', 'Tips'],
    },
    {
      id: 5,
      title: 'From Ocean to Table: The Journey of Your Fish',
      excerpt: 'Follow a day in the life of a Fish Happy delivery, from catch to your kitchen.',
      author: 'Sarah Kimaro',
      date: '2025-12-10',
      readTime: '4 min read',
      category: 'Behind the Scenes',
      image: '🚚',
      tags: ['Delivery', 'Process', 'Fresh'],
    },
    {
      id: 6,
      title: 'Traditional Fish Preservation Methods in Tanzania',
      excerpt: 'Exploring ancient techniques still used by coastal communities today.',
      author: 'Mama Grace',
      date: '2025-12-08',
      readTime: '6 min read',
      category: 'Culture',
      image: '🏺',
      tags: ['Culture', 'Preservation', 'Traditional'],
    },
    {
      id: 7,
      title: 'Nile Perch: The King of East African Waters',
      excerpt: 'Everything you need to know about this prized fish species.',
      author: 'Juma Mwinyipembe',
      date: '2025-12-05',
      readTime: '5 min read',
      category: 'Fishing Tips',
      image: '🐠',
      tags: ['Nile Perch', 'Species', 'Lake Victoria'],
    },
    {
      id: 8,
      title: 'Quick Seafood Recipes for Busy Weeknights',
      excerpt: 'Delicious fish dishes you can prepare in 30 minutes or less.',
      author: 'Chef Michael',
      date: '2025-12-03',
      readTime: '4 min read',
      category: 'Recipes',
      image: '⏰',
      tags: ['Quick Recipes', 'Easy', 'Weeknight Dinner'],
    },
    {
      id: 9,
      title: 'Supporting Local Fishermen: Why It Matters',
      excerpt: 'The economic and social impact of buying directly from fishing communities.',
      author: 'Fatuma Ali',
      date: '2025-12-01',
      readTime: '7 min read',
      category: 'Community',
      image: '🤝',
      tags: ['Community', 'Impact', 'Support Local'],
    },
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      {/* Add Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&display=swap');
        .elegant-font {
          font-family: 'Dancing Script', cursive;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-secondary" />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        {/* Wave Pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-20 opacity-20">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z" fill="white"/>
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10 py-16">
          <div className="max-w-3xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-6 animate-fade-in">
              <BookOpen className="h-4 w-4" />
              <span className="text-sm font-medium">Our Blog</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-slide-up">
              Stories from the Sea
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
              Recipes, tips, and insights from Tanzania's fishing communities
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto animate-slide-up" style={{ animationDelay: '200ms' }}>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-base bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-2xl focus:ring-2 focus:ring-white/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 md:py-8 border-b bg-card/50 backdrop-blur-sm sticky top-0 z-30">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`group flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 rounded-full whitespace-nowrap transition-all duration-300 flex-shrink-0 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg scale-105'
                    : 'bg-card hover:bg-muted border border-border hover:border-primary/30'
                }`}
              >
                <category.icon className={`h-4 w-4 transition-transform duration-300 ${selectedCategory === category.id ? '' : 'group-hover:scale-110'}`} />
                <span className="font-medium text-sm md:text-base">{category.label}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full transition-colors ${
                  selectedCategory === category.id ? 'bg-white/20' : 'bg-muted text-muted-foreground'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Featured Post */}
        <div className="mb-16 md:mb-20">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">Featured Article</h2>
          </div>

          <Link to={`/blog/${featuredPost.id}`}>
            <div className="group relative bg-card rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-border/50">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image Side */}
                <div className="relative bg-gradient-to-br from-primary via-primary/90 to-secondary p-12 md:p-16 flex items-center justify-center min-h-[300px] overflow-hidden">
                  {/* Decorative circles */}
                  <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                  <div className="absolute bottom-0 right-0 w-48 h-48 bg-secondary/30 rounded-full blur-2xl" />
                  
                  <div className="text-8xl md:text-9xl group-hover:scale-110 transition-transform duration-500 relative z-10">
                    {featuredPost.image}
                  </div>
                </div>
                
                {/* Content Side */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary rounded-full text-sm font-medium">
                      {featuredPost.category}
                    </span>
                    {featuredPost.tags.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors duration-300 leading-tight">
                    {featuredPost.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <span className="font-medium text-foreground">{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full sm:w-auto group/btn shadow-lg hover:shadow-xl transition-all duration-300">
                    Read Full Article
                    <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">Latest Articles</h2>
          </div>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No articles found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredPosts.map((post, index) => (
              <Link key={post.id} to={`/blog/${post.id}`}>
                <article 
                  className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 h-full flex flex-col border border-border/50 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Image */}
                  <div className="relative bg-gradient-to-br from-primary/10 via-muted/50 to-secondary/10 p-12 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="text-6xl md:text-7xl group-hover:scale-110 transition-transform duration-500 relative z-10">
                      {post.image}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                    </div>
                    
                    <h3 className="text-lg md:text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground pt-4 border-t border-border/50">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {filteredPosts.length > 0 && (
          <div className="text-center mt-14">
            <Button variant="outline" size="lg" className="group px-8 rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300">
              Load More Articles
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}
      </div>

      {/* Newsletter CTA */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-secondary" />
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float -translate-y-1/2" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center text-white">
            <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center animate-float">
              <span className="text-4xl">📬</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Stay Updated</h2>
            <p className="text-lg md:text-xl mb-10 text-white/80">
              Get the latest recipes, fishing tips, and community stories delivered to your inbox
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-14 bg-white/95 backdrop-blur-sm border-0 rounded-xl focus:ring-2 focus:ring-white/20"
              />
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:scale-105 rounded-xl whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
