import React from 'react';
import { Link } from 'react-router-dom';
import { Fish, Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const regions = [
    'Dar es Salaam',
    'Mwanza',
    'Tanga',
    'Mbeya',
    'Kilimanjaro',
  ];

  const links = {
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'How it Works', href: '/how-it-works' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
    ],
    support: [
      { label: 'Help Center', href: '/help' },
      { label: 'FAQs', href: '/faqs' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Terms of Service', href: '/terms' },
    ],
    business: [
      { label: 'Become a Seller', href: '/sell' },
      { label: 'Become a Distributor', href: '/deliver' },
      { label: 'Partner with Us', href: '/partner' },
      { label: 'Sustainability', href: '/sustainability' },
    ],
  };

  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="ocean-gradient p-2 rounded-xl">
                <Fish className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">FishHappy</span>
            </Link>
            <p className="text-background/70 mb-6 max-w-sm">
              Connecting Tanzania's fishermen with customers. Fresh fish, fair prices, 
              blockchain-verified transparency.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm text-background/70">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Msasani Peninsula, Dar es Salaam</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <span>+255 22 123 4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <span>habari@fishhappy.co.tz</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2 rounded-full bg-background/10 hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {links.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-background/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              {links.support.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-background/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Business</h4>
            <ul className="space-y-3">
              {links.business.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-background/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Regions */}
      <div className="border-t border-background/10">
        <div className="container py-6">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-background/50">
            <span>We serve:</span>
            {regions.map((region, i) => (
              <React.Fragment key={region}>
                <span className="text-background/70 hover:text-primary cursor-pointer transition-colors">
                  {region}
                </span>
                {i < regions.length - 1 && <span>•</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-background/50">
          <p>© 2024 FishHappy Tanzania. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
