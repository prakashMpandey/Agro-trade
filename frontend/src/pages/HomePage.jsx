import React, { useEffect, useState } from 'react';
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import Card from "../components/Card.jsx";
import ContactDetailsModal from '../components/ContactDetailsModal';
import InfoCard from '../components/InfoCard';
import LoadingPage from './LoadingPage.jsx';

const controller = new AbortController();
const signal = controller.signal;

const HomePage = () => {
  const navigate = useNavigate();
  const { isLoading, logout, Auction_URL, user, setLoadingState } = useAuthStore();
  const [auctions, setAuctions] = useState([]);
  const [isContactDetailsModalOpen, setIsContactDetailsModalOpen] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {

       
        if (!user.contact) {
          setIsContactDetailsModalOpen(true);
        }
        
        setLoadingState();
        const response = await fetch(`${Auction_URL}/getAllauctions`, {
          method: "GET",
          credentials: "include",
          signal
        });

        if (!response.ok) {
          toast.error("Something went wrong");
          return;
        }

        const data = await response.json();
        setAuctions(data.data);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error("Error fetching auctions:", error);
          toast.error("An error occurred. Please try again.");
        }
      } finally {
        setLoadingState();
      }
    };

    fetchItems();
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="mt-3 bg-white shadow-xl shadow-gray-100 rounded-lg mx-auto max-w-6xl p-4 md:p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 space-y-4 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 text-transparent bg-clip-text">
              Turn Your Harvest Into Prosperity
            </h1>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              Join thousands of successful farmers who are maximizing their profits through direct selling. Our marketplace ensures you get the best value for your produce while maintaining complete control over your sales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <div className="flex items-center justify-center gap-2 text-emerald-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Better Prices</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-emerald-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Direct Sales</span>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full md:w-auto">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-gradient-to-br from-emerald-50 to-blue-50 p-2">
              <img
                src="tractor.jpeg"
          
                alt="Happy farmer with successful harvest"
                className="object-cover w-full h-full rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 my-6 md:my-8 px-4">
        <button 
          onClick={()=>navigate("/market")} className="w-full sm:w-48 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold flex items-center justify-center gap-2"
        >
          <span>Start Buying</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
        <button 
         onClick={()=>{navigate("/create-auction")}} className="w-full sm:w-48 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold flex items-center justify-center gap-2"
        >
          <span>Start Selling</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>

      {/* Products Section */}
      <div className="bg-white max-w-6xl mx-auto p-4 md:p-8 rounded-lg shadow-lg mb-8">
        <div className="border-b border-gray-200 pb-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Featured Products
          </h2>
        </div>
        

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {auctions.map((auction) => (
    <Card auction={auction} key={auction._id} />
  ))}
{/* <Card auction={auctions[0]}/>
<Card auction={auctions[0]}/>
<Card auction={auctions[0]}/> */}


        </div>
      </div>
      <div className="bg-white max-w-6xl mx-auto p-4 md:p-8 rounded-lg shadow-lg mb-8">
        <div className="border-b border-gray-200 pb-4 mb-6">
        <p className="text-lg text-gray-600">
          Discover latest farming schemes, techniques, and equipment information
        </p>
        </div>
        

        <div className="">

{/* <Card auction={auctions[0]}/>
<Card auction={auctions[0]}/>
<Card auction={auctions[0]}/> */}
<InfoCard/>

        </div>
      </div>

      <ContactDetailsModal
        isOpen={isContactDetailsModalOpen}
        onClose={() => setIsContactDetailsModalOpen(false)}
      />
    </div>
  );
};

export default HomePage;