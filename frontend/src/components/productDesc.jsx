import React from 'react';
import { MapPin, Scale, IndianRupee, Calendar, Timer, User } from 'lucide-react';

const ProductDesc = ({ auction }) => {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Product Header */}
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-900">{auction?.productName}</h1>
          <div className="flex items-center gap-2 mt-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{auction?.location}</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Left: Image */}
          <div>
            <img
              src={auction?.images?.[0] || '/default-product.jpg'}
              alt={auction?.productName}
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </div>

          {/* Right: Details */}
          <div className="space-y-6">
            {/* Price Box */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600">Current Bid</p>
                  <div className="flex items-center gap-1">
                    <IndianRupee className="w-5 h-5" />
                    <span className="text-2xl font-bold text-gray-900">
                      {auction?.currentBid}/quintal
                    </span>
                  </div>
                </div>
                <div>
                  <Timer className="w-5 h-5 text-orange-500" />
                  <p className="text-orange-500 font-medium">23:45:12 left</p>
                </div>
              </div>
            </div>

            {/* Product Info Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <Scale className="w-5 h-5 text-gray-600 mb-2" />
                <p className="text-gray-600">Quantity</p>
                <p className="text-lg font-semibold text-gray-900">
                  {auction?.quantity} quintals
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <Calendar className="w-5 h-5 text-gray-600 mb-2" />
                <p className="text-gray-600">Harvest Date</p>
                <p className="text-lg font-semibold text-gray-900">
                  {auction?.harvestDate}
                </p>
              </div>
            </div>

            {/* Quality Details */}
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Quality Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Grade</p>
                  <p className="text-lg font-semibold text-gray-900">{auction?.quality}</p>
                </div>
                <div>
                  <p className="text-gray-600">Moisture</p>
                  <p className="text-lg font-semibold text-gray-900">{auction?.moisture}%</p>
                </div>
              </div>
            </div>

            {/* Seller Info */}
            <div className="flex items-center gap-4 border-t pt-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{auction?.sellerName}</p>
                <p className="text-gray-600">{auction?.sellerLocation}</p>
              </div>
            </div>

            {/* Action Button */}
            <button className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white py-3 rounded-lg font-medium hover:from-teal-600 hover:to-blue-600 transition-colors duration-200">
              Place Bid
            </button>
          </div>
        </div>

        {/* Description Section */}
        <div className="border-t p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Product Description</h3>
          <p className="text-gray-600">{auction?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDesc;
