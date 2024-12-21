import React, { useState } from 'react';
import { Check } from 'lucide-react';
import AuthModal from '../components/auth/AuthModal';
import EmailAccountsShowcase from '../components/landing/EmailAccountsShowcase';
import Navigation from '../components/landing/Navigation';

const Landing = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      {/* Hero Section */}
      <div className="relative pt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-purple-500/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center relative">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Find, Reach, & Win
              <br />
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                More Clients by Email
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Instantly helps you find warm leads, scale email campaigns, reach primary inboxes, engage smarter and win more with AI.
            </p>
          </div>
          <button
            onClick={() => setShowAuthModal(true)}
            className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-lg font-medium mb-8 transition-colors"
          >
            START FOR FREE
          </button>
          <div className="flex justify-center gap-12">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-blue-500" />
              <span className="text-gray-300">No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-blue-500" />
              <span className="text-gray-300">Free leads included</span>
            </div>
          </div>
        </div>
      </div>

      <EmailAccountsShowcase />

      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </div>
  );
};

export default Landing;