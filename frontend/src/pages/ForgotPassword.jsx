import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../../store/authStore";
import { Loader } from "lucide-react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:4000/api/v1/user";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { isLoading, setLoadingState } = useAuthStore();
  const [isSubmitted, setSubmit] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingState();

    try {
      const response = await fetch(`${API_URL}/forgot-password`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email }),
      });

      const receivedData = await response.json();

      if (response.status === 200 && response.ok) {
        setSuccessMessage(
          "We've sent you a password reset link! Please check your email and follow the instructions to reset your password."
        );
        setErrorMessage("");
        setSubmit(true);
        setEmail("")
        setLoadingState();
      } else {
        setEmail("")
        setErrorMessage(receivedData.message);
        setLoadingState();
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again later.");
      setLoadingState();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-teal-500 to-green-500"
    >
      {!isSubmitted ? (
        <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-2xl">
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Forgot Password
          </h2>
          <p className="text-sm text-gray-600 text-center mt-2 mb-6">
            Enter your email to receive password reset instructions.
          </p>

          {errorMessage && (
            <div className="mb-4 text-red-600 text-center text-sm font-medium">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@domain.com"
                className="w-full mt-2 px-4 py-3 border rounded-lg shadow-sm text-gray-800 focus:ring-2 focus:ring-teal-400 focus:outline-none transition-all duration-300"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center px-4 py-3 font-semibold text-white rounded-lg shadow-md transition-all duration-300 ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-teal-500 hover:bg-teal-600 transform hover:scale-105"
              }`}
            >
              {isLoading ? (
                <Loader className="animate-spin" size={20} />
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>

          <div className="mt-4 text-center">
            <Link
              to="/signin"
              className="text-teal-500 hover:text-teal-600 hover:underline transition-all"
            >
              Back to Login
            </Link>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md p-8 bg-white shadow-lg rounded-2xl"
        >
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
            Reset Link Sent!
          </h2>
          {successMessage && (
            <div className="mb-6 text-green-600 text-center text-sm font-medium">
              {successMessage}
            </div>
          )}
          <p className="text-gray-600 text-center mb-6">
            Check your inbox and follow the link to reset your password. If you
            don't see the email, make sure to check your spam folder.
          </p>
          <div className="mt-6 text-center">
            <Link
              to="/signin"
              className="text-teal-500 hover:text-teal-600 hover:underline transition-all"
            >
              Go to Login
            </Link>
          </div>
          <div className="mt-4 text-center" onClick={(e)=>{
            setSubmit(!isSubmitted) 
        }}>
            <Link
              to="/forgotPassword"
              className="text-gray-500 hover:text-gray-700 hover:underline transition-all"
            >
              Didn't receive the email? Try again
            </Link>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ForgotPassword;
