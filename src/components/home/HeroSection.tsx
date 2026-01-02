import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Anchor, Ship, Truck, Users } from 'lucide-react';

// Ocean video from Pexels CDN
const OCEAN_VIDEO_URL = "https://videos.pexels.com/video-files/1093662/1093662-uhd_2560_1440_30fps.mp4";

const statsData = [
  { value: '2.5K+', label: 'Fishermen', icon: Anchor, delay: 0 },
  { value: '50K+', label: 'Orders Delivered', icon: Ship, delay: 0.2 },
  { value: '98%', label: 'Satisfaction', icon: Users, delay: 0.4 },
  { value: '5+', label: 'Regions', icon: Truck, delay: 0.6 },
];

const HeroSection: React.FC = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [activeStatIndex, setActiveStatIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStatIndex((prev) => (prev + 1) % statsData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source src={OCEAN_VIDEO_URL} type="video/mp4" />
        </video>
        
        {/* Video Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50" />
        
        {/* Fallback gradient while video loads */}
        <div className={`absolute inset-0 bg-gradient-to-b from-primary/20 via-background to-background transition-opacity duration-1000 ${
          isVideoLoaded ? 'opacity-0' : 'opacity-100'
        }`} />
      </div>

      {/* Mute/Unmute Button */}
      <button
        onClick={toggleMute}
        className="absolute top-24 right-6 z-20 p-3 rounded-full bg-card/60 backdrop-blur-md border border-primary-foreground/20 text-primary-foreground hover:bg-card/80 transition-all duration-300 shadow-lg"
        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
      >
        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
      </button>

      {/* Bubbles Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary-foreground/20 animate-bubble"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: '-20px',
              width: `${4 + Math.random() * 12}px`,
              height: `${4 + Math.random() * 12}px`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="container relative z-10 flex flex-col items-center justify-center min-h-screen py-20">
        {/* Centered Headline */}
        <div className="text-center mb-16 animate-slide-up">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight">
            <span className="block text-primary-foreground drop-shadow-lg mb-2">From Ocean</span>
            <span className="block bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient drop-shadow-lg">
              To Your Table
            </span>
          </h1>
        </div>

        {/* Aquatic Stats Display */}
        <div className="w-full max-w-5xl mx-auto mt-auto">
          {/* Wave Container */}
          <div className="relative">
            {/* Animated Wave SVG */}
            <svg 
              className="absolute -top-16 left-0 w-full h-20 animate-wave-slow" 
              viewBox="0 0 1440 80" 
              preserveAspectRatio="none"
            >
              <path 
                fill="hsl(var(--primary) / 0.15)" 
                d="M0,40 C150,80 300,0 450,40 C600,80 750,0 900,40 C1050,80 1200,0 1350,40 L1440,40 L1440,80 L0,80 Z"
              />
            </svg>
            <svg 
              className="absolute -top-12 left-0 w-full h-16 animate-wave-medium" 
              viewBox="0 0 1440 80" 
              preserveAspectRatio="none"
            >
              <path 
                fill="hsl(var(--secondary) / 0.1)" 
                d="M0,50 C200,20 400,70 600,40 C800,10 1000,60 1200,30 L1440,50 L1440,80 L0,80 Z"
              />
            </svg>
            
            {/* Stats Cards - Floating Bubbles Style */}
            <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {statsData.map((stat, index) => {
                const Icon = stat.icon;
                const isActive = index === activeStatIndex;
                
                return (
                  <div
                    key={stat.label}
                    className="group relative animate-fade-in"
                    style={{ animationDelay: `${stat.delay}s` }}
                  >
                    {/* Bubble Background */}
                    <div 
                      className={`absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 blur-xl transition-all duration-700 ${
                        isActive ? 'scale-110 opacity-80' : 'scale-100 opacity-40'
                      }`}
                    />
                    
                    {/* Card Content */}
                    <div 
                      className={`relative p-6 md:p-8 rounded-3xl backdrop-blur-md border transition-all duration-500 text-center overflow-hidden ${
                        isActive 
                          ? 'bg-primary/20 border-primary/40 scale-105 shadow-2xl shadow-primary/20' 
                          : 'bg-card/30 border-primary-foreground/10 hover:bg-card/40 hover:scale-102'
                      }`}
                    >
                      {/* Ripple Effect */}
                      <div className={`absolute inset-0 rounded-3xl transition-opacity duration-500 ${
                        isActive ? 'opacity-100' : 'opacity-0'
                      }`}>
                        <div className="absolute inset-0 animate-ripple rounded-3xl border-2 border-primary/30" />
                        <div className="absolute inset-0 animate-ripple rounded-3xl border-2 border-primary/20" style={{ animationDelay: '0.5s' }} />
                      </div>
                      
                      {/* Fish Icon Swimming */}
                      <div className={`absolute -right-2 top-1/2 -translate-y-1/2 transition-all duration-700 ${
                        isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                      }`}>
                        <svg className="w-8 h-8 text-primary/40 animate-swim" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.8-.1 2.6-.3-.4-1.2-.6-2.5-.6-3.7 0-3.5 1.5-6.7 3.9-9-.6-.6-1.3-1.1-2-1.5C14.8 4.5 13.4 2 12 2zm-1 4c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z"/>
                        </svg>
                      </div>
                      
                      {/* Icon */}
                      <div className={`mx-auto mb-3 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                        isActive 
                          ? 'bg-primary text-primary-foreground scale-110' 
                          : 'bg-primary/20 text-primary'
                      }`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      
                      {/* Value */}
                      <p className={`text-3xl md:text-4xl font-bold transition-all duration-500 ${
                        isActive 
                          ? 'text-primary-foreground scale-110' 
                          : 'bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'
                      }`}>
                        {stat.value}
                      </p>
                      
                      {/* Label */}
                      <p className={`text-sm mt-1 transition-colors duration-500 ${
                        isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'
                      }`}>
                        {stat.label}
                      </p>
                      
                      {/* Water Level Animation */}
                      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary transition-all duration-700 ${
                        isActive ? 'opacity-100' : 'opacity-0'
                      }`}>
                        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - More visible with proper spacing */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
        <span className="text-sm font-medium text-primary-foreground/80 tracking-wide uppercase">
          Scroll to explore
        </span>
        <div className="relative w-8 h-14 rounded-full border-2 border-primary-foreground/40 flex justify-center p-2 backdrop-blur-sm bg-card/20">
          <div className="w-2 h-4 rounded-full bg-primary animate-scroll-down" />
          {/* Ripple rings */}
          <div className="absolute -inset-2 rounded-full border border-primary-foreground/20 animate-ping-slow" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
