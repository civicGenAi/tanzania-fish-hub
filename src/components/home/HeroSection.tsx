import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Fish, Truck, Shield, Waves } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { stats } from '@/data/fishData';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center hero-gradient overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-primary/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/5 rounded-full" />
        
        {/* Floating Fish Icons */}
        <Fish className="absolute top-32 right-1/4 h-8 w-8 text-primary/20 animate-float" />
        <Fish className="absolute bottom-32 left-1/4 h-12 w-12 text-secondary/20 animate-float" style={{ animationDelay: '2s' }} />
        <Waves className="absolute top-1/2 right-10 h-16 w-16 text-primary/10 animate-wave" />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-slide-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ocean-light border border-primary/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
              </span>
              <span className="text-sm font-medium text-primary">
                Now serving {stats.regionsServed} regions in Tanzania
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Fresh Fish,
                <span className="block bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                  Direct from Source
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
                Tanzania's trusted fish marketplace connecting local fishermen with hotels, restaurants, and households. 
                <span className="text-foreground font-medium"> Blockchain-verified freshness.</span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link to="/marketplace">
                <Button variant="hero" size="xl" className="group">
                  Browse Marketplace
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/sell">
                <Button variant="outline" size="xl">
                  Become a Seller
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              {[
                { value: `${(stats.fishermen / 1000).toFixed(1)}K+`, label: 'Fishermen' },
                { value: `${(stats.ordersDelivered / 1000).toFixed(0)}K+`, label: 'Orders' },
                { value: `${stats.satisfactionRate}%`, label: 'Satisfaction' },
              ].map((stat) => (
                <div key={stat.label} className="text-center md:text-left">
                  <p className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative hidden lg:block">
            <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
              {/* Main Image */}
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-ocean-lg">
                <img
                  src="https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=600&h=700&fit=crop"
                  alt="Fresh fish at market"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
              </div>

              {/* Floating Cards */}
              <div className="absolute -left-8 top-20 z-20 glass-card p-4 rounded-2xl animate-float shadow-ocean" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-secondary/10">
                    <Truck className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Fast Delivery</p>
                    <p className="text-xs text-muted-foreground">Same day in Dar</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-8 bottom-32 z-20 glass-card p-4 rounded-2xl animate-float shadow-ocean" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-primary/10">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Blockchain Verified</p>
                    <p className="text-xs text-muted-foreground">100% Transparent</p>
                  </div>
                </div>
              </div>

              {/* Decorative Ring */}
              <div className="absolute -bottom-10 -right-10 w-64 h-64 border-4 border-dashed border-primary/20 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
