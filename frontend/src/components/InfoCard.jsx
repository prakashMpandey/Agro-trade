import React, { useEffect } from 'react'
import { useState } from 'react';
import { useAuthStore } from '../../store/authStore.js';
const InfoCard = () => {

    const [loading,setLoading]=useState(false)
   
    const [info, setInfo]=useState([])
    const {Info_URL}=useAuthStore();
    
    const fetchInfo = async () => {
        try {
          setLoading(true);
          const response=await fetch(`${Info_URL}/get-all/?limit=3`,{method:"GET",headers:{"Content-Type":"application/json",},credentials:"include",});

          const data=await response.json();

          if(response.status!==200) 
          {
            return;
          }

          setInfo(data.data)


        }
        catch (error) {
          console.error('Error fetching info:', error);
          setLoading(false);
        }
        finally{
          setLoading(false)
        }
      }

      useEffect(() => {
        fetchInfo();
      }, []);
    return (
   
       <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {info.map((item) => (
              <div
                key={item._id}
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
                  {item.link && (
                    <a
                      href={item.link}
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
              </div>
            ))}
          </div>
        )}
      </div>
    
  
  )
}

export default InfoCard
