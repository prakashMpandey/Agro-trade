import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { Navigate } from 'react-router-dom';
import {Loader} from "lucide-react"
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


      await signup(data);
      navigate("/verify-email");
    

      
      
    } catch (error) {
      console.log(error)
    }
  };

  const [showPassword, setShowPassword] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-orange-400 via-yellow-500 to-green-500"
    >
      <div className="w-full max-w-sm p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={handleChange}
              value={data.username}
              placeholder="Enter your username"
              className="w-full px-4 py-3 border rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              onChange={handleChange}
              name="email"
              value={data.email}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Role
            </label>
            <select
              id="role"
              onChange={handleChange}
              name="role"
              value={data.role}
              className="w-full px-4 py-3 border rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            >
              <option value="Farmer">Farmer</option>
              <option value="Business">Business</option>
            </select>
          </div>

          <div className="mb-4 relative">
  <label
    htmlFor="password"
    className="block text-sm font-medium text-gray-700 mb-2"
  >
    Password
  </label>
  <div className="relative">
    <input
       onChange={handleChange}
              name="password"
              value={data.password}
      type={showPassword?"text":"password"}
      id="password"
      placeholder="Enter your password"
      className="w-full px-4 py-3 border rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
    />
    <span
      className="absolute capitalize inset-y-0 right-4 flex items-center text-blue-500 cursor-pointer font-semibold hover:text-blue-700 transition-all ease-in duration-7500"
     onClick={()=>{setShowPassword(!showPassword)}}>
     
     {showPassword ? (
            <span className="opacity-100 transition-opacity duration-300">Hide</span>
          ) : (
            <span className="opacity-100 transition-opacity duration-300">Show</span>
          )}
      
    </span>
  </div>
</div>

{error&& <div className="text-red-500 font-semibold mt-2">{error}</div>}

           

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-emerald-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-emerald-800 hover:scale-105 transition transform duration-300 "
          >
           {isLoading? <Loader className="animate-spin mx-auto " size={24} />: "Sign Up"} 
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/signin" className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default SignupPage;
