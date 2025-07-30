import React from 'react';
import { Accordion } from '../ui/Accordion';

const faqItems = [
  {
    title: 'How does ADmyBRAND AI Suite work?',
    content: 'ADmyBRAND AI Suite uses advanced machine learning algorithms to analyze your brand, audience, and market data. It then generates personalized marketing content, optimizes campaigns in real-time, and provides predictive insights to maximize your ROI. The platform integrates with your existing tools and learns from your campaigns to continuously improve performance.'
  },
  {
    title: 'What makes your AI different from other marketing tools?',
    content: 'Our AI is specifically trained on marketing data and best practices from thousands of successful campaigns. Unlike generic AI tools, ADmyBRAND understands marketing context, brand voice, and conversion psychology. It provides actionable insights rather than just data, and continuously optimizes your campaigns based on real-time performance metrics.'
  },
  {
    title: 'Can I integrate ADmyBRAND with my existing marketing stack?',
    content: 'Yes! ADmyBRAND integrates with over 50 popular marketing platforms including Google Ads, Facebook Ads, HubSpot, Salesforce, Mailchimp, and many more. Our API allows for custom integrations, and our team can help set up connections with your specific tools during onboarding.'
  },
  {
    title: 'How quickly can I see results?',
    content: 'Most customers see improvements within the first week of implementation. Content generation and audience targeting optimizations begin immediately, while predictive analytics and advanced optimizations typically show significant results within 30 days as the AI learns from your specific data patterns.'
  },
  {
    title: 'Is my data secure with ADmyBRAND?',
    content: 'Absolutely. We use enterprise-grade security with SOC 2 Type II compliance, end-to-end encryption, and regular security audits. Your data is never shared with third parties or used to train models for other customers. We also offer on-premises deployment options for enterprises with strict data requirements.'
  },
  {
    title: 'What kind of support do you provide?',
    content: 'We offer comprehensive support including 24/7 chat support, dedicated account managers for Professional and Enterprise plans, onboarding assistance, training sessions, and a comprehensive knowledge base. Enterprise customers also receive white-glove implementation support and custom training for their teams.'
  },
  {
    title: 'Can I cancel my subscription anytime?',
    content: 'Yes, you can cancel your subscription at any time with no cancellation fees. Your account will remain active until the end of your current billing period, and you can export all your data and campaign insights. We also offer a 14-day free trial so you can test the platform risk-free.'
  },
  {
    title: 'Do you offer custom AI model training?',
    content: 'Yes, our Enterprise plan includes custom AI model training specifically for your brand, industry, and audience. This allows the AI to better understand your unique requirements and generate more targeted, effective campaigns. The training process typically takes 2-4 weeks and includes ongoing refinement based on performance data.'
  }
];

export const FAQ: React.FC = () => {
  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about ADmyBRAND AI Suite and how it can transform your marketing.
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion items={faqItems} />

        {/* Bottom CTA */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-6">
            Our team is here to help you succeed. Get in touch and we'll answer any questions you have.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl">
              Contact Support
            </button>
            <button className="px-8 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-200">
              Schedule a Call
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};