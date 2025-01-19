import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, CheckCircle2, XCircle, Timer, Eye, Edit, Trash2, Users } from 'lucide-react';
import axios from 'axios';
import { useAuthStore } from '../../store/authStore';
const MyListedAuctions = () => {
  const navigate = useNavigate();
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, active, completed, expired

  const {Auction_URL}=useAuthStore()
  // Sample data - replace with API call
  const sampleAuctions = [
    {
      _id: '1',
      productName: 'Premium Quality Wheat',
      quantity: '150',
      unit: 'quintal',
      basePrice: 2200,
      currentPrice: 2800,
      totalBids: 8,
      endTime: '2024-03-25T15:00:00',
      status: 'active',
      highestBidder: 'Rahul Traders',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3',
      description: 'High-protein wheat, perfect for commercial baking',
      createdAt: '2024-02-01T10:00:00'
    },
    {
      _id: '2',
      productName: 'Organic Rice',
      quantity: '80',
      unit: 'quintal',
      basePrice: 3000,
      currentPrice: 3500,
      totalBids: 12,
      endTime: '2024-02-20T18:00:00',
      status: 'completed',
      highestBidder: 'SK Enterprises',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3',
      description: 'Certified organic basmati rice',
      createdAt: '2024-01-15T14:30:00'
    },
    {
      _id: '3',
      productName: 'Fresh Tomatoes',
      quantity: '25',
      unit: 'quintal',
      basePrice: 1000,
      currentPrice: 800,
      totalBids: 3,
      endTime: '2024-02-15T12:00:00',
      status: 'expired',
      highestBidder: null,
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3',
      description: 'Farm-fresh tomatoes, grade A quality',
      createdAt: '2024-01-10T09:15:00'
    }
  ];

  useEffect(() => {
    fetchAuctions();
  }, [filter]);

  const fetchAuctions = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      


      const auctions=await axios.get(`${Auction_URL}/myAuctions${filter? `?filter=${filter}`:""}`,{
        withCredentials:"true"
      })

      console.log(auctions.data.data)
      // const filteredAuctions = filter === 'all' 
      //   ? sampleAuctions 
      //   : sampleAuctions.filter(auction => auction.status === filter);
      
      setAuctions(auctions.data.data);

    } catch (error) {
      console.error('Error fetching auctions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (auctionId) => {
    if (window.confirm('Are you sure you want to delete this auction?')) {
      // Add delete API call here
      console.log('Deleting auction:', auctionId);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'won': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <Clock className="w-5 h-5" />;
      case 'completed': return <CheckCircle2 className="w-5 h-5" />;
      case 'won': return <XCircle className="w-5 h-5" />;
      default: return <Timer className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Header with Create Button */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Listed Auctions</h1>
            <p className="text-lg text-gray-600">Manage your created auctions and track their progress</p>
          </div>
          <button
            onClick={() => navigate('/create-auction')}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            Create New Auction
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white rounded-lg shadow-sm p-4 flex flex-wrap gap-4">
          {[
            { value: 'all', label: 'All Auctions' },
            { value: 'active', label: 'Active' },
            { value: 'completed', label: 'Completed' },
            { value: 'won auctions', label: 'won auctions' }
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                filter === option.value
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Auctions Grid */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {auctions.map((auction) => (
              <div
                key={auction._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <img
                    src={auction.product.p_image}
                    alt={auction.productName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1.5 ${getStatusColor(auction.status)}`}>
                      {getStatusIcon(auction.status)}
                      {auction.status.charAt(0).toUpperCase() + auction.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {auction.product.p_name}
                  </h3>
                 
                  
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {auction.product.p_desc}
                    </p>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Quantity:</span>
                      <span className="text-gray-900">{auction.product.p_qty} {auction.unit}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Base Price:</span>
                      <span className="text-gray-900">₹{auction.basePrice}/{auction.unit||"quintal"}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Current Price:</span>
                      <span className={`font-medium ${
                        auction.highestBid > auction.basePrice ? 'text-green-600' : 'text-red-600'
                      }`}>
                        ₹{auction.highestBid}/{auction.unit || "quintal"}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Bids:</span>
                      <span className="text-gray-900 flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {auction.totalBids}
                      </span>
                    </div>

                    {auction.highestBidder && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Highest Bidder:</span>
                        <span className="text-gray-900">{auction.highestBidder.username}</span>
                      </div>
                    )}

                    <div className="pt-4 border-t flex justify-between items-center">
                      <button
                        onClick={() => navigate(`/auction/${auction._id}`)}
                        className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                      
                      <div className="flex gap-2">
                        {auction.status === 'active' && (
                          <button
                            onClick={() => navigate(`/edit-auction/${auction._id}`)}
                            className="p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(auction._id)}
                          className="p-2 text-gray-600 hover:text-red-600 transition-colors duration-200"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && auctions.length === 0 && (
          <div className="text-center py-12">
            <Timer className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No auctions found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {filter === 'all' 
                ? "You haven't created any auctions yet." 
                : `No ${filter} auctions found.`}
            </p>
            <button
              onClick={() => navigate('/create-auction')}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              Create Your First Auction
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListedAuctions;
