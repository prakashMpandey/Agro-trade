import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";
import {io} from "socket.io-client"
import dotenv from "dotenv"
import socket from ".././utils/socket.js"

dotenv.config()
const API_URL =process.env.API_URL;

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  message: "",
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: false,
   Auction_URL :process.env.Auction_URL,
   Admin_URL:process.env.Admin_URL,
    Info_URL:process.env.Info_URL,

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });


    try {

      const response=await axios.get(`${API_URL}/isLoggedIn`);

      set({user:response.data.data,isCheckingAuth:false,isAuthenticated:true})
    } catch (error) {
      set({
        error: error.message || "Failed to check authentication",
        isCheckingAuth: false,
        isAuthenticated: false,
      });
    }
  },


 
  signup: async (data) => {
    set({ isLoading: true, error: null });

    try {
      const { email, username, password, role } = data;
      const response = await axios.post(`${API_URL}/register`, {
        email,
        username,
        password,
        role,
      });

      console.log(response)

      if(response.status===200)
      {
        set({
          success:true,
          user: response.data.data.user,
          isAuthenticated: true,
          isLoading: false,
        });
  
        
        return {success:true,}

      }


    } catch (error) {
      set({
        error: error.response?.data?.message || "Error signing up",
        isLoading: false,
      });
      return {success:false,message:error.response?.data?.message}
     
    }
  },

 
  login: async (credentials) => {
    set({ isLoading: true, error: null,  });

    const { input, password } = credentials;

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ input, password }),
      });

      const receivedData = await response.json();

      if (response.ok && response.status === 200) {
        set({
          user: receivedData.data,
          isAuthenticated: true,
          isLoading: false,
        });
        toast.success("Login successful!");
        return true;

        
      } else {
        toast.error(receivedData.message || "Login failed");
        set({
          isLoading: false,
          isAuthenticated: false,
          user: null,
        });
        return false;
      }
    } catch (error) {
      set({
        error: error.message || "Error logging in",
        isLoading: false,
        user: null,
      });
      toast.error(error.message || "Error logging in");
      return false;
    }
  },

  verify_email: async (code) => {
    set({ isLoading: true, error: null, isAuthenticated: false });

    try {
      const response = await axios.post(`${API_URL}/verify-email`, { code });

      if (response.status !== 200) {
        throw new Error("Error verifying email");
      }

      set({
        user: response.data.user,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      });

      return ({success:true})
      
    } catch (error) {
      set({
        error:
          error.response?.data?.message || error.message || "Error verifying email",
        isLoading: false,
      });

      return ({success:false,message:error.response?.data?.message})
   
    }
  },


  setLoadingState: () => {
    set((state) => ({ isLoading: !state.isLoading }));
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok && response.status === 200) {
        set({
          isAuthenticated: false,
          user: null,
          isLoading: false,
        });

        socket.disconnect();
        toast.success("User logged out successfully!");
        return true;
      } else {
        toast.error("Failed to log out");
        set({ isLoading: false });
        return false;
      }
    } catch (error) {
      set({ isLoading: false });
      toast.error(error.message || "Error logging out");
      return false;
    }


  },
}));
