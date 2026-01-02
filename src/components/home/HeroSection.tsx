import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Fish, Truck, Shield, Waves, Anchor, Ship, Store, Home, ChefHat, Users, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { stats } from '@/data/fishData';

const ecosystemSteps = [
  {
    id: 1,
    icon: Anchor,
    title: 'Ocean Catch',
    description: 'Local fishermen bring in fresh catches daily',
    image: 'https://images.unsplash.com/photo-1545816250-e12bedba42ba?w=400&h=300&fit=crop',
  },
  {
    id: 2,
    icon: Ship,
    title: 'Quality Check',
    description: 'Blockchain-verified freshness & traceability',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop',
  },
  {
    id: 3,
    icon: Store,
    title: 'Marketplace',
    description: 'Browse & order from verified sellers',
    image: 'https://images.unsplash.com/photo-1534766555764-ce878a5e3a2b?w=400&h=300&fit=crop',
  },
  {
    id: 4,
    icon: Truck,
    title: 'Swift Delivery',
    description: 'Cold-chain logistics to your doorstep',
    image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=300&fit=crop',
  },
  {
    id: 5,
    icon: ChefHat,
    title: 'Fresh to Table',
    description: 'Enjoy premium quality seafood',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
  },
];

const HeroSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveStep((prev) => (prev + 1) % ecosystemSteps.length);
        setIsAnimating(false);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-background via-ocean-light/30 to-background">
      {/* Animated Ocean Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Waves */}
        <div className="absolute bottom-0 left-0 right-0 h-64">
          <svg className="absolute bottom-0 w-full h-40 animate-wave-slow" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path 
              fill="hsl(var(--primary) / 0.08)" 
              d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
            />
          </svg>
          <svg className="absolute bottom-0 w-full h-32 animate-wave-medium" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path 
              fill="hsl(var(--primary) / 0.05)" 
              d="M0,80 C360,20 720,100 1080,40 C1260,10 1380,60 1440,80 L1440,120 L0,120 Z"
            />
          </svg>
          <svg className="absolute bottom-0 w-full h-24 animate-wave-fast" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path 
              fill="hsl(var(--primary) / 0.03)" 
              d="M0,100 C180,60 360,100 540,80 C720,60 900,100 1080,80 C1260,60 1380,90 1440,100 L1440,120 L0,120 Z"
            />
          </svg>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-primary/20 animate-float-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${8 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />
      </div>

      <div className="container relative z-10 py-12">
        {/* Main Content */}
        <div className="text-center max-w-4xl mx-auto mb-16 animate-slide-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card/80 backdrop-blur-sm border border-primary/20 shadow-lg mb-8">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span>
            </span>
            <span className="text-sm font-medium">
              Serving <span className="text-primary font-bold">{stats.regionsServed}+ regions</span> across Tanzania
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            <span className="block text-foreground">From Ocean</span>
            <span className="block bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient">
              To Your Table
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Experience Tanzania's premier fish marketplace. We connect local fishermen directly with hotels, 
            restaurants, and households — ensuring <span className="text-foreground font-semibold">freshness you can trust</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link to="/marketplace">
              <Button size="lg" className="group px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90">
                Explore Marketplace
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/sell">
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg rounded-full border-2 hover:bg-card/50">
                Start Selling
              </Button>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-secondary" />
              <span>Blockchain Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>Same Day Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-secondary" />
              <span>Quality Guaranteed</span>
            </div>
          </div>
        </div>

        {/* Cinematic Ecosystem Visualization */}
        <div className="relative max-w-6xl mx-auto">
          {/* Journey Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-secondary/40 to-primary/20 -translate-y-1/2 rounded-full" />
          
          {/* Progress Line */}
          <div 
            className="hidden lg:block absolute top-1/2 left-0 h-1 bg-gradient-to-r from-primary to-secondary -translate-y-1/2 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${(activeStep / (ecosystemSteps.length - 1)) * 100}%` }}
          />

          {/* Steps */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
            {ecosystemSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === activeStep;
              const isPast = index < activeStep;
              
              return (
                <div
                  key={step.id}
                  className={`relative group cursor-pointer transition-all duration-500 ${
                    isActive ? 'scale-105 z-10' : 'scale-100'
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  {/* Card */}
                  <div 
                    className={`relative rounded-2xl overflow-hidden transition-all duration-500 ${
                      isActive 
                        ? 'shadow-2xl ring-2 ring-primary/50' 
                        : 'shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {/* Image */}
                    <div className="relative h-36 md:h-44 overflow-hidden">
                      <img
                        src={step.image}
                        alt={step.title}
                        className={`w-full h-full object-cover transition-all duration-700 ${
                          isActive ? 'scale-110' : 'scale-100 group-hover:scale-105'
                        }`}
                      />
                      <div className={`absolute inset-0 transition-all duration-500 ${
                        isActive 
                          ? 'bg-gradient-to-t from-primary/80 via-primary/40 to-transparent' 
                          : isPast
                            ? 'bg-gradient-to-t from-secondary/70 via-secondary/30 to-transparent'
                            : 'bg-gradient-to-t from-foreground/70 via-foreground/30 to-transparent'
                      }`} />
                      
                      {/* Step Number */}
                      <div className={`absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                        isActive 
                          ? 'bg-primary text-primary-foreground scale-110' 
                          : isPast
                            ? 'bg-secondary text-secondary-foreground'
                            : 'bg-card/80 text-foreground'
                      }`}>
                        {index + 1}
                      </div>

                      {/* Icon Badge */}
                      <div className={`absolute top-3 right-3 p-2 rounded-xl transition-all duration-300 ${
                        isActive 
                          ? 'bg-primary-foreground/90 text-primary' 
                          : 'bg-card/80 text-foreground'
                      }`}>
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 bg-card/95 backdrop-blur-sm">
                      <h3 className={`font-bold text-sm md:text-base mb-1 transition-colors duration-300 ${
                        isActive ? 'text-primary' : 'text-foreground'
                      }`}>
                        {step.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {step.description}
                      </p>
                    </div>

                    {/* Active Indicator */}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary animate-pulse" />
                    )}
                  </div>

                  {/* Connection Line Dot (Desktop) */}
                  <div className={`hidden lg:block absolute -bottom-8 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 transition-all duration-500 ${
                    isActive 
                      ? 'bg-primary border-primary scale-125' 
                      : isPast 
                        ? 'bg-secondary border-secondary' 
                        : 'bg-card border-muted'
                  }`} />
                </div>
              );
            })}
          </div>

          {/* Mobile Step Indicator */}
          <div className="flex lg:hidden justify-center gap-2 mt-8">
            {ecosystemSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === activeStep 
                    ? 'bg-primary w-8' 
                    : index < activeStep 
                      ? 'bg-secondary' 
                      : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto">
          {[
            { value: `${(stats.fishermen / 1000).toFixed(1)}K+`, label: 'Fishermen', icon: Users },
            { value: `${(stats.ordersDelivered / 1000).toFixed(0)}K+`, label: 'Orders Delivered', icon: Truck },
            { value: `${stats.satisfactionRate}%`, label: 'Satisfaction', icon: CheckCircle2 },
            { value: `${stats.regionsServed}+`, label: 'Regions', icon: MapPin },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.label} 
                className="relative group p-6 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/50 text-center hover:bg-card/80 transition-all duration-300 hover:shadow-lg animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Icon className="h-6 w-6 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform duration-300" />
                <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-muted-foreground">Scroll to explore</span>
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 rounded-full bg-primary animate-scroll-down" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
