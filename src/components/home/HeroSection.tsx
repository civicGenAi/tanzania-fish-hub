import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX, Anchor, Ship, Truck, Users, Waves } from 'lucide-react';

const OCEAN_VIDEO_URL = "https://videos.pexels.com/video-files/1093662/1093662-uhd_2560_1440_30fps.mp4";

const statsData = [
  { value: '2.5K+', label: 'Fishermen', icon: Anchor, color: 'from-cyan-400 to-blue-600' },
  { value: '50K+', label: 'Orders Delivered', icon: Ship, color: 'from-teal-400 to-emerald-600' },
  { value: '98%', label: 'Satisfaction', icon: Users, color: 'from-blue-400 to-indigo-600' },
  { value: '5+', label: 'Regions', icon: Truck, color: 'from-emerald-400 to-teal-600' },
];

const HeroSection: React.FC = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section 
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden cursor-default bg-slate-900"
    >
      {/* Video Background with Parallax */}
      <div 
        className="absolute inset-0 z-0 scale-110"
        style={{
          transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px) scale(1.1)`,
          transition: 'transform 0.5s cubic-bezier(0.33, 1, 0.68, 1)',
        }}
      >
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
        
        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20 mix-blend-overlay" />
        
        {/* Vignette Effect */}
        <div className="absolute inset-0 bg-radial-vignette" />
      </div>

      {/* Animated Light Rays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
        {[...Array(5)].map((_, i) => (
          <div
            key={`ray-${i}`}
            className="absolute top-0 h-full w-1 bg-gradient-to-b from-primary/30 via-primary/5 to-transparent animate-light-ray"
            style={{
              left: `${15 + i * 20}%`,
              animationDelay: `${i * 0.8}s`,
              transform: `rotate(${-15 + i * 5}deg)`,
            }}
          />
        ))}
      </div>

      {/* Floating Fish Silhouettes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
        {[...Array(6)].map((_, i) => (
          <div
            key={`fish-${i}`}
            className="absolute animate-fish-swim opacity-20"
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `-10%`,
              animationDelay: `${i * 3}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          >
            <svg 
              className="w-12 h-8 md:w-16 md:h-10 text-primary-foreground" 
              viewBox="0 0 64 40" 
              fill="currentColor"
              style={{ transform: `scale(${0.5 + Math.random() * 1})` }}
            >
              <ellipse cx="28" cy="20" rx="22" ry="14" />
              <polygon points="50,20 64,8 64,32" />
              <circle cx="16" cy="16" r="3" className="fill-background/50" />
            </svg>
          </div>
        ))}
      </div>

      {/* Interactive Bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[3]">
        {[...Array(25)].map((_, i) => (
          <div
            key={`bubble-${i}`}
            className="absolute rounded-full border border-primary-foreground/30 animate-bubble-rise"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: '-5%',
              width: `${8 + Math.random() * 24}px`,
              height: `${8 + Math.random() * 24}px`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 8}s`,
              background: `radial-gradient(circle at 30% 30%, hsl(var(--primary-foreground) / 0.2), transparent)`,
            }}
          />
        ))}
      </div>

      {/* Mute Button */}
      <button
        onClick={toggleMute}
        className="absolute top-24 right-6 z-20 p-3 rounded-full bg-card/40 backdrop-blur-xl border border-primary-foreground/20 text-primary-foreground hover:bg-card/60 hover:scale-110 transition-all duration-300 shadow-2xl group"
        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
      >
        {isMuted ? <VolumeX className="h-5 w-5 group-hover:animate-pulse" /> : <Volume2 className="h-5 w-5" />}
      </button>

      {/* Main Content */}
      <div className="container relative z-10 flex flex-col items-center justify-center min-h-screen py-20 px-4">
        
        {/* Animated Title with 3D Effect */}
        <div 
          className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
          style={{
            transform: `perspective(1000px) rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * -5}deg) translateY(${isVisible ? 0 : 20}px)`,
            transition: 'transform 0.3s ease-out, opacity 1s ease-out',
          }}
        >
          {/* Decorative Wave Lines */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 md:w-32 bg-gradient-to-r from-transparent to-primary-foreground/50" />
            <Waves className="h-6 w-6 text-primary-foreground/70 animate-wave" />
            <div className="h-px w-16 md:w-32 bg-gradient-to-l from-transparent to-primary-foreground/50" />
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-none tracking-tight">
            <span 
              className="block text-primary-foreground drop-shadow-2xl mb-2 animate-text-reveal"
              style={{ animationDelay: '0.2s' }}
            >
              From Ocean
            </span>
            <span 
              className="block relative animate-text-reveal"
              style={{ animationDelay: '0.5s' }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent blur-2xl opacity-50">
                To Your Table
              </span>
              <span className="relative bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-flow">
                To Your Table
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p 
            className="mt-6 text-lg md:text-xl text-primary-foreground/70 max-w-2xl mx-auto animate-fade-in-delayed font-light tracking-wide"
          >
            Connecting fishermen directly to your kitchen — fresh, sustainable, traceable
          </p>
        </div>

        {/* Interactive Stats Grid */}
        <div 
          className={`w-full max-w-6xl mx-auto transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {statsData.map((stat, index) => {
              const Icon = stat.icon;
              const isHovered = hoveredStat === index;
              
              return (
                <div
                  key={stat.label}
                  onMouseEnter={() => setHoveredStat(index)}
                  onMouseLeave={() => setHoveredStat(null)}
                  className="relative group cursor-pointer"
                  style={{
                    animationDelay: `${0.8 + index * 0.15}s`,
                  }}
                >
                  {/* Glow Effect */}
                  <div 
                    className={`absolute -inset-1 rounded-3xl bg-gradient-to-r ${stat.color} blur-xl transition-all duration-500 ${
                      isHovered ? 'opacity-60 scale-105' : 'opacity-0 scale-100'
                    }`}
                  />
                  
                  {/* Card */}
                  <div 
                    className={`relative overflow-hidden rounded-2xl md:rounded-3xl backdrop-blur-xl border transition-all duration-500 ${
                      isHovered 
                        ? 'bg-card/40 border-primary/50 scale-105 shadow-2xl' 
                        : 'bg-card/20 border-primary-foreground/10 hover:border-primary-foreground/20'
                    }`}
                    style={{
                      transform: isHovered 
                        ? `perspective(1000px) rotateX(${mousePosition.y * -10}deg) rotateY(${mousePosition.x * 10}deg) scale(1.05)` 
                        : 'none',
                      transition: 'all 0.4s cubic-bezier(0.33, 1, 0.68, 1)',
                    }}
                  >
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-30">
                      <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-20`} />
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <pattern id={`waves-${index}`} x="0" y="0" width="20" height="10" patternUnits="userSpaceOnUse">
                          <path 
                            d="M0 5 Q5 0 10 5 T20 5" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="0.5"
                            className="text-primary-foreground/20"
                          />
                        </pattern>
                        <rect width="100" height="100" fill={`url(#waves-${index})`} />
                      </svg>
                    </div>

                    {/* Content */}
                    <div className="relative p-6 md:p-8 text-center">
                      {/* Icon Container */}
                      <div 
                        className={`mx-auto mb-4 w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                          isHovered 
                            ? `bg-gradient-to-br ${stat.color} shadow-lg shadow-primary/30` 
                            : 'bg-primary-foreground/10'
                        }`}
                      >
                        <Icon 
                          className={`h-7 w-7 md:h-8 md:w-8 transition-all duration-500 ${
                            isHovered ? 'text-white scale-110' : 'text-primary-foreground/70'
                          }`}
                        />
                      </div>
                      
                      {/* Value with Counter Effect */}
                      <div className="relative">
                        <p 
                          className={`text-4xl md:text-5xl lg:text-6xl font-bold transition-all duration-500 ${
                            isHovered 
                              ? 'text-primary-foreground scale-110' 
                              : 'text-primary-foreground/90'
                          }`}
                        >
                          {stat.value}
                        </p>
                        {/* Shine Effect */}
                        <div 
                          className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-700 ${
                            isHovered ? 'translate-x-full' : '-translate-x-full'
                          }`}
                        />
                      </div>
                      
                      {/* Label */}
                      <p 
                        className={`text-sm md:text-base mt-2 font-medium tracking-wide transition-colors duration-500 ${
                          isHovered ? 'text-primary-foreground' : 'text-primary-foreground/60'
                        }`}
                      >
                        {stat.label}
                      </p>

                      {/* Bottom Accent Line */}
                      <div 
                        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-1 rounded-full bg-gradient-to-r ${stat.color} transition-all duration-500 ${
                          isHovered ? 'w-3/4 opacity-100' : 'w-0 opacity-0'
                        }`}
                      />
                    </div>

                    {/* Corner Decorations */}
                    <div 
                      className={`absolute top-0 right-0 w-16 h-16 transition-opacity duration-500 ${
                        isHovered ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-primary-foreground/30 rounded-tr-xl" />
                    </div>
                    <div 
                      className={`absolute bottom-0 left-0 w-16 h-16 transition-opacity duration-500 ${
                        isHovered ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-primary-foreground/30 rounded-bl-xl" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4">
        <span className="text-xs md:text-sm font-medium text-primary-foreground/60 tracking-[0.2em] uppercase animate-pulse-slow">
          Dive In
        </span>
        <div className="relative">
          {/* Outer Ring */}
          <div className="absolute -inset-4 rounded-full border border-primary-foreground/10 animate-ping-slow" />
          <div className="absolute -inset-2 rounded-full border border-primary-foreground/20 animate-ping-slow" style={{ animationDelay: '0.5s' }} />
          
          {/* Main Indicator */}
          <div className="relative w-7 h-12 rounded-full border-2 border-primary-foreground/40 flex justify-center pt-2 backdrop-blur-sm bg-card/10">
            <div className="w-1.5 h-3 rounded-full bg-gradient-to-b from-primary to-secondary animate-scroll-down" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
