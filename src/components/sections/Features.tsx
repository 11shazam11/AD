import React from "react";
import {
  Brain,
  Target,
  BarChart3,
  Zap,
  Users,
  Shield,
  Cpu,
  TrendingUp,
} from "lucide-react";
import { Card } from "../ui/Card";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Content Generation",
    description:
      "Create compelling ad copy, social media posts, and email campaigns with our advanced AI that understands your brand voice and audience preferences.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Target,
    title: "Smart Audience Targeting",
    description:
      "Leverage machine learning to identify and target your ideal customers with precision, increasing conversion rates by up to 300%.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: BarChart3,
    title: "Predictive Analytics",
    description:
      "Forecast campaign performance, customer behavior, and market trends with our proprietary predictive models.",
    gradient: "from-green-500 to-teal-500",
  },
  {
    icon: Zap,
    title: "Real-time Optimization",
    description:
      "Automatically adjust campaigns in real-time based on performance data, ensuring maximum ROI and minimal waste.",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    icon: Users,
    title: "Customer Journey Mapping",
    description:
      "Visualize and optimize every touchpoint in your customer journey with AI-driven insights and recommendations.",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    icon: Shield,
    title: "Brand Safety & Compliance",
    description:
      "Ensure your campaigns meet brand guidelines and regulatory requirements with automated compliance checking.",
    gradient: "from-red-500 to-pink-500",
  },
  {
    icon: Cpu,
    title: "Multi-Platform Integration",
    description:
      "Seamlessly connect with 50+ marketing platforms, CRMs, and analytics tools for unified campaign management.",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: TrendingUp,
    title: "Performance Intelligence",
    description:
      "Get actionable insights with advanced reporting, custom dashboards, and AI-powered recommendations.",
    gradient: "from-emerald-500 to-green-500",
  },
];

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Powerful AI Features That{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Drive Results
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive AI suite provides everything you need to create,
            optimize, and scale your marketing campaigns with unprecedented
            efficiency.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                variant="glass"
                hover
                className="p-4 text-center group shadow-xl"
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow group-hover:scale-105 group-hover:shadow-lg transition-transform duration-400`}
                  style={{
                    filter: "drop-shadow(0 0 7px rgba(255,255,255,0.3))",
                  }}
                >
                  <Icon className="w-7 h-7 text-white drop-shadow" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-200">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-snug text-sm">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        
      </div>
    </section>
  );
};
