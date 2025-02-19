import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { useAuthStore } from '../../store/authStore';
const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const {Auction_URL}=useAuthStore();
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;
      
      setIsLoading(true);
      try {
        const response = await fetch(`${Auction_URL}/search?query=${encodeURIComponent(query)}`, {
          method: 'GET',
          credentials: 'include'
        });

        console.log(response);

        if (!response.ok) {
          throw new Error('Search failed');
        }

        const data = await response.json();
        setResults(data.data);

        console.log("results",results);
      } catch (error) {
        console.error('Search error:', error);
        toast.error("Failed to fetch search results");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Search Results for "{query}"
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Found {results.length} results
          </p>
        </div>

        {/* Results Grid */}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((auction) => (
              <div
                key={auction._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative">
                  <img
                    src={auction.product.p_image || 'https://via.placeholder.com/300x200'}
                    alt={auction.product.p_name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-sm">
                    {new Date(auction.endTime) > Date.now() ? "Ending Soon" : "Ended"}
                  </div>
                </div>

                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {auction.product.p_name}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4">
                    {auction.product.p_desc}
                  </p>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-500 text-sm">Current Bid</p>
                      <p className="text-lg font-bold text-blue-600">
                        ₹{auction.highestBid?.toLocaleString()}
                      </p>
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-300">
                      Place Bid
                    </button>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Category: {auction.product.p_category}</span>
                      <span>{auction.totalBids > 0 ? auction.totalBids : "No"} bids</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No results found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search terms or browse our categories instead
            </p>
          </div>
        )}

        
          {/* Price Range */}
          
          {/* Categories */}
         
          {/* Sort By */}
          
          
        
      </div>
    </div>
  );
};

export default SearchPage; 