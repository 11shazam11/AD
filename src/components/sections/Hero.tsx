import React, { useState } from "react";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Modal } from "../ui/Modal"; // Your existing modal component
import { Input } from "../ui/Input"; // Your styled Input component
import { Textarea } from "../ui/Textarea"; // Your styled Textarea component

export const Hero: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state (optional: can be replaced with libraries like react-hook-form)
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    company: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: replace with API submission or other logic
    alert(`Thanks, ${formData.fullName}! We will contact you soon.`);
    setIsModalOpen(false);
    setFormData({ email: "", fullName: "", company: "", message: "" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/50 via-transparent to-purple-100/50 animate-pulse" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-bounce" />
      <div className="absolute top-40 right-10 w-12 h-12 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full opacity-30 animate-pulse" />
      <div
        className="absolute bottom-20 left-20 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-25 animate-bounce"
        style={{ animationDelay: "1s" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="mb-8 animate-fade-in">
          <Badge variant="primary" className="px-4 py-2 text-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            New: AI-Powered Campaign Optimizer
          </Badge>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 animate-fade-in-up">
          Transform Your Marketing with{" "}
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
            AI-Powered
          </span>{" "}
          Intelligence
        </h1>

        {/* Subtitle */}
        <p
          className="text-xl md:text-2xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          ADmyBRAND AI Suite revolutionizes your marketing strategy with
          intelligent automation, predictive analytics, and personalized
          campaign optimization that drives real results.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <Button
            size="lg"
            className="flex items-center px-10 py-4 text-lg font-bold rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transition-transform duration-300 hover:scale-[1.05] hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-400"
            onClick={() => setIsModalOpen(true)}
          >
            Start Free Trial
            <ArrowRight className="w-5 h-5 ml-3" />
          </Button>

          <Button
            variant="ghost"
            size="lg"
            className="flex items-center px-10 py-4 text-lg font-semibold rounded-2xl text-gray-800 hover:bg-gray-100 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-gray-300"
          >
            <Play className="w-5 h-5 mr-3" />
            Watch Demo
          </Button>
        </div>

        {/* Stats */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto animate-fade-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">500K+</div>
            <div className="text-gray-600">Campaigns Optimized</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">99.9%</div>
            <div className="text-gray-600">Uptime Guarantee</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">3.5x</div>
            <div className="text-gray-600">Average ROI Increase</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      {/* Modal for Start Free Trial */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Start Your Free Trial">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            required
            id="email"
            name="email"
            type="email"
            label="Email Address"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            required
            id="fullName"
            name="fullName"
            type="text"
            label="Full Name"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
          />
          <Input
            id="company"
            name="company"
            type="text"
            label="Company Name"
            placeholder="Enter your company name"
            value={formData.company}
            onChange={handleChange}
          />
          <Textarea
            id="message"
            name="message"
            label="Message"
            placeholder="Any additional details..."
            rows={4}
            value={formData.message}
            onChange={handleChange}
          />
          <div className="flex justify-end">
            <Button type="submit" variant="primary" size="md" className="px-6 py-3">
              Submit
            </Button>
          </div>
        </form>
      </Modal>
    </section>
  );
};
