import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';
import { Search, Plus, Edit2, Trash2, ExternalLink, Calendar } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import TableSkeleton from '../../components/LoadingSkeleton/TableSkeleton';
import EditInfoModal from '../../components/Modals/EditInfoModal';

const Information = () => {
  const navigate = useNavigate();
  const [information, setInformation] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { Admin_URL } = useAuthStore();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchInformation();
  }, [page, limit, selectedCategory, searchQuery]);

  const fetchInformation = async () => {
    try {
      const response = await axios.get(
        `${Admin_URL}/information-analytics?page=${page}&limit=${limit}&category=${selectedCategory}&search=${searchQuery}`,
        { withCredentials: true }
      );
      setInformation(response.data.data.content || []);
      setTotalPages(response.data.data.totalPages);
    } catch (error) {
      toast.error('Failed to fetch information');
      setInformation([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${Admin_URL}/delete-info/${id}`, {
        withCredentials: true
      });
      toast.success('Information deleted successfully');
      fetchInformation();
    } catch (error) {
      toast.error('Failed to delete information');
    }
  };

  const handleEdit = (info) => {
    setSelectedInfo(info);
    setIsEditModalOpen(true);
  };

  const categories = ['All', 'Schemes', 'Techniques', 'Equipment'];

  

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 ml-64 p-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Information Management</h1>
            <p className="text-gray-600 mt-1">Manage farming schemes, techniques, and equipment information</p>
          </div>
          <button
            onClick={() => navigate('/admin/create-info')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add New Information
          </button>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search information..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category.toLowerCase())}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    selectedCategory === category.toLowerCase()
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Information Table */}
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Source</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valid Till</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {information.map((info) => (
                  <tr key={info._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img 
                          src={info.image} 
                          alt={info.title}
                          className="h-10 w-10 rounded-lg object-cover"
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{info.title}</div>
                          <div className="text-sm text-gray-500 line-clamp-1">{((info.description).slice(0,40))+"..."}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium
                        ${info.category === 'schemes' ? 'bg-blue-100 text-blue-800' :
                          info.category === 'techniques' ? 'bg-purple-100 text-purple-800' :
                          'bg-orange-100 text-orange-800'}`}
                      >
                        {info.category.charAt(0).toUpperCase() + info.category.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {info.source}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {info.validTill ? new Date(info.validTill).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => handleEdit(info)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <Edit2 className="w-5 h-5 inline-block" />
                      </button>
                      <button 
                        onClick={() => handleDelete(info._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-5 h-5 inline-block" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between items-center mt-4 px-6 py-3 bg-white border-t">
              <div className="text-sm text-gray-500">
                Showing {information.length} results
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="px-3 py-1 rounded border disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-3 py-1">Page {page}</span>
                <button
                  onClick={() => setPage(prev => prev + 1)}
                  disabled={information.length < limit}
                  className="px-3 py-1 rounded border disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {isEditModalOpen && (
        <EditInfoModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedInfo(null);
          }}
          info={selectedInfo}
          onUpdate={fetchInformation}
        />
      )}
    </div>
  );
};

export default Information;
