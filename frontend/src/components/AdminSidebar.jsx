import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { LayoutDashboard, Users, ShoppingBag, LogOut, Info } from 'lucide-react';

const AdminSidebar = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const getActiveTab = () => {
    if (location.pathname === '/admin') return 'dashboard';
    if (location.pathname === '/admin/users') return 'users';
    if (location.pathname === '/admin/auctions') return 'auctions';
    return '';
  };

  const activeTab = getActiveTab();

  return (
    <div className="fixed left-0 top-0 w-64 h-full bg-white shadow-lg">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
      </div>
      <nav className="mt-6">
        <NavLink 
          to="/admin"
          className={`flex items-center px-6 py-3 cursor-pointer ${
            activeTab === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <LayoutDashboard className="w-5 h-5 mr-3" />
          Dashboard
        </NavLink>
        <NavLink 
          to="/admin/users"
          className={`flex items-center px-6 py-3 cursor-pointer ${
            activeTab === 'users' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Users className="w-5 h-5 mr-3" />
          Users
        </NavLink>
        <NavLink 
          to="/admin/auctions"
          className={`flex items-center px-6 py-3 cursor-pointer ${
            activeTab === 'auctions' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <ShoppingBag className="w-5 h-5 mr-3" />
          Auctions
        </NavLink>
        <NavLink 
          to="/admin/information"
          className={`flex items-center px-6 py-3 cursor-pointer ${
            activeTab === 'information' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Info className="w-5 h-5 mr-3" />
          Information
        </NavLink>

      
        <button 
          onClick={handleLogout}
          className="w-full flex items-center px-6 py-3 cursor-pointer text-gray-600 hover:bg-gray-50"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </nav>
    </div>
  );
};

export default AdminSidebar;