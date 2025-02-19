import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Sprout, IndianRupee, Tractor, Filter, CloudHail } from 'lucide-react';
import {toast} from 'react-toastify';
import { useAuthStore } from "../../store/authStore.js";
import { motion } from 'framer-motion';
import { useInView } from "framer-motion";
import { useRef } from "react";


const InfoPage = () => {
  const {Info_URL}=useAuthStore();
 

  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  const tabs = [
    { id: 'all', label: 'All', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'schemes', label: 'Schemes', icon: <IndianRupee className="w-5 h-5" /> },
    { id: 'techniques', label: 'Techniques', icon: <Sprout className="w-5 h-5" /> },
    { id: 'equipment', label: 'Equipment', icon: <Tractor className="w-5 h-5" /> }
  ];

  useEffect(() => {
    fetchInfo();
  }, [activeTab]);

  const fetchInfo = async () => {


    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log(activeTab)
      const response =await fetch(`${Info_URL}/get-all/?category=${activeTab}`,{method:"GET",headers:{"Content-Type":"application/json",},credentials:"include",});

      const data=await response.json();

      if(response.status!==200) 
      {
        toast.error(data.message)
      }

      setInfo(data.data)

      console.log(data.data)

    } catch (error) {
      console.error('Error fetching info:', error);
      setLoading(false);
    }
    finally{
      setLoading(false)
    }
  };

  const searchInfo = async () => {

    try {
      
      const response =await fetch(`${Info_URL}/search/?query=${searchTerm}`,{method:"post",headers:{"Content-Type":"application/json",},credentials:"include",});

      const data=await response.json();

      if(response.status!==200)
      {
        toast.error(data.message)
      }

      // if(data.data.result.length===0)
      // {
      //   return;
      // }

      console.log("search item" ,data.data)


      setInfo(data.data)

      
    } catch (error) {
      console.log('Error fetching info:', error);
    }


  }

  console.log("search item" ,info)

  const handleSearch = (e) => {  

    if(e.key==="Enter" && searchTerm)
    {
      searchInfo();
    }

  }
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          <div className=""></div>
          Farming Information Hub
        </h1>
        <p className="text-lg text-gray-600">
          Discover latest farming schemes, techniques, and equipment information
        </p>
      </div>

      {/* Search and Filter */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search information..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearch}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200
                    ${activeTab === tab.id
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {tab.icon}
                  <span className="hidden md:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {info.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y:30 }}
                animate={{ opacity: 1, y:0 }}
                transition={{ duration: 0.3 }}

                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium
                      ${item.category === 'schemes' ? 'bg-blue-100 text-blue-800' :
                        item.category === 'techniques' ? 'bg-green-100 text-green-800' :
                          'bg-purple-100 text-purple-800'}`}
                    >
                      {item.category}
                    </span>
                    {item.source && (
                      <span className="text-sm text-gray-500">
                        Source: {item.source}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {item.description}
                  </p>
                  {item.externalLink && (
                    <a
                      href={item.externalLink }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-green-600 hover:text-green-700"
                    >
                      Learn More
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  )}
                </div>
                {item.validTill && (
                  <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
                    <p className="text-sm text-gray-600">
                      Valid till: {new Date(item.validTill).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
        
        {!loading && info.length === 0 && (
          <div className="text-center py-12">
            <Filter className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No results found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoPage;
