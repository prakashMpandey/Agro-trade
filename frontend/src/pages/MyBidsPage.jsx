import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, CheckCircle2, XCircle, Timer, ArrowUpCircle, TrendingUp, BadgeIndianRupee } from 'lucide-react';
import axios from 'axios';
import { useAuthStore } from '../../store/authStore';
const MyBids = () => {
  const navigate = useNavigate();
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const { Auction_URL } = useAuthStore();

  useEffect(() => {
    // Reset bids and page when filter changes
    setBids([]);
    setPage(1);
    setHasMore(true);
    fetchBids(1, true);
  }, [filter]);

  const fetchBids = async (pageNum, isNewFilter = false) => {
    try {
      if (isNewFilter) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const response = await axios.get(`${Auction_URL}/myBids?page=${pageNum}`);
      
      const newBids = response.data.data;
      setHasMore(response.data.hasMore);

      if (isNewFilter) {
        setBids(newBids);
      } else {
        setBids(prev => [...prev, ...newBids]);
      }
    } catch (error) {
      console.error('Error fetching bids:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchBids(nextPage);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'inactive': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <Clock className="w-5 h-5" />;
      case 'inactive': return <CheckCircle2 className="w-5 h-5" />;
      default: return <Timer className="w-5 h-5" />;
    }
  };

  const getRankColor = (rank) => {
    if (rank === 1) return 'text-green-600';
    if (rank <= 3) return 'text-blue-600';
    return 'text-gray-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bids</h1>
        <p className="text-lg text-gray-600">Track all your bids and their current status</p>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white rounded-lg shadow-sm p-4 flex flex-wrap gap-4">
          {[
            { value: 'all', label: 'All Bids' },
            { value: 'active', label: 'Active Bids' },
            { value: 'inactive', label: 'inactive bids' },
           
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

      {/* Bids Grid */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bids.map((bid) => (
                <div
                  key={bid._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative h-48">
                    <img
                      src={bid.auction.product.p_image}
                      alt={bid.auction.product.p_name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1.5 ${getStatusColor(bid.auction.status)}`}>
                        {getStatusIcon(bid.auction.status)}
                        {bid.auction.status.charAt(0).toUpperCase() + bid.auction.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {bid.auction.product.p_name}
                    </h3>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Farmer:</span>
                        <span className="text-gray-900">{bid.auction.farmer.username}</span>
                      </div>

                      {/* <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Location:</span>
                        <span className="text-gray-900">{bid.farmer.location}</span>
                      </div> */}

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Quantity:</span>
                        <span className="text-gray-900">{bid.auction.product.p_qty} {bid.auction.product.p_unit}</span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Your Bid:</span>
                        <span className="text-gray-900 font-medium flex items-center gap-1">
                          <BadgeIndianRupee className="w-4 h-4" />
                          {bid.bid_amount}/{bid.auction.product.p_unit || "quintal"}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Highest Bid:</span>
                        <span className={`font-medium flex items-center gap-1 ${
                          bid.auction.highestBid > bid.yourBid ? 'text-red-600' : 'text-green-600'
                        }`}>
                          <TrendingUp className="w-4 h-4" />
                          ₹{bid.auction.highestBid}/{bid.auction.p_unit || "quintal"}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Bid Date:</span>
                        <span className="text-gray-900">
                          {new Date(bid.bid_time).toLocaleDateString('en-us', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>

                      {/* <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Your Rank:</span>
                        <span className={`font-medium ${getRankColor(bid.yourRank)}`}>
                          #{bid.yourRank} of {bid.totalBids}
                        </span>
                      </div> */}

                      {bid.auction.status === 'active' && (
                        <div className="pt-4 border-t">
                          <button
                            onClick={() => navigate(`/auction/${bid.auction._id}`)}
                            className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center justify-center gap-2"
                          >
                            <ArrowUpCircle className="w-4 h-4" />
                            Update Bid
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 disabled:bg-green-300"
                >
                  {loadingMore ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Loading...
                    </div>
                  ) : (
                    'Load More'
                  )}
                </button>
              </div>
            )}
          </>
        )}

        {!loading && bids.length === 0 && (
          <div className="text-center py-12">
            <Timer className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No bids found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {filter === 'all' 
                ? "You haven't placed any bids yet." 
                : `No ${filter} bids found.`}
            </p>
            <button
              onClick={() => navigate('/auctions')}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              Browse Auctions
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBids;