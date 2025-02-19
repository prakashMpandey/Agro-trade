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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] -z-1"></div>
      <div className="container mx-auto px-4 flex items-center justify-center">
        <div className="w-full max-w-md -mt-16">
          {!isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200 overflow-hidden"
            >
              <div className="px-8 pt-8 pb-6">
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
                  Forgot Password
                </h2>
                <p className="text-center text-gray-600">
                  Enter your email to receive password reset instructions.
                </p>
              </div>

              {errorMessage && (
                <div className="px-8 mb-4 text-red-600 text-center text-sm font-medium">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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
                    className="w-full focus:outline-none px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 text-white font-medium py-3 rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader className="animate-spin w-5 h-5" />
                  ) : (
                    "Send Reset Link"
                  )}
                </button>

                <div className="text-center">
                  <Link
                    to="/signin"
                    className="text-emerald-600 hover:text-emerald-700 hover:underline font-medium"
                  >
                    Back to Login
                  </Link>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200 overflow-hidden p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
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
                  className="text-emerald-600 hover:text-emerald-700 hover:underline font-medium"
                >
                  Go to Login
                </Link>
              </div>
              <div className="mt-4 text-center" onClick={(e) => setSubmit(!isSubmitted)}>
                <Link
                  to="/forgotPassword"
                  className="text-gray-500 hover:text-gray-700 hover:underline transition-all"
                >
                  Didn't receive the email? Try again
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
