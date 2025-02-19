import React, { useState, useEffect, useRef } from "react";
import AdminSidebar from "../../components/AdminSidebar.jsx";
import {
  Search,
  SlidersHorizontal,
  Edit,
  Trash2,
  ChevronDown
} from "lucide-react";
import { useAuthStore } from "../../../store/authStore.js";
import axios from "axios";
import { toast } from "react-toastify";

import TableSkeleton from '../../components/LoadingSkeleton/TableSkeleton';
import EditUserModal from '../../components/EditUserModal';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search,setSearch]=useState("");
  const [filter,setFilter]=useState("all");
  const [open,setOpen]=useState(false);
  const { Admin_URL ,setLoadingState,isLoading} = useAuthStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  const handleSearch=async()=>{

    try {

      setLoadingState()

    
      const response =await axios.post(`${Admin_URL}/search-user`,{username:search},{withCredentials:true,})
      if(response.data)
      {
        setUsers(response.data.data)
      }
      else
      {
        toast.error("failed to fetch users")
      } 
    } catch (error) {
      console.log(error)
    }   

    finally{
      setLoadingState()
    }

  }


  const handleDelete=async(id)=>{

    try {

      setLoadingState()
      const response=await axios.delete(`${Admin_URL}/delete-user/${id}`,{withCredentials:true})
      if(response.data)
      {
        toast.success("user deleted successfully")
      }
      else
      {
        toast.error("failed to delete user")
      }
      users.filter((user)=>user._id!==id);
      setUsers(users)

    } catch (error) {
      toast.error("failed to delete user")
    }
    finally{
      setLoadingState()
    }
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${Admin_URL}/user-analytics?filter=${filter}`, {
          withCredentials: true,
        });
        
        if (response.data) {
          setUsers(response.data.data);
        } else {
          toast.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Error fetching users");
      }
    };

    fetchUsers();
  }, [filter]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-In', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (userId, updatedData) => {
    try {
      setLoadingState();
      const response = await axios.put(
        `${Admin_URL}/update-user/${userId}`,
        updatedData,
        { withCredentials: true }
      );
      
      if (response.data.success) {
        toast.success('User updated successfully');
        setUsers(users.map(user => 
          user._id === userId ? { ...user, ...updatedData } : user
        ));
        setIsEditModalOpen(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update user');
    } finally {
      setLoadingState();
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setDropdownOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="ml-64 flex-grow p-8">
        <div className="header mb-8">
          <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
          <p className="text-gray-600 mt-2">
            View and manage all users in the system
          </p>
        </div>

        {/* Search and Filter section */}
        <div className="flex items-center flex-wrap gap-4 justify-between mb-6">
          <div className="flex items-center gap-2 max-w-md">
            <div className="relative flex-grow w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by username ..."
                className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <button 
                className="bg-white px-4 py-2 hover:bg-gray-50 font-medium rounded-md" 
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>

          <div className="relative" ref={dropdownRef}>
            <button 
              className="flex items-center justify-center gap-2 bg-white py-2 px-4 rounded-md hover:bg-gray-50"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <SlidersHorizontal className="text-gray-600" />
              <span className="font-medium">
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </span>
              <ChevronDown 
                className={`text-gray-600 transition-transform duration-200 ${
                  dropdownOpen ? 'transform rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <div className="py-1">
                  <button
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                      filter === 'all' ? 'bg-gray-50 text-blue-600' : 'text-gray-700'
                    }`}
                    onClick={() => handleFilterChange('all')}
                  >
                    All Users
                  </button>
                  <button
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                      filter === 'business' ? 'bg-gray-50 text-blue-600' : 'text-gray-700'
                    }`}
                    onClick={() => handleFilterChange('business')}
                  >
                    Business
                  </button>
                  <button
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                      filter === 'farmer' ? 'bg-gray-50 text-blue-600' : 'text-gray-700'
                    }`}
                    onClick={() => handleFilterChange('farmer')}
                  >
                    Farmer
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Table with Loading State */}
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <div className="bg-white rounded-md shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {users && users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-xl font-medium text-blue-600">
                              {user.username?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.username}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.email}</div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.role === "business"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-green-100 text-green-800"
                        }`}>
                          {user.role}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatDate(user.createdAt)}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          className="text-blue-600 hover:text-blue-900 mr-4"
                          onClick={() => handleEdit(user)}
                        >
                          <Edit className="w-5 h-5 inline-block" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="w-5 h-5 inline-block" onClick={()=>handleDelete(user._id)} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal - Move inside the main div */}
        {isEditModalOpen && (
          <EditUserModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            user={selectedUser}
            onSave={handleSaveEdit}
          />
        )}
      </div>
    </div>
  );
};

export default Users;
