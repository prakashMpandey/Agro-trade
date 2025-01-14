import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
const API_URL = "http://localhost:4000/api/v1/user";
import toast from 'react-hot-toast';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const[showPassword,setShowPassword]=useState(false);
const {isLoading,setLoadingState}=useAuthStore();

  const {token}=useParams()
  const navigate=useNavigate();


  

  const handleSubmit = async (e) => {
    e.preventDefault();



    setError('');

    // Validation
    if (!newPassword || !confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    
    try {
      setLoadingState()
  
      console.log(newPassword)
      const response=await fetch(`${API_URL}/reset-password/${token}`,{
        method:"post",
        headers:{"content-type":"application/json"},
        credentials:"include",
        body:JSON.stringify({password:newPassword})
      })
  
      const receivedData=await response.json()
      if(!(response.ok && response.status===200))
      {
        setError(receivedData.message);
        setLoadingState()
        return;
  
      }
  
      toast.success(receivedData.message,'redirecting to login page...');
     
      setTimeout(() => {
        navigate("/signin")
        setLoadingState()
      }, 2000);
    } catch (error) {
      
      console.log(error)
      setLoadingState()
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-bl from-indigo-500 via-purple-500 to-pink-500"
    >
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4 text-center">
          Reset Password
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter your new password below.
        </p>

        {error && (
          <div className="text-red-600 text-sm font-medium text-center mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              required
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full mt-2 px-4 py-3 border rounded-lg shadow-sm text-gray-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all duration-300"
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
              className="w-full mt-2 px-4 py-3 border rounded-lg shadow-sm text-gray-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all duration-300"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center items-center px-4 py-3 font-semibold text-white rounded-lg shadow-md transition-all duration-300 ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 transform hover:scale-105'
            }`}
          >
            {isLoading ? (
              <Loader className="animate-spin" size={20} />
            ) : (
              'Reset Password'
            )}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default ResetPassword;
