import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import AdminStats from '../components/adminStats.jsx';
import AdminBottomCard from '../components/AdminBottomCard.jsx';
import LoadingSkeleton from '../components/LoadingSkeleton.jsx';
import axios from 'axios';
import AdminSidebar from '../components/AdminSidebar';
const AdminPage = () => {
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { logout, Admin_URL } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${Admin_URL}/stats`, {
          withCredentials: true
        });
        setStats(response.data.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
     <AdminSidebar/> 

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="mb-8 flex justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Dashboard Overview</h2>
            <p className="text-gray-600">Welcome back, Admin</p>
          </div>
          <div>
            <button 
              onClick={() => { navigate('/admin/create-info') }} 
              className='bg-blue-500 text-white capitalize text-md px-4 py-2 rounded-md hover:bg-blue-600'
            >
              create Information
            </button>
          </div>
        </div>

        {/* Content with Loading State */}
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {stats && <AdminStats stats={stats} />}
            {stats?.users?.RecentUsers && stats?.auctions?.RecentAuctions && (
              <AdminBottomCard 
                users={stats.users.RecentUsers} 
                auctions={stats.auctions.RecentAuctions} 
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPage; 