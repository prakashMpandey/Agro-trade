import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle2, XCircle, Timer, ArrowUpCircle } from 'lucide-react';

const ParticipatedAuctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, active, won, lost

  // Sample data - replace with API call
  const sampleAuctions = [
    {
      _id: '1',
      productName: 'Organic Wheat',
      farmer: {
        name: 'Ramesh Kumar',
        location: 'Punjab'
      },
      quantity: '100',
      unit: 'quintal',
      basePrice: 2500,
      currentPrice: 2800,
      yourBid: 2750,
      endTime: '2024-03-25T15:00:00',
      status: 'active',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3'
    },
    {
      _id: '2',
      productName: 'Basmati Rice',
      farmer: {
        name: 'Suresh Patel',
        location: 'Haryana'
      },
      quantity: '50',
      unit: 'quintal',
      basePrice: 3500,
      currentPrice: 4000,
      yourBid: 4000,
      endTime: '2024-02-20T18:00:00',
      status: 'won',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3'
    },
    {
      _id: '3',
      productName: 'Fresh Tomatoes',
      farmer: {
        name: 'Amit Singh',
        location: 'Maharashtra'
      },
      quantity: '20',
      unit: 'quintal',
      basePrice: 1200,
      currentPrice: 1500,
      yourBid: 1300,
      endTime: '2024-02-15T12:00:00',
      status: 'lost',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3'
    }
  ];

  useEffect(() => {
    fetchAuctions();
  }, [filter]);

  const fetchAuctions = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const filteredAuctions = filter === 'all' 
        ? sampleAuctions 
        : sampleAuctions.filter(auction => auction.status === filter);
      
      setAuctions(filteredAuctions);
    } catch (error) {
      console.error('Error fetching auctions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'won': return 'bg-green-100 text-green-800';
      case 'lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <Clock className="w-5 h-5" />;
      case 'won': return <CheckCircle2 className="w-5 h-5" />;
      case 'lost': return <XCircle className="w-5 h-5" />;
      default: return <Timer className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Participated Auctions
        </h1>
        <p className="text-lg text-gray-600">
          Track all your auction participations and their outcomes
        </p>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white rounded-lg shadow-sm p-4 flex flex-wrap gap-4">
          {[
            { value: 'all', label: 'All Auctions' },
            { value: 'active', label: 'Active Bids' },
            { value: 'won', label: 'Won Auctions' },
            { value: 'lost', label: 'Lost Auctions' }
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
                    src={auction.image}
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
                    {auction.productName}
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Farmer:</span>
                      <span className="text-gray-900 font-medium">{auction.farmer.name}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Location:</span>
                      <span className="text-gray-900">{auction.farmer.location}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Quantity:</span>
                      <span className="text-gray-900">{auction.quantity} {auction.unit}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Your Bid:</span>
                      <span className="text-gray-900 font-medium">₹{auction.yourBid}/{auction.unit}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Current Price:</span>
                      <span className={`font-medium ${
                        auction.currentPrice > auction.yourBid ? 'text-red-600' : 'text-green-600'
                      }`}>
                        ₹{auction.currentPrice}/{auction.unit}
                      </span>
                    </div>

                    {auction.status === 'active' && (
                      <div className="flex justify-between items-center pt-3 border-t">
                        <span className="text-sm text-gray-600">Time Left:</span>
                        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center gap-2">
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
        )}

        {!loading && auctions.length === 0 && (
          <div className="text-center py-12">
            <Timer className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No auctions found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {filter === 'all' 
                ? "You haven't participated in any auctions yet." 
                : `No ${filter} auctions found.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParticipatedAuctions; 