import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldX, ArrowLeft } from 'lucide-react';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="animate-bounce-slow">
          <ShieldX className="w-24 h-24 mx-auto text-red-500 mb-8" />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
          Access Denied
        </h1>
        
        <p className="text-lg text-gray-600 mb-8 animate-fade-in">
          Sorry, you don't have permission to access this page. Please contact an administrator if you think this is a mistake.
        </p>
        
        <div className="space-y-4 animate-fade-in">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
          
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => navigate('/home')}
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              Go to Home
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={() => navigate('/contact-us')}
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage; 