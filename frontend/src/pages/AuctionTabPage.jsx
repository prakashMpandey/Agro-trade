import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Gavel, History, Package, Megaphone } from 'lucide-react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '../../store/authStore';


const AuctionTabPage = () => {


  const [dashboardStats,setDashboardStats]=useState({});
  const navigate = useNavigate();
const {Auction_URL,isLoading}=useAuthStore();
  useEffect(()=>{
    const fetchDashboardStats=async()=>{
      const response=await axios.get(`${Auction_URL}/dashboard-stats`,{withCredentials:true});
      setDashboardStats(response.data.data);

      // console.log(response.data.data)
    }
    fetchDashboardStats();
  },[])
  const dashboardCards = [
    {
      title: 'Create Auction',
      description: 'List your agricultural products for auction',
      icon: <Gavel className="w-8 h-8" />,
      path: '/create-auction',
      color: 'from-green-400 to-green-600',
      hoverColor: 'hover:from-green-500 hover:to-green-700'
    },
    {
      title: 'My Listed Auctions',
      description: 'View and manage your created auctions',
      icon: <Package className="w-8 h-8" />,
      path: '/my-auctions',
      color: 'from-blue-400 to-blue-600',
      hoverColor: 'hover:from-blue-500 hover:to-blue-700'
    },
    {
      title: 'My Bids',
      description: 'Track all your bidding history',
      icon: <History className="w-8 h-8" />,
      path: '/my-bids',
      color: 'from-orange-400 to-orange-600',
      hoverColor: 'hover:from-orange-500 hover:to-orange-700'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Auction Dashboard
        </h1>
        <p className="text-lg text-gray-600">
          Manage your auctions and bids in one place
        </p>
      </div>

      {/* Quick Stats */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Auctions</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardStats.activeAuctions}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Gavel className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bids</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalBids}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Megaphone className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Won Auctions</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardStats.wonAuctions}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <History className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ongoing Bids</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardStats.ongoingBids}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <Megaphone className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Cards */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dashboardCards.map((card, index) => (
            <div
              key={index}
              onClick={() => navigate(card.path)}
              className={`
                bg-gradient-to-r ${card.color}
                hover:scale-105 transform transition-all duration-300
                ${card.hoverColor}
                rounded-xl shadow-lg overflow-hidden cursor-pointer
                group
              `}
            >
              <div className="p-8 text-white">
                <div className="flex items-center justify-between mb-6">
                  <div className="bg-white/20 p-4 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    {card.icon}
                  </div>
                  <div className="bg-white/20 rounded-full p-2 group-hover:translate-x-2 transition-transform duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
                <p className="text-white/80 text-lg">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuctionTabPage;
