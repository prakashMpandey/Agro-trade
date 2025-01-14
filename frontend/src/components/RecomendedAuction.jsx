import React from 'react'

const RecomendedAuction = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Recommended Auctions
        </h2>
        <div className="grid grid-cols-3 gap-6">
          {/* Recommended Auction Item 1 */}
          <div className="bg-gray-50 rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Auction Item 1</h3>
            <p className="text-gray-600 mb-4">Starting Bid: ₹5000</p>
            <p className="text-gray-600 mb-4">Time Left: 01:30:45</p>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all">
              Join Auction
            </button>
          </div>

          {/* Recommended Auction Item 2 */}
          <div className="bg-gray-50 rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Auction Item 2</h3>
            <p className="text-gray-600 mb-4">Starting Bid: ₹10000</p>
            <p className="text-gray-600 mb-4">Time Left: 03:12:20</p>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all">
              Join Auction
            </button>
          </div>

          {/* Recommended Auction Item 3 */}
          <div className="bg-gray-50 rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Auction Item 3</h3>
            <p className="text-gray-600 mb-4">Starting Bid: ₹15000</p>
            <p className="text-gray-600 mb-4">Time Left: 00:50:12</p>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all">
              Join Auction
            </button>
          </div>
        </div>
      </div>
  )
}

export default RecomendedAuction
