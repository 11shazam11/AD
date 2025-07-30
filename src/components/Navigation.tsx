import React, { useState } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';  // import your existing Modal component
import { Input } from './ui/Input';  // use reusable Input component, assuming you have it
import { Textarea } from './ui/Textarea'; // optional for "Get Started" message

type ModalType = 'signin' | 'getstarted' | null;

export const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);

  // Open modal and set type
  const openModal = (type: ModalType) => {
    setModalType(type);
    setIsModalOpen(true);
    setIsMenuOpen(false);
  };
  // Close modal and reset
  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
  };

  const navItems = [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' }
  ];

  // Form submit handlers (replace with your logic as needed)
  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Signed In successfully!');
    closeModal();
  };

  const handleGetStartedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for getting started! We will contact you shortly.');
    closeModal();
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Zap className="w-8 h-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">ADmyBRAND AI</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden md:block">
              <div className="ml-4 flex items-center space-x-4">
                <Button variant="ghost" size="sm" onClick={() => openModal('signin')}>
                  Sign In
                </Button>
                <Button size="sm" onClick={() => openModal('getstarted')}>
                  Get Started
                </Button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 block px-3 py-2 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}

              <div className="pt-4 pb-2 space-y-2">
                <Button variant="ghost" size="sm" className="w-full" onClick={() => openModal('signin')}>
                  Sign In
                </Button>
                <Button size="sm" className="w-full" onClick={() => openModal('getstarted')}>
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalType === 'signin' ? 'Sign In to Your Account' : 'Get Started with ADmyBRAND AI'}
        size="md"
      >
        {modalType === 'signin' ? (
          // Sign In Form
          <form onSubmit={handleSignInSubmit} className="space-y-6">
            <Input
              id="signin-email"
              name="email"
              type="email"
              label="Email Address"
              placeholder="you@example.com"
              required
            />
            <Input
              id="signin-password"
              name="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
              required
            />
            <div className="flex justify-end">
              <Button type="submit" variant="primary" size="md" className="px-6 py-3">
                Sign In
              </Button>
            </div>
          </form>
        ) : (
          // Get Started Form
          <form onSubmit={handleGetStartedSubmit} className="space-y-6">
            <Input
              id="getstarted-email"
              name="email"
              type="email"
              label="Email Address"
              placeholder="you@example.com"
              required
            />
            <Input
              id="getstarted-fullname"
              name="fullName"
              type="text"
              label="Full Name"
              placeholder="Enter your full name"
              required
            />
            <Input
              id="getstarted-company"
              name="company"
              type="text"
              label="Company Name"
              placeholder="Enter your company name (optional)"
            />
            <Textarea
              id="getstarted-message"
              name="message"
              label="Message"
              placeholder="Any additional details..."
              rows={4}
            />
            <div className="flex justify-end">
              <Button type="submit" variant="primary" size="md" className="px-6 py-3">
                Submit
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
};
