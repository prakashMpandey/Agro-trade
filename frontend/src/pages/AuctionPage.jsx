import React, { useEffect, useState } from "react";
import ProductDesc from "../components/productDesc";
import RecomendedAuction from "../components/RecomendedAuction";

import { useParams } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";
import socket from "../../utils/socket.js"
import LoadingPage from "./loadingPage.jsx";

const AuctionPage = () => {
  const [bids, setBids] = useState([]);
  const [auctionData, setAuctionData] = useState({});
  const { isLoading, setLoadingState, Auction_URL } = useAuthStore();
  const [watchingUsers,setWatchingUsers]=useState();
  const [timeLeft, setTimeLeft] = useState('');
  const { auctionId } = useParams();

  // Calculate time remaining
  const calculateTimeLeft = () => {
    if (!auctionData.endTime) return;

    const endTime = new Date(auctionData.endTime).getTime();
    const currentTime = new Date().getTime();
    const difference = endTime - currentTime;

    if (difference > 0) {
      const hours = Math.floor(difference / (1000 * 60 * 60)).toString().padStart(2, '0');
      const minutes = Math.floor((difference / (1000 * 60)) % 60).toString().padStart(2, '0');
      const seconds = Math.floor((difference / 1000) % 60).toString().padStart(2, '0');
      setTimeLeft(`${hours}:${minutes}:${seconds}`);
    } else {
      setTimeLeft('Auction Ended');
    }
  };

  // Sort bids for leaderboard
  const getTopBidders = () => {



    return [...bids]
      .sort((a, b) => b.bid_amount - a.bid_amount)
      .slice(0, 6);
  };

  //fetch all bids

  const fetchAllBids = async () => {
    try {
      const response = await fetch(`${Auction_URL}/getAllPlacedBids/${auctionId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
  
      if (response.ok && response.status === 200) {
        const data = await response.json();
        setBids(data.data || []);
      }
      else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error fetching bid history:", error);
      toast.error("Failed to load bid history");
    }
  }

  const fetchAuctionData = async () => {
    const response = await fetch(`${Auction_URL}/getAuction/${auctionId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.ok && response.status === 200) {
      const receivedData = await response.json();
      setAuctionData(receivedData.data);
    }
  }

  //socket connection bilkul nhi chhoona


  useEffect(() => {
    if(!socket.connected) {
      socket.connect();
    }

    const handleSocketConnect = () => {
      console.log("socket connected successfully");
    };

    const handleDisconnect = () => {
      console.log("Socket disconnected");
    };

    const handleBids = async (bid) => {
      if (bid.status && bid.status === 400) {
        return;
      } 
       
      setBids((prevBids) =>{
        const isDuplicate = prevBids.some((b) => b._id === bid._id); 

        if (isDuplicate){
          return prevBids;
        }
  
        return [...prevBids,bid.data]
      });
    };

    const handleWatching = async(data) => {
      // console.log("watchingUsers",data.watchingUsers)
    }

    socket.on("connect", handleSocketConnect);
    socket.on("new bid", handleBids);
    socket.on("disconnect", handleDisconnect);
    socket.on("watchingUsers", (data) => {
      setWatchingUsers(data.watchingUsers);
    });

    setLoadingState()

    return () => {
      socket.off("connect", handleSocketConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("new bid", handleBids);
      socket.off("watchingUsers")
    };
  }, []);

  useEffect(() => {
    fetchAuctionData();
  }, [bids]);


  useEffect(() => {
    const initializeData = async () => {
      await fetchAuctionData();
      await fetchAllBids();
    };
    
    initializeData();
  }, []);


  useEffect(() => {
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [auctionData.endTime]);

  const [bidAmount, setBidAmount] = useState(1000);

  const handlePlaceBid = () => {
    setLoadingState();
    socket.emit("placeBid", { auctionId: auctionId, bidAmount: bidAmount });
  };

  //AFTER PLACING BID ISKO BHI NAHI CHHONE KA
  useEffect(() => {
    socket.on("placeBid", (data) => {
      if (data?.status === 200) {
        // console.log("Bid Placed Successfully:", data);
        toast.success(data?.message || "bid placed successfully",{delay:100});
        setLoadingState()
      } else {
        toast.error(data?.message);
        setLoadingState()
      }
    });

    return () => {
      socket.off("placeBid");
    };
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      {/* Main Container */}
      <div className="max-w-screen-xl mx-auto flex flex-col-reverse sm:grid sm:grid-cols-3 gap-8">
        {/* Left Section: Leaderboard */}
        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-700">
              Top Bidders
            </h2>
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full transition-all duration-300 animate-pulse">
              Live Updates
            </span>
          </div>
          <div className="space-y-4">
            {getTopBidders().map((bid, index) => (
              <div
                key={bid.bidder._id}
                className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <span className={`w-8 h-8 flex items-center justify-center rounded-full ${
                    index === 0 ? 'bg-yellow-400' : 
                    index === 1 ? 'bg-gray-300' : 
                    index === 2 ? 'bg-amber-600' : 'bg-gray-200'
                  } text-white font-bold`}>
                    #{index + 1}
                  </span>
                  <p className="text-gray-700 font-medium">{bid.bidder.username}</p>
                </div>
                <p className="text-gray-900 font-semibold">₹{bid.bid_amount}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section: Auction Details */}
        <div className="col-span-2 bg-white shadow-md rounded-lg p-6">
          {/* Header */}
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Live Auction Room
          </h2>

          {/* Current Bid Section */}
          <div className="text-center mb-6">
            <h2 className="text-4xl font-extrabold text-blue-500 transition-all duration-600 ease-in-out animate-pulse">
              Current Bid: ₹{auctionData.highestBid}
            </h2>
            <h3 className="text-lg font-medium text-gray-600 mt-4">
              Time Left:{" "}
              <span className="font-bold text-red-500">{timeLeft}</span>
            </h3>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6 hover:shadow-md transition-shadow duration-300">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <p className="font-medium text-gray-700">
                  Starting Bid:{" "}
                  <span className="font-normal text-lg">
                    ₹{auctionData.basePrice}
                  </span>
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-medium text-gray-700">
                  Total Bids:{" "} 
                  <span className="font-normal text-lg">{auctionData.totalBids}</span>
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-medium text-gray-700">
                  Bid Increment:{" "}
                  <span className="font-normal text-lg">₹{auctionData.bidIncrement || 100}</span>
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-medium text-gray-700">
                  Watching:{" "}
                  <span className="font-normal text-lg">{watchingUsers}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              className="w-full max-w-xs p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter your bid amount"
            />
            <button
              onClick={handlePlaceBid}
              disabled={isLoading}
              className="bg-blue-500 w-full max-w-xs text-white font-medium py-3 px-6 rounded-md hover:bg-blue-600 transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader className="animate-spin mx-auto"/> : "Place Bid"}
            </button>
          </div>
        </div>
      </div>

      {/* {auctionData.product && <ProductDesc data={auctionData.product}/>} */}
 
    </div>
  );
};

export default AuctionPage;
