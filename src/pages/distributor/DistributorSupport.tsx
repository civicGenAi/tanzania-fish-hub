import React from 'react';
import { Phone, MessageCircle, Mail, HelpCircle, Clock, ArrowRight } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DistributorSidebar from '@/components/dashboard/DistributorSidebar';
import { Button } from '@/components/ui/button';

const DistributorSupport: React.FC = () => {
  const contactMethods = [
    {
      icon: Phone,
      title: 'Emergency Hotline',
      description: 'For urgent delivery issues',
      value: '+255 700 000 000',
      action: 'Call Now',
      color: 'bg-accent',
      availability: '24/7 Available',
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with support team',
      value: 'Available 6AM - 10PM',
      action: 'Start Chat',
      color: 'bg-primary',
      availability: 'Usually responds in < 2 min',
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'For non-urgent inquiries',
      value: 'driver@fishhappy.co.tz',
      action: 'Send Email',
      color: 'bg-secondary',
      availability: 'Response within 24 hours',
    },
  ];

  const faqs = [
    {
      question: 'What should I do if a customer is not available?',
      answer: 'Try calling the customer first. If they don\'t answer, wait 10 minutes and try again. If still unavailable, contact support for instructions.',
    },
    {
      question: 'How do I report a vehicle breakdown?',
      answer: 'Call our emergency hotline immediately. We\'ll send another driver to complete your deliveries and arrange vehicle assistance.',
    },
    {
      question: 'When will I receive my earnings?',
      answer: 'Earnings are processed every Monday and Thursday. Payments are sent to your registered M-Pesa account within 24 hours.',
    },
    {
      question: 'How do I update my delivery availability?',
      answer: 'Go to Settings > Availability Schedule to set your working hours and days off.',
    },
  ];

  return (
    <DashboardLayout sidebar={<DistributorSidebar />} title="Driver Support" subtitle="Get help when you need it">
      <div className="space-y-6">
        {/* Emergency Banner */}
        <div className="bg-gradient-to-r from-accent to-accent/80 rounded-2xl p-6 text-accent-foreground">
          <div className="flex items-center gap-3 mb-3">
            <Phone className="h-6 w-6" />
            <h2 className="text-xl font-bold">Need Immediate Help?</h2>
          </div>
          <p className="mb-4">Our emergency hotline is available 24/7 for urgent delivery issues</p>
          <Button variant="secondary" size="lg">
            <Phone className="h-5 w-5 mr-2" />
            Call Emergency Hotline
          </Button>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-4">
          {contactMethods.map((method) => (
            <div key={method.title} className="bg-card border border-border rounded-2xl p-6">
              <div className={`w-14 h-14 rounded-full ${method.color} flex items-center justify-center mx-auto mb-4`}>
                <method.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-center mb-1">{method.title}</h3>
              <p className="text-sm text-muted-foreground text-center mb-2">{method.description}</p>
              <p className="font-medium text-center mb-1">{method.value}</p>
              <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-4">
                <Clock className="h-3 w-3" />
                <span>{method.availability}</span>
              </div>
              <Button variant="outline" className="w-full">
                {method.action}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="h-6 w-6 text-primary" />
            <h2 className="text-lg font-semibold">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-border pb-4 last:border-b-0 last:pb-0">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Resources */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-ocean-light border border-primary/20 rounded-2xl p-6">
            <h3 className="font-semibold mb-2">Driver Guidelines</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Read our comprehensive guide for best practices and policies
            </p>
            <Button variant="ocean">
              View Guidelines
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="bg-green-light border border-secondary/20 rounded-2xl p-6">
            <h3 className="font-semibold mb-2">Report an Issue</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Submit a detailed report about any problems you encounter
            </p>
            <Button variant="fresh">
              Submit Report
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DistributorSupport;
