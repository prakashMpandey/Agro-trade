import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';

const Card = (props) => {
  const { user } = useAuthStore();
  const [timeLeft, setTimeLeft] = useState('');
  const navigate = useNavigate();

  const calculateTime = () => {
    const endTime = new Date(props.auction.endTime).getTime();
    const currentTime = new Date().getTime();
    const difference = endTime - currentTime;

    if (difference > 0) {
      const hours = Math.floor((difference / (60 * 60 * 1000)) % 24).toString().padStart(2, '0');
      const minutes = Math.floor((difference / (60 * 1000)) % 60).toString().padStart(2, '0');
      const seconds = Math.floor((difference / 1000) % 60).toString().padStart(2, '0');
      setTimeLeft(`${hours}:${minutes}:${seconds}`);
    } else {
      setTimeLeft("Auction ended");
    }
  };

  const handleBid = (e) => {
    navigate(`/auction/${props.auction._id}`);
  };

  const handleProductDetails = () => {
    navigate(`/product/${props.auction._id}`);
  };

  useEffect(() => {
    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

 return (

  
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Image Section */}
      <div 
        className="relative h-48 cursor-pointer overflow-hidden"
        onClick={handleProductDetails}
      >
        <img
          src={props.auction.product.p_image || "https://www.peptechbio.com/wp-content/uploads/2023/03/Wheat_photo-cred-Adobe-stock_E-2.jpg"}
          alt={props.auction.product.p_name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-full">
            <span className="mr-1 h-2 w-2 bg-white rounded-full animate-pulse"></span>
            Live
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <h2 
          className="text-xl font-bold text-gray-800 mb-2 capitalize cursor-pointer hover:text-blue-600"
          onClick={handleProductDetails}
        >
          {props.auction.product.p_name}
        </h2>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {props.auction.product.p_desc || "Bid now to get organic wheat straight from the farm, the finest quality."}
          <span 
            className="text-blue-500 hover:text-blue-700 cursor-pointer ml-1"
            onClick={handleProductDetails}
          >
            read more
          </span>
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4 bg-gray-50 p-4 rounded-lg">
          <div>
            <p className="text-gray-500 text-xs">Current Bid</p>
            <p className="text-lg font-bold text-green-600">₹{props.auction.basePrice || "₹5000/quintal"} quintal</p>
          </div>
          <div className="text-right">
            <p className="text-gray-500 text-xs">Time Left</p>
            <p className={`text-lg font-bold ${timeLeft === "Auction ended" ? "text-red-600" : "text-blue-600"}`}>
              {timeLeft}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleBid}
          className="w-full bg-blue-600 text-white font-semibold rounded-lg py-2.5 px-4 hover:bg-blue-700 
                   transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
        >
          <span>view details</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Card;