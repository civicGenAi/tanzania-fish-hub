import React from 'react';
import Layout from '@/components/layout/Layout';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowLeft, Share2, Facebook, Twitter, Mail, Tag, Heart, MessageCircle, Bookmark, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BlogPost = () => {
  const { id } = useParams();

  // Mock blog post data - in real app, fetch based on id
  const post = {
    id: 1,
    title: 'The Ultimate Guide to Cooking Fresh Tilapia: 10 Tanzanian Recipes',
    author: {
      name: 'Fatuma Ali',
      role: 'Community Manager & Food Writer',
      avatar: '👩🏿‍🏫',
      bio: 'Passionate about preserving Tanzanian culinary traditions and sharing recipes from coastal communities.',
    },
    date: '2025-12-20',
    readTime: '8 min read',
    category: 'Recipes',
    tags: ['Tilapia', 'Cooking', 'Tanzanian Cuisine', 'Traditional Food'],
    image: '🐟',
    content: `
      <p class="lead">Tilapia is one of Tanzania's most beloved fish, found in abundance in Lake Victoria and served in homes and restaurants across the country. In this comprehensive guide, we'll explore traditional and modern ways to prepare this delicious freshwater fish.</p>

      <h2>Why Tilapia?</h2>
      <p>Tilapia is not just delicious—it's also incredibly nutritious and sustainable. Rich in protein, omega-3 fatty acids, and essential vitamins, it's a perfect choice for health-conscious families. Plus, when you buy from Fish Happy, you're supporting local fishermen and getting the freshest catch possible.</p>

      <h2>Before You Cook: Selecting Fresh Tilapia</h2>
      <p>Fresh tilapia should have:</p>
      <ul>
        <li>Clear, bright eyes (not cloudy)</li>
        <li>Firm, elastic flesh that springs back when pressed</li>
        <li>A mild, fresh ocean smell (not fishy or ammonia-like)</li>
        <li>Shiny, metallic scales</li>
        <li>Red or pink gills</li>
      </ul>

      <h2>Top 10 Tanzanian Tilapia Recipes</h2>

      <h3>1. Classic Grilled Samaki (Grilled Fish)</h3>
      <p>The most traditional way to enjoy tilapia. Marinate whole tilapia in a mixture of lime juice, garlic, ginger, and black pepper for 30 minutes. Grill over charcoal for 10-15 minutes per side until the skin is crispy and the meat is flaky.</p>

      <h3>2. Tilapia in Coconut Sauce (Samaki wa Nazi)</h3>
      <p>A coastal favorite! Simmer tilapia fillets in rich coconut milk with tomatoes, onions, curry powder, and fresh coriander. Serve with ugali or rice for a complete meal.</p>

      <h3>3. Fried Tilapia with Chips</h3>
      <p>Crispy on the outside, tender on the inside. Coat tilapia in seasoned flour and deep fry until golden brown. Serve with chips (fries), kachumbari (tomato salad), and hot sauce.</p>

      <h3>4. Tilapia Fish Curry</h3>
      <p>A fusion of Indian and Tanzanian flavors. Cook tilapia in a spicy curry sauce with turmeric, cumin, coriander, and fresh tomatoes. Perfect for those who love bold flavors.</p>

      <h3>5. Tilapia Soup (Supu ya Samaki)</h3>
      <p>Comfort food at its finest. Simmer tilapia with vegetables, ginger, and spices for a nourishing broth that's perfect for rainy days or when you're feeling under the weather.</p>

      <h3>6. Smoked Tilapia</h3>
      <p>Traditional preservation method that adds incredible flavor. Smoke tilapia over coconut husks or wood chips, then serve with ugali and greens.</p>

      <h3>7. Tilapia Biryani</h3>
      <p>East African meets South Asian cuisine. Layer spiced rice with fried tilapia, caramelized onions, and aromatic spices for a show-stopping dish.</p>

      <h3>8. Baked Tilapia with Herbs</h3>
      <p>Healthy and delicious. Bake tilapia with lemon, rosemary, thyme, and olive oil for a lighter option that doesn't compromise on flavor.</p>

      <h3>9. Tilapia Stew (Mchuzi wa Samaki)</h3>
      <p>Rich and hearty. Cook tilapia in a tomato-based stew with potatoes, carrots, and bell peppers. Great for feeding a crowd.</p>

      <h3>10. Tilapia Tacos (Modern Fusion)</h3>
      <p>A contemporary twist! Grill or fry tilapia, then serve in soft tortillas with mango salsa, avocado, and lime crema.</p>

      <h2>Pro Tips from Tanzanian Grandmothers</h2>
      <ul>
        <li>Always clean your fish thoroughly with lime or lemon juice to remove any fishy smell</li>
        <li>Don't overcook—tilapia cooks quickly and becomes dry if left too long</li>
        <li>Save the fish head and bones for making rich fish stock</li>
        <li>Fresh coriander (cilantro) is your best friend when cooking fish</li>
        <li>When frying, ensure oil is hot enough so the fish doesn't absorb too much oil</li>
      </ul>

      <h2>Where to Buy Fresh Tilapia</h2>
      <p>For the freshest tilapia delivered straight to your door, order from Fish Happy! Our tilapia comes directly from Lake Victoria fishermen and is delivered within hours of being caught. Browse our selection in the <a href="/marketplace" class="text-primary hover:underline font-medium">marketplace</a>.</p>

      <h2>Conclusion</h2>
      <p>Tilapia is versatile, delicious, and deeply rooted in Tanzanian culinary culture. Whether you prefer it grilled, fried, in coconut sauce, or in a curry, there's a preparation method for everyone. The key is starting with fresh, quality fish—and that's exactly what Fish Happy delivers.</p>

      <p class="text-muted-foreground italic mt-8">Happy cooking! Share your tilapia creations with us on social media using #FishHappyTanzania</p>
    `,
    likes: 342,
    comments: 28,
  };

  const relatedPosts = [
    {
      id: 2,
      title: 'Sustainable Fishing Practices in Lake Victoria',
      category: 'Sustainability',
      image: '🌊',
      readTime: '5 min read',
    },
    {
      id: 3,
      title: '5 Health Benefits of Eating Fresh Fish Weekly',
      category: 'Health & Nutrition',
      image: '🥗',
      readTime: '6 min read',
    },
    {
      id: 8,
      title: 'Quick Seafood Recipes for Busy Weeknights',
      category: 'Recipes',
      image: '⏰',
      readTime: '4 min read',
    },
  ];

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium truncate max-w-[200px]">{post.title}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link to="/blog" className="inline-flex mb-8">
              <Button variant="ghost" size="sm" className="group gap-2 hover:bg-primary/5">
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Blog
              </Button>
            </Link>

            {/* Category Badge */}
            <div className="mb-4 animate-fade-in">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary rounded-full text-sm font-medium">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight animate-slide-up">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                  <span className="text-xl">{post.author.avatar}</span>
                </div>
                <div>
                  <span className="font-medium text-foreground">{post.author.name}</span>
                  <p className="text-xs text-muted-foreground">{post.author.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Featured Image */}
            <div 
              className="relative bg-gradient-to-br from-primary via-primary/90 to-secondary rounded-3xl p-16 md:p-24 flex items-center justify-center mb-10 shadow-2xl overflow-hidden animate-scale-in"
              style={{ animationDelay: '200ms' }}
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-60 h-60 bg-secondary/30 rounded-full blur-3xl" />
              
              <div className="text-8xl md:text-9xl relative z-10 animate-float">{post.image}</div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b animate-fade-in" style={{ animationDelay: '300ms' }}>
              {/* Engagement Stats */}
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors group">
                  <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Heart className="h-4 w-4" />
                  </div>
                  <span className="font-medium">{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <MessageCircle className="h-4 w-4" />
                  </div>
                  <span className="font-medium">{post.comments}</span>
                </button>
                <button className="flex items-center gap-2 text-muted-foreground hover:text-secondary transition-colors group">
                  <div className="w-9 h-9 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                    <Bookmark className="h-4 w-4" />
                  </div>
                </button>
              </div>

              {/* Share Buttons */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground mr-1">Share:</span>
                <Button variant="outline" size="icon" className="w-9 h-9 rounded-full hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="w-9 h-9 rounded-full hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="w-9 h-9 rounded-full hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all">
                  <Mail className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="w-9 h-9 rounded-full hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="pb-12 md:pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div
              className="prose prose-lg max-w-none
                prose-headings:font-bold prose-headings:text-foreground
                prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-border/50
                prose-h3:text-xl prose-h3:md:text-2xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
                prose-ul:my-6 prose-li:text-muted-foreground prose-li:marker:text-primary
                prose-strong:text-foreground prose-strong:font-semibold
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                prose-lead:text-xl prose-lead:md:text-2xl prose-lead:text-foreground prose-lead:mb-8 prose-lead:font-normal prose-lead:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <div className="mt-12 pt-8 border-t">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Tag className="h-4 w-4" />
                  <span className="text-sm font-medium">Tags:</span>
                </div>
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-1.5 bg-muted hover:bg-primary/10 hover:text-primary rounded-full text-sm transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Author Bio */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-5xl md:text-6xl">{post.author.avatar}</span>
                </div>
                <div className="flex-1">
                  <span className="text-sm text-primary font-medium mb-1 block">Written by</span>
                  <h3 className="text-xl md:text-2xl font-bold mb-1">{post.author.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{post.author.role}</p>
                  <p className="text-muted-foreground leading-relaxed">{post.author.bio}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
                <Bookmark className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">Related Articles</h2>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost, index) => (
                <Link key={relatedPost.id} to={`/blog/${relatedPost.id}`}>
                  <article 
                    className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 h-full border border-border/50 animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative bg-gradient-to-br from-primary/10 via-muted/50 to-secondary/10 p-10 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="text-5xl group-hover:scale-110 transition-transform duration-500 relative z-10">
                        {relatedPost.image}
                      </div>
                    </div>
                    <div className="p-6">
                      <span className="px-3 py-1 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary rounded-full text-xs font-medium">
                        {relatedPost.category}
                      </span>
                      <h3 className="text-lg font-bold mt-3 mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{relatedPost.readTime}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-secondary" />
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/3 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center text-white">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
              <span className="text-3xl">🐟</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Try These Recipes?</h2>
            <p className="text-lg md:text-xl mb-8 text-white/80">
              Order fresh tilapia and other fish from our marketplace
            </p>
            <Link to="/marketplace">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:scale-105">
                Browse Fresh Fish
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPost;
