import React, { useEffect, useState } from 'react';
import { Search, Filter,Loader } from 'lucide-react';
import axios from 'axios';
import { useAuthStore } from '../../store/authStore';
import {toast} from "react-toastify"
import { useNavigate } from 'react-router-dom';
import LoadingPage from './LoadingPage';
const MarketplacePage = () => {
  const navigate=useNavigate()
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [filter ,setFilter]=useState("all");
  const [sortBy, setSortBy] = useState('latest');
  const [showFilters, setShowFilters] = useState(false);
  const [auctions,setAuctions]=useState([])

const {isLoading,Auction_URL,setLoadingState}=useAuthStore()

useEffect(() => {
  
    const fetchProducts=async()=>{
        
        try {
            setLoadingState()
            const response = await axios.get(`${Auction_URL}/getAllauctions?filter=${filter}&sortBy=${sortBy}`, {withCredentials:true});

            if(!response.data.data)
            {
                toast.error("Something went wrong")
            }

            setAuctions(response.data.data)
        } catch (error) {
            console.log(error)
        }
        finally{
            setLoadingState()
        }
    }

    fetchProducts()

 
}, [filter,sortBy])

const handleSearch=async(e)=>{
    
        if(searchQuery.length === 0 || e.key !== "Enter") return;
        
       try {
        setLoadingState()
         const response = await fetch(`${Auction_URL}/search?query=${encodeURIComponent(searchQuery)}`, {
             method: 'GET',
             credentials: 'include'
           });
 
           console.log(response)
 
           const receivedData=await response.json()
 
           setAuctions(receivedData.data)
   
         setSearchQuery("");
       } catch (error) {
        console.log(error)
        
       }
       finally{
        setLoadingState()
        setSearchQuery("")
       }
    
}

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'grain', name: 'Grain' },
    { id: 'vegetable', name: 'Vegetable' },
    { id: 'fruit', name: 'Fruit' },
    { id: 'herb', name: 'Herb' },
    { id: 'spice', name: 'Spice' },
    { id: 'root', name: 'Root' },
    { id: 'flower', name: 'Flower' },
    { id: 'seed', name: 'Seed' },
    { id: 'leaf', name: 'Leaf' },
    { id: 'other', name: 'Other' },
  ];

  return (
    <div className="w-full bg-gray-50 p-4 md:p-6 mx-auto">
      {/* Loader */}
      {isLoading ? (
        <div className="h-screen flex justify-center items-center mx-auto animate-spin ease">
          <Loader />
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="max-w-7xl mb-8 mx-auto">
            <h1 className="text-black text-3xl font-bold mb-3">Agricultural Marketplace</h1>
            <p className="text-gray-500 font-normal text-md">
              Discover quality produce directly from verified farmers
            </p>
          </div>
  
          {/* Filters */}
          <div className="max-w-7xl mb-8 bg-white rounded-lg p-4 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  className="focus:outline-none focus:ring-2 focus:ring-blue-400 border border-gray-300 py-2 px-10 rounded-lg w-full"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                  placeholder="Search Products"
                />
                <Search className="text-gray-500 absolute top-2 left-2" />
              </div>
  
              <div className="flex">
                <button
                  className="border border-gray-300 px-6 capitalize text-gray-700 py-2 rounded-md flex w-full"
                  onClick={(e) => {
                    setShowFilters(!showFilters);
                  }}
                >
                  <Filter /> filter
                </button>
              </div>
            </div>
  
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => setFilter(category.id)}
                          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                            filter === category.id
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Range
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) =>
                          setPriceRange([parseInt(e.target.value), priceRange[1]])
                        }
                        placeholder="Min"
                        className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                      <span>to</span>
                      <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([priceRange[0], parseInt(e.target.value)])
                        }
                        placeholder="Max"
                        className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
  
          {/* Auction Items */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {auctions.length > 0 ? (
                auctions.map((auction) => (
                  <div
                    key={auction._id}
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="relative">
                      <img
                        src={
                          auction.product.p_image ||
                          "https://www.peptechbio.com/wp-content/uploads/2023/03/Wheat_photo-cred-Adobe-stock_E-2.jpg"
                        }
                        alt={auction.product.p_name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {auction.product.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {auction.product.p_name}
                        </h3>
                        <div className="flex items-center">
                          <span className="text-yellow-400">★</span>
                          <span className="ml-1 text-sm text-gray-600">
                            {auction.product.rating || "4"}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">
                        {auction.product.p_desc}
                      </p>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-lg font-bold text-blue-600">
                            ₹{auction.basePrice}
                          </p>
                          <p className="text-sm text-gray-500">
                            {auction.product.qty}
                          </p>
                        </div>
                        <button
                          onClick={() => navigate(`/product/${auction._id}`)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                      <div className="mt-4 flex items-center text-sm text-gray-500">
                        <span>{auction.product.location || "none"}</span>
                        <span className="mx-2">•</span>
                        <span>{auction.farmer.username}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="min-h-screen flex flex-col items-center justify-center border border-red-700">
                  <img
                    src="https://via.placeholder.com/150" // Replace with your graphic's URL
                    alt="No auctions found"
                    className="mb-6 text-center"
                  />
                  <h1 className="text-2xl font-bold text-gray-600 t" >
                    No auctions found
                  </h1>
                  <p className="text-gray-500">Try adjusting your filters.</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
  


}

export default MarketplacePage;