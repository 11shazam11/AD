import React, { useState } from "react";
import { Check, Star } from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Modal } from "../ui/Modal";
import { ContactForm } from "../ContactForm";  // Adjust path as needed

const plans = [
  {
    name: "Starter",
    price: 49,
    description: "Perfect for small businesses and startups",
    features: [
      "Up to 10,000 AI-generated content pieces",
      "Basic audience targeting",
      "5 platform integrations",
      "Standard analytics dashboard",
      "Email support",
      "24/7 system monitoring",
    ],
    recommended: false,
    gradient: "from-gray-500 to-gray-600",
  },
  {
    name: "Professional",
    price: 149,
    description: "Ideal for growing businesses and agencies",
    features: [
      "Up to 100,000 AI-generated content pieces",
      "Advanced audience targeting & segmentation",
      "25 platform integrations",
      "Predictive analytics & insights",
      "Priority support & dedicated account manager",
      "Custom brand voice training",
      "A/B testing & optimization",
      "Advanced reporting & dashboards",
    ],
    recommended: true,
    gradient: "from-blue-600 to-purple-600",
  },
  {
    name: "Enterprise",
    price: 449,
    description: "For large organizations with complex needs",
    features: [
      "Unlimited AI-generated content",
      "Enterprise-grade audience intelligence",
      "Unlimited platform integrations",
      "Custom AI model training",
      "24/7 white-glove support",
      "Advanced compliance & security",
      "Custom integrations & API access",
      "Dedicated success manager",
      "On-premises deployment option",
    ],
    recommended: false,
    gradient: "from-purple-600 to-pink-600",
  },
];

export const Pricing: React.FC = () => {
  // Modal states
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Open plan modal
  const openPlanModal = (planName: string) => {
    setSelectedPlan(planName);
    setIsPlanModalOpen(true);
  };

  const closePlanModal = () => {
    setIsPlanModalOpen(false);
    setSelectedPlan(null);
  };

  // Open contact modal
  const openContactModal = () => {
    setIsContactModalOpen(true);
  };

  const closeContactModal = () => {
    setIsContactModalOpen(false);
  };

  return (
    <>
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">
              Choose Your{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Marketing
              </span>{" "}
              Plan
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Scale your marketing efforts with flexible pricing designed to grow
              with your business. All plans include a 14-day free trial.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <Card
                key={index}
                variant="glass"
                hover
                className={`relative p-6 text-center border-2 transition-shadow duration-500 ease-in-out ${
                  plan.recommended
                    ? "ring-4 ring-blue-500 scale-[1.03] shadow-2xl"
                    : "ring-1 ring-gray-200 hover:shadow-lg hover:ring-gray-300"
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge
                      variant="primary"
                      className="px-5 py-1.5 rounded-full shadow-lg flex items-center space-x-2 text-sm font-semibold"
                    >
                      <Star className="w-5 h-5 text-yellow-400" />
                      <span>Most Popular</span>
                    </Badge>
                  </div>
                )}

                {/* Plan Header */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 font-medium">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="flex items-baseline justify-center mb-6">
                  <span className="text-5xl font-extrabold text-gray-900">${plan.price}</span>
                  <span className="text-gray-600 ml-2 text-lg">/month</span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 text-left max-w-md mx-auto">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700 leading-snug text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Button with modal open */}
                <Button
                  variant={plan.recommended ? "primary" : "outline"}
                  className="w-full py-3 text-lg font-bold h-12"
                  size="lg"
                  onClick={() => openPlanModal(plan.name)}
                >
                  {plan.recommended ? "Start Free Trial" : "Get Started"}
                </Button>
              </Card>
            ))}
          </div>

          {/* Enterprise CTA with buttons opening Contact form modal */}
          <Card variant="glass" className="p-10 text-center max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Need a Custom Solution?
            </h3>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto text-lg">
              Our enterprise team can create a tailored AI marketing solution that fits your
              specific requirements, compliance needs, and integration preferences.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                variant="secondary"
                className="w-full sm:w-auto px-8 py-4 text-lg"
                onClick={openContactModal}
              >
                Contact Sales
              </Button>
              <Button
                variant="ghost"
                className="w-full sm:w-auto px-8 py-4 text-lg"
                onClick={openContactModal}
              >
                Schedule Consultation
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Plan selection modal */}
      <Modal isOpen={isPlanModalOpen} onClose={closePlanModal} title={`Get Started with ${selectedPlan}`}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thank you for your interest! We will contact you soon.");
            closePlanModal();
          }}
          className="space-y-6"
        >
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              required
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="
                mt-1 block w-full rounded-2xl border border-gray-300 px-5 py-3 shadow-sm
                placeholder-gray-400 text-gray-900
                focus:border-blue-500 focus:ring-4 focus:ring-blue-300 focus:outline-none
                transition duration-300 ease-in-out
                disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400
              "
            />
          </div>

          <div>
            <label htmlFor="fullName" className="block text-sm font-semibold text-gray-800">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              required
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              className="
                mt-1 block w-full rounded-2xl border border-gray-300 px-5 py-3 shadow-sm
                placeholder-gray-400 text-gray-900
                focus:border-blue-500 focus:ring-4 focus:ring-blue-300 focus:outline-none
                transition duration-300 ease-in-out
                disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400
              "
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-semibold text-gray-800">
              Company Name
            </label>
            <input
              id="company"
              name="company"
              type="text"
              placeholder="Enter your company name"
              className="
                mt-1 block w-full rounded-2xl border border-gray-300 px-5 py-3 shadow-sm
                placeholder-gray-400 text-gray-900
                focus:border-blue-500 focus:ring-4 focus:ring-blue-300 focus:outline-none
                transition duration-300 ease-in-out
                disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400
              "
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-800">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              placeholder="Any additional details..."
              className="
                mt-1 block w-full rounded-2xl border border-gray-300 px-5 py-3 shadow-sm
                placeholder-gray-400 text-gray-900 resize-y
                focus:border-blue-500 focus:ring-4 focus:ring-blue-300 focus:outline-none
                transition duration-300 ease-in-out
                disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400
              "
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" variant="primary" size="md" className="px-6 py-3">
              Submit
            </Button>
          </div>
        </form>
      </Modal>


      {/* Contact sales / schedule consultation modal with ContactForm */}
      <Modal
        isOpen={isContactModalOpen}
        onClose={closeContactModal}
        title="Contact Sales / Schedule Consultation"
      >
        <ContactForm />
      </Modal>
    </>
  );
};
