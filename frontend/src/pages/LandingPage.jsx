import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Target,
  Award,
  Sprout,
  ShieldCheck,
  TrendingUp,
  Handshake,
  Scale,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Check,
  Star,
  BarChart3,
  Truck,
  Leaf
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Handshake className="w-6 h-6" />,
      title: 'Direct Farmer-Buyer Connection',
      description: 'Eliminate middlemen and trade directly with verified buyers and farmers.'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Live Price Discovery',
      description: 'Real-time bidding system ensures best market prices for your produce.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: 'Secure Transactions',
      description: 'Built-in escrow system and verified participants for safe trading.'
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: 'Logistics Support',
      description: 'Integrated transportation and storage solutions for seamless delivery.'
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Market Analytics',
      description: 'Access market trends, price history, and demand forecasts.'
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: 'Quality Assurance',
      description: 'Standardized quality checks and grading system for all products.'
    }
  ];

  


  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-teal-500 to-blue-500">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover mix-blend-overlay opacity-10"
            src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
            alt="Agriculture background"
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-8">
            India's Premier Agricultural<br />Auction Platform
          </h1>
          <p className="text-xl text-white/90 text-center max-w-3xl mx-auto mb-12">
            Empowering farmers with direct market access and fair prices through
            technology-driven auction solutions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate('/signup')}
              className="px-8 py-4 bg-white text-teal-600 rounded-lg font-medium hover:bg-teal-50 transition-colors duration-200"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate('/about us')}
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors duration-200"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>


     

      {/* Features Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide end-to-end solutions for agricultural trading, making it easier
              for farmers and buyers to connect and trade efficiently.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-gradient-to-r from-teal-100 to-blue-100 rounded-lg">
                    {React.cloneElement(feature.icon, { className: "w-6 h-6 text-teal-600" })}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 ml-3">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple and efficient process to get the best value for your agricultural produce
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Register & List',
                description: 'Create your account and list your products for auction'
              },
              {
                step: '02',
                title: 'Receive Bids',
                description: 'Get competitive bids from verified buyers across India'
              },
              {
                step: '03',
                title: 'Complete Trade',
                description: 'Accept the best bid and complete the secure transaction'
              }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-gradient-to-r from-teal-500 to-blue-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
                {index < 2 && (
                  <ArrowRight className="hidden md:block absolute top-6 -right-4 w-8 h-8 text-gray-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

    


      {/* CTA Section */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Join thousands of farmers and buyers already benefiting from our platform.
          </p>
          <button
            onClick={() => navigate('/signup')}
            className="px-8 py-3 bg-white text-teal-600 rounded-lg font-medium hover:bg-teal-50 transition-colors duration-200"
          >
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
