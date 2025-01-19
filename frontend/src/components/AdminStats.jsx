import React from 'react'
import { Users, Package, DollarSign, TrendingUp, IndianRupee, UserCheck, UserPlus, Gavel } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const AdminStats = ({ stats }) => {
  const { Admin_URL } = useAuthStore();

  const statsCards = [
    {
      title: 'Total Users',
      value: stats?.users?.total || 0,
      icon: <Users size={20} />,
      subtext: `${stats?.users?.farmers || 0} Farmers, ${stats?.users?.business || 0} Buyers`
    },
    {
      title: 'New Users This Week',
      value: stats?.users?.newUsersThisWeek || 0,
      icon: <UserPlus size={20} />,
      trend: '+12.6%'
    },
    {
      title: 'Active Auctions',
      value: stats?.auctions?.active || 0,
      icon: <Package size={20} />,
      subtext: `${stats?.auctions?.successRate}% Success Rate`
    },
    {
      title: 'Total Revenue',
      value: `₹${stats?.revenue?.total?.toLocaleString() || 0}`,
      icon: <IndianRupee size={20} />,
      subtext: `Avg. Bid: ₹${stats?.revenue?.averageBid || 0}`
    },
    {
      title: 'Total Bids',
      value: stats?.bidding?.totalBids || 0,
      icon: <Gavel size={20} />,
      subtext: `${stats?.bidding?.activeBids || 0} Active Bids`
    },
    {
      title: 'Highest Bid',
      value: `₹${stats?.revenue?.highestBid?.toLocaleString() || 0}`,
      icon: <TrendingUp size={20} />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {statsCards.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              {stat.icon}
            </div>
            {stat.trend && (
              <span className="text-green-500 text-sm font-semibold">
                {stat.trend}
              </span>
            )}
          </div>
          <h3 className="text-gray-600 text-sm">{stat.title}</h3>
          <p className="text-2xl font-bold text-gray-800 mb-2">{stat.value}</p>
          {stat.subtext && (
            <p className="text-sm text-gray-500">{stat.subtext}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminStats;