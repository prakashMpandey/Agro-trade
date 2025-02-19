import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import { BarChart3, TrendingUp, Package, DollarSign, Users, Clock } from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';
import axios from 'axios';
import TableSkeleton from '../../components/LoadingSkeleton/TableSkeleton';
import { toast } from 'react-hot-toast';

const Auctions = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [recentAuctions, setRecentAuctions] = useState([]);
  const { Admin_URL } = useAuthStore();

  useEffect(() => {
    const fetchAuctionAnalytics = async () => {
      try {
        const response = await axios.get(`${Admin_URL}/auction-analytics`, {
          withCredentials: true
        });
        setStats(response.data.data.stats);
        setRecentAuctions(response.data.data.recentAuctions);
      } catch (error) {
        toast.error('Failed to fetch auction analytics');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuctionAnalytics();
  }, []);

  const statsCards = [
    {
      title: 'Total Auctions',
      value: stats?.totalAuctions || 0,
      icon: <Package className="w-6 h-6" />,
      color: 'bg-blue-500',
      trend: '+12%'
    },
    {
      title: 'Active Auctions',
      value: stats?.activeAuctions || 0,
      icon: <Clock className="w-6 h-6" />,
      color: 'bg-green-500',
      trend: '+5%'
    },
    {
      title: 'Total Revenue',
      value: `₹${(stats?.totalRevenue || 0).toLocaleString()}`,
      icon: <DollarSign className="w-6 h-6" />,
      color: 'bg-purple-500',
      trend: '+18%'
    },
    {
      title: 'Total Participants',
      value: stats?.totalParticipants || 0,
      icon: <Users className="w-6 h-6" />,
      color: 'bg-orange-500',
      trend: '+8%'
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      
      <div className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Auction Analytics</h1>
          <p className="text-gray-600 mt-2">Monitor and analyze auction performance</p>
        </div>

        {isLoading ? (
          <div className="space-y-6">
            <TableSkeleton />
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statsCards.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                      {React.cloneElement(stat.icon, { className: `w-6 h-6 ${stat.color.replace('bg-', 'text-')}` })}
                    </div>
                    <span className="text-green-500 text-sm font-semibold">{stat.trend}</span>
                  </div>
                  <h3 className="text-gray-600 text-sm">{stat.title}</h3>
                  <p className="text-2xl font-bold text-gray-800 mt-2">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Recent Auctions Table */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800">Recent Auctions</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Base Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Bid</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Participants</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentAuctions?.map((auction) => (
                      <tr key={auction._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                              {auction.product?.p_image ? (
                                <img 
                                  src={auction.product.p_image} 
                                  alt={auction.product.p_name}
                                  className="h-8 w-8 rounded-lg object-cover"
                                />
                              ) : (
                                <Package className="h-5 w-5 text-gray-400" />
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {auction.product?.p_name || 'N/A'}
                              </div>
                              <div className="text-sm text-gray-500">
                                {auction.product?.category || 'No Category'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            ₹{(auction.basePrice || 0).toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            ₹{(auction.highestBid || auction.basePrice || 0).toLocaleString()}
                          </div>
                          {auction.basePrice && auction.highestBid && (
                            <div className="text-xs text-green-600">
                              +{(((auction.highestBid - auction.basePrice) / auction.basePrice) * 100).toFixed(1)}%
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            auction.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {auction.status || 'Unknown'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {auction.participants || 0}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Auctions;