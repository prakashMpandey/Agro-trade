import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { Navigate } from 'react-router-dom';
import {Loader,Eye,EyeOff} from "lucide-react"
import toast from 'react-hot-toast';
const SignupPage = () => {

  const [data,setData]=useState({
    username:"",
    email:"",
    password:"",
    role:"farmer"
  })

  const {signup,error,isLoading}=useAuthStore();
  const navigate=useNavigate();


  const handleChange=(e)=>{

    const name=e.target.name;
    const value=e.target.value;

    setData({...data,[name]:value})

  }
  const handleSignUp = async(e) => {
    e.preventDefault();

    try {


      const response=await signup(data);


      if(response.success)
      {
        navigate("/verify-email");

      }
    
      toast.error(response.message,{position:"top-center"})
    

      
      
    } catch (error) {
      console.log(error)
    }
  };

  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] -z-1"></div>
      <div className=" mx-auto px-4 flex items-center justify-center ">
        <div className="w-full max-w-md mt-5 mb-5 ">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200 overflow-hidden"
          >
            {/* Header */}
            <div className="px-8 pt-8 pb-6">
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
                Create your account
              </h2>
              <p className="text-center text-gray-600">
                Join our community of farmers and traders
              </p>
            </div>

            <form onSubmit={handleSignUp} className="px-8 pb-8 space-y-6">
              {/* Username Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={data.username}
                  required
                  minLength={3}
                  maxLength={16}
                  pattern="^[a-zA-Z0-9]+$"
                  title="Username must be 3-16 characters long and can only contain letters and numbers"

                  onChange={handleChange}
                  className="w-full focus:outline-none px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  placeholder="Choose a username"
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  required
                  pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                  title="Please enter a valid email address"
                  onChange={handleChange}
                  className="w-full focus:outline-none px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  I am a
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="relative">
                    <input
                      type="radio"
                      name="role"
                      value="farmer"
                      checked={data.role === 'farmer'}
                      onChange={handleChange}
                      className="peer sr-only focus:outline-none"
                    />
                    <div className="w-full text-center px-4 py-3 rounded-xl border border-gray-200 cursor-pointer transition-all duration-200
                      peer-checked:border-emerald-500 peer-checked:bg-emerald-50 peer-checked:text-emerald-600
                      hover:border-emerald-500/50">
                      Farmer
                    </div>
                  </label>
                  <label className="relative">
                    <input
                      type="radio"
                      name="role"
                      value="business"
                      checked={data.role === 'business'}
                      onChange={handleChange}
                      className="peer sr-only focus:outline-none"
                      required
                    />
                    <div className="w-full text-center px-4 py-3 rounded-xl border border-gray-200 cursor-pointer transition-all duration-200
                      peer-checked:border-emerald-500 peer-checked:bg-emerald-50 peer-checked:text-emerald-600
                      hover:border-emerald-500/50">
                      Business
                    </div>
                  </label>
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    minLength={8}
                    maxLength={16}
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$"
                    title="Password must be 8-16 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character"
                  
                    value={data.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ?<Eye/> :  <EyeOff/>}
                  </button>
                </div>
              </div>

              {/* {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 rounded-xl">
                  {error}
                </div>
              )} */}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 via-teal-600 to-emerald-600 text-white font-medium py-3 rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <Loader className="animate-spin w-5 h-5" />
                ) : (
                  "Create Account"
                )}
              </button>

              {/* Sign In Link */}
              <p className="text-center text-gray-600">
                Already have an account?{' '}
                <Link
                  to="/signin"
                  className="text-emerald-600 hover:text-emerald-700 hover:underline font-medium"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
