import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import {toast} from 'react-hot-toast';
import { Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const SignInPage = () => {

  const navigate=useNavigate()
  const [inputData, setInputData] = useState({
    input: '',
    password: '',
  });

  const {login,isLoading,error}=useAuthStore()

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputData({ ...inputData, [name]: value });
  };

  const handleSubmit =async (e) => {
   
    e.preventDefault()

    console.log(inputData)
    try {
      const loginUser=await login(inputData)

      if(!loginUser)
      {
        return;
      }

      navigate('/home');
      return;
      
    } 
    
    catch (error) { 
     toast.error("cannot log in now")
    }
  
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 via-teal-500 to-blue-600 bg-opacity-90"
    >
      <div className="w-full max-w-sm p-8 bg-white shadow-2xl rounded-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Welcome</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username / Email
            </label>
            <input
              type="text"
              id="username"
              name="input"
              required={true}
              value={inputData.input}
              onChange={handleChange}
              placeholder="Enter your email or username"
              className="w-full px-4 py-3 border rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                required={true}
                value={inputData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-4 flex items-center text-blue-500 cursor-pointer font-semibold hover:text-blue-700 transition-all duration-300 ease-in-out"
              >
                {showPassword ? 'Hide' : 'Show'}
              </span>
            </div>
            <p className="mt-2 text-right text-sm">
              <Link
                to="/forgotPassword"
                className="text-blue-500 hover:text-blue-700 hover:underline"
              >
                Forgot your password?
              </Link>
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-emerald-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-emerald-700 hover:scale-105 transition-transform duration-300"
          >
           {isLoading? <Loader className="animate-spin mx-auto " size={24} />: "Sign in"} 
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:text-blue-700 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default SignInPage;
