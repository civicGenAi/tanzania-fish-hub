import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, MessageCircle, Phone, Mail, ChevronDown, ChevronUp,
  ShoppingBag, Truck, CreditCard, Package, Users, HelpCircle,
  ArrowRight, Clock, MapPin
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const Help: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Topics', icon: HelpCircle },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'delivery', label: 'Delivery', icon: Truck },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'account', label: 'Account', icon: Users },
  ];

  const faqs: FAQItem[] = [
    {
      category: 'orders',
      question: 'How do I place an order?',
      answer: 'Browse our marketplace, add items to your cart, proceed to checkout, select your delivery address, choose a payment method, and confirm your order. You\'ll receive a confirmation email with your order details.',
    },
    {
      category: 'orders',
      question: 'Can I modify or cancel my order?',
      answer: 'You can modify or cancel your order within 30 minutes of placing it. Go to "My Orders" in your dashboard and select the order you want to change. After 30 minutes, please contact our support team.',
    },
    {
      category: 'orders',
      question: 'How do I track my order?',
      answer: 'Once your order is out for delivery, you\'ll see a "Track" button in your order details. Click it to see real-time location updates of your delivery driver.',
    },
    {
      category: 'delivery',
      question: 'What are the delivery hours?',
      answer: 'We deliver from 6:00 AM to 8:00 PM, seven days a week. You can select your preferred delivery time slot during checkout.',
    },
    {
      category: 'delivery',
      question: 'How much does delivery cost?',
      answer: 'Delivery fees vary based on distance and order value. Orders over TZS 50,000 qualify for free delivery within Dar es Salaam. You\'ll see the exact delivery fee at checkout.',
    },
    {
      category: 'delivery',
      question: 'Which areas do you deliver to?',
      answer: 'We currently deliver across Dar es Salaam including Kinondoni, Ilala, and Temeke districts. We\'re expanding to other regions soon!',
    },
    {
      category: 'payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept M-Pesa, Tigo Pesa, Airtel Money, Visa, Mastercard, and bank transfers. All payments are processed securely.',
    },
    {
      category: 'payment',
      question: 'Is my payment information secure?',
      answer: 'Yes! We use bank-level encryption to protect your payment information. We never store your full card details on our servers.',
    },
    {
      category: 'payment',
      question: 'Can I pay on delivery?',
      answer: 'Cash on delivery is available for orders under TZS 100,000. For larger orders, we require online payment for security reasons.',
    },
    {
      category: 'products',
      question: 'How fresh is the fish?',
      answer: 'All fish is caught fresh daily by local fishermen. We guarantee same-day delivery of the freshest catch available.',
    },
    {
      category: 'products',
      question: 'Can I request specific cuts or preparation?',
      answer: 'Yes! You can add special instructions during checkout to request scaling, gutting, or specific cuts. This service is free.',
    },
    {
      category: 'products',
      question: 'What if I receive low-quality fish?',
      answer: 'We have a 100% quality guarantee. If you\'re not satisfied, contact us within 2 hours of delivery for a full refund or replacement.',
    },
    {
      category: 'account',
      question: 'How do I create an account?',
      answer: 'Click "Login" in the top menu, then select "Sign Up". Enter your details, verify your phone number, and you\'re ready to start shopping!',
    },
    {
      category: 'account',
      question: 'How do I reset my password?',
      answer: 'On the login page, click "Forgot Password?". Enter your email or phone number, and we\'ll send you a reset link.',
    },
    {
      category: 'account',
      question: 'How do I earn and use reward points?',
      answer: 'Earn 5 points for every TZS 1,000 spent. Use points to get discounts, free delivery, or exclusive offers. Check your rewards in the dashboard.',
    },
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Call us 24/7',
      value: '+255 712 345 678',
      action: 'Call Now',
      color: 'bg-primary',
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our team',
      value: 'Available 6AM - 10PM',
      action: 'Start Chat',
      color: 'bg-secondary',
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us a message',
      value: 'support@fishhappy.co.tz',
      action: 'Send Email',
      color: 'bg-accent',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary py-16 text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">How can we help you?</h1>
            <p className="text-lg text-primary-foreground/90 mb-8">
              Search our knowledge base or browse categories below
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-0 shadow-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary-foreground"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="-mt-8 relative z-10">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Clock, label: '24/7 Support', value: 'Available' },
              { icon: MessageCircle, label: 'Avg Response', value: '< 5 min' },
              { icon: Users, label: 'Happy Customers', value: '50K+' },
              { icon: MapPin, label: 'Service Areas', value: '15+' },
            ].map((stat) => (
              <div key={stat.label} className="bg-card border border-border rounded-2xl p-4 shadow-ocean text-center">
                <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Browse by Category</h2>
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  <category.icon className="h-4 w-4" />
                  {category.label}
                </button>
              ))}
            </div>

            {/* FAQs */}
            <div className="space-y-3">
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-card border border-border rounded-2xl overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                      className="w-full p-5 flex items-center justify-between text-left hover:bg-muted/30 transition-colors"
                    >
                      <span className="font-semibold pr-4">{faq.question}</span>
                      {expandedFAQ === index ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground shrink-0" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
                      )}
                    </button>
                    {expandedFAQ === index && (
                      <div className="px-5 pb-5 pt-0">
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">
                    No results found. Try a different search term or category.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-3">Still need help?</h2>
              <p className="text-muted-foreground">
                Our support team is here to assist you
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {contactMethods.map((method) => (
                <div
                  key={method.title}
                  className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <div className={`w-14 h-14 rounded-full ${method.color} flex items-center justify-center mx-auto mb-4`}>
                    <method.icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{method.title}</h3>
                  <p className="text-sm text-muted-foreground mb-1">{method.description}</p>
                  <p className="font-medium mb-4">{method.value}</p>
                  <Button variant="outline" className="w-full">
                    {method.action}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto bg-ocean-light border border-primary/20 rounded-2xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-4">For Customers</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/marketplace" className="text-primary hover:underline flex items-center gap-2">
                      <ArrowRight className="h-4 w-4" />
                      Browse Marketplace
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard" className="text-primary hover:underline flex items-center gap-2">
                      <ArrowRight className="h-4 w-4" />
                      My Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/orders" className="text-primary hover:underline flex items-center gap-2">
                      <ArrowRight className="h-4 w-4" />
                      Track Orders
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-4">For Sellers & Drivers</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/seller" className="text-primary hover:underline flex items-center gap-2">
                      <ArrowRight className="h-4 w-4" />
                      Seller Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/distributor" className="text-primary hover:underline flex items-center gap-2">
                      <ArrowRight className="h-4 w-4" />
                      Driver Dashboard
                    </Link>
                  </li>
                  <li>
                    <a href="#" className="text-primary hover:underline flex items-center gap-2">
                      <ArrowRight className="h-4 w-4" />
                      Partner Resources
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Help;
