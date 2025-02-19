import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { toast } from 'react-hot-toast';
import { Loader, Eye, EyeOff, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    input: '',
    password: '',
  });

  const { login, isLoading, user } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = await login(inputData);
      if (!loginUser) return;
      navigate(user.role === 'admin' ? '/admin' : '/home');
    } catch (error) {
      if (!error.message) {
        toast.error("Cannot log in now");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] -z-1"></div>
      <div className=" mx-auto  sm:px-6 md:px-8 px-4 h-screen flex items-center justify-center">
        <div className="max-w-md sm:max-w-2xl lg:max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200 overflow-hidden"
          >
            {/* Header */}
            <div className="px-8 pt-8 pb-6">
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
                Welcome back
              </h2>
              <p className="text-center text-gray-600">
                Enter your credentials to access your account
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-6">
              {/* Username/Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username or Email
                </label>
                <input
                  type="text"
                  name="input"
                  required
                  value={inputData.input}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your username or email"
                />
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between mb-2 ">
                  <label className="text-sm font-medium text-gray-700">
                    Password
                  </label>
                  
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    value={inputData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your password"
                  />
                 
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              <div className='text-right '>
                 <Link
                    to="/forgotPassword"
                    className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline"
                  >
                   <span className=''> Forgot password?</span>
                  </Link>
                 </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r  from-blue-600 via-teal-600 to-emerald-600  text-white font-medium py-3 rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <Loader className="animate-spin w-5 h-5" />
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    <span>Sign in</span>
                  </>
                )}
              </button>

              {/* Sign Up Link */}
              <p className="text-center text-gray-600">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="text-emerald-600 hover:text-emerald-700 hover:underline font-medium"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </motion.div>

          {/* Additional Info */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>By signing in, you agree to our</p>
            <div className="space-x-2">
              <Link to="/terms" className="text-emerald-600 hover:underline">Terms of Service</Link>
              <span>&</span>
              <Link to="/privacy" className="text-emerald-600 hover:underline">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
