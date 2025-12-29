import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Fish, Heart, Users, TrendingUp, Award, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  const stats = [
    { icon: Users, value: 2500, suffix: '+', label: 'Fishermen', color: 'from-primary to-blue-400' },
    { icon: Fish, value: 50000, suffix: '+', label: 'Orders', color: 'from-secondary to-green-400' },
    { icon: Heart, value: 15000, suffix: '+', label: 'Customers', color: 'from-accent to-orange-400' },
    { icon: TrendingUp, value: 98, suffix: '%', label: 'Satisfaction', color: 'from-primary to-purple-400' },
  ];

  const team = [
    {
      role: 'Founder & CEO',
      bio: 'Former fisherman with 15 years of experience, passionate about connecting communities',
      image: '👨🏿‍💼',
      gradient: 'from-primary to-blue-500',
    },
    {
      role: 'Operations Director',
      bio: 'Expert in supply chain, ensuring fresh fish reaches customers quickly',
      image: '👩🏿‍💼',
      gradient: 'from-secondary to-green-500',
    },
    {
      role: 'Technology Lead',
      bio: 'Building digital solutions to empower Tanzanian fishermen',
      image: '👨🏿‍💻',
      gradient: 'from-accent to-orange-500',
    },
    {
      role: 'Community Manager',
      bio: 'Connecting with fishing communities to ensure fair partnerships',
      image: '👩🏿‍🏫',
      gradient: 'from-purple-500 to-pink-500',
    },
  ];

  const values = [
    {
      icon: Fish,
      title: 'Freshness First',
      description: 'We guarantee the freshest catch, delivered within hours of being caught.',
    },
    {
      icon: Users,
      title: 'Community Empowerment',
      description: 'Supporting local fishermen families and creating sustainable livelihoods.',
    },
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'Promoting responsible fishing practices to protect our oceans for future generations.',
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description: 'Every fish is inspected and meets our strict quality and safety standards.',
    },
  ];

  const timeline = [
    {
      year: '2020',
      title: 'Born from the Ocean',
      description: 'Fish Happy was founded by Juma Mwinyipembe, a third-generation fisherman who witnessed the challenges local fishermen faced.',
      icon: Anchor,
    },
    {
      year: '2021',
      title: 'A Vision for Change',
      description: 'Partnered with technology experts to build a platform connecting fishermen directly with customers.',
      icon: Heart,
    },
    {
      year: '2023',
      title: 'Growing Together',
      description: 'Reached 15,000+ customers and 2,500+ fishing families across Tanzania.',
      icon: TrendingUp,
    },
    {
      year: '2025',
      title: 'The Future',
      description: 'Expanding across East Africa while maintaining our commitment to sustainability and community.',
      icon: Waves,
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-blue-500 to-secondary py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Wave Pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-32 opacity-20">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z" fill="white"/>
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-flex items-center justify-center w-24 h-24 md:w-32 md:h-32 bg-white/20 backdrop-blur-md rounded-full mb-8 animate-bounce">
              <Fish className="h-12 w-12 md:h-16 md:w-16" />
            </div>
            <h1 className="elegant-font text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight">
              Bringing Ocean's Freshness to Your Table
            </h1>
          </div>
        </div>
      </section>

      {/* Circular Stats Section */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <CircularStat key={index} {...stat} delay={index * 200} />
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">The Story of Fish Happy</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From humble beginnings to transforming Tanzania's fishing industry
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent md:-translate-x-1/2" />

              {/* Timeline Items */}
              {timeline.map((item, index) => (
                <div 
                  key={index}
                  className={`relative flex items-start gap-6 md:gap-12 mb-12 last:mb-0 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 -translate-x-1/2 rounded-full bg-card border-4 border-primary flex items-center justify-center shadow-lg z-10">
                    <item.icon className="h-3.5 w-3.5 text-primary" />
                  </div>

                  {/* Content */}
                  <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                    <div className="bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 border border-border/50">
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-bold mb-3">
                        {item.year}
                      </span>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-4">
              What We Stand For
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <div
                key={index}
                className="group relative bg-card rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-border/50 overflow-hidden"
              >
                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-muted/30 to-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
              The People Behind
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Passionate individuals transforming Tanzania's fishing industry
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-3"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-90`} />

                {/* Content */}
                <div className="relative p-8 flex flex-col items-center text-center text-white min-h-[320px] justify-center">
                  <div className="text-7xl md:text-8xl mb-6 group-hover:scale-110 transition-transform">
                    {member.image}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{member.role}</h3>
                  <p className="text-sm text-white/90 leading-relaxed">{member.bio}</p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-secondary" />
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
              <Fish className="h-10 w-10" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Join Our Community</h2>
            <p className="text-lg md:text-xl mb-10 text-white/80 leading-relaxed max-w-xl mx-auto">
              Whether you're a customer looking for fresh fish or a fisherman wanting to expand your reach,
              Fish Happy welcomes you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/marketplace">
                <Button size="lg" className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:scale-105">
                  <Fish className="h-5 w-5 mr-2" />
                  Start Shopping
                </Button>
              </Link>
              <Link to="/seller">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 backdrop-blur-sm">
                  <Users className="h-5 w-5 mr-2" />
                  Become a Seller
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

// Circular Stat Component with Counter Animation
const CircularStat: React.FC<{
  icon: any;
  value: number;
  suffix: string;
  label: string;
  color: string;
  delay: number;
}> = ({ icon: Icon, value, suffix, label, color, delay }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            const duration = 2000;
            const steps = 60;
            const increment = value / steps;
            let current = 0;

            const timer = setInterval(() => {
              current += increment;
              if (current >= value) {
                setCount(value);
                clearInterval(timer);
              } else {
                setCount(Math.floor(current));
              }
            }, duration / steps);

            return () => clearInterval(timer);
          }
        });
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById(`stat-${label}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [value, label, hasAnimated]);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div id={`stat-${label}`} className="flex flex-col items-center group">
      <div className="relative mb-4">
        {/* Circular Progress Ring */}
        <svg className="w-32 h-32 md:w-40 md:h-40 -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            className="stroke-muted/20"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            className={`bg-gradient-to-r ${color} transition-all duration-1000`}
            strokeWidth="8"
            fill="none"
            stroke="url(#gradient)"
            strokeDasharray="283"
            strokeDashoffset={hasAnimated ? 0 : 283}
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" className="text-primary" stopColor="currentColor" />
              <stop offset="100%" className="text-secondary" stopColor="currentColor" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Icon className="h-8 w-8 md:h-10 md:w-10 text-primary mx-auto mb-2" />
            <div className="text-2xl md:text-3xl font-bold">
              {formatNumber(count)}{suffix}
            </div>
          </div>
        </div>
      </div>

      <p className="text-sm md:text-base font-semibold text-center">{label}</p>
    </div>
  );
};

export default About;
