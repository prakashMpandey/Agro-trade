import { MapPin, Scale, IndianRupee, Calendar, Timer, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { Divide } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const ProductDesc = () => {

  const [auctionData,setAuctionData]=useState();
 

  const {Auction_URL}=useAuthStore()

  const {auctionId}=useParams()

  const navigate=useNavigate();
  useEffect(()=>{
   
    const fetchAuctionData = async () => {
      const response = await fetch(`${Auction_URL}/getAuction/${auctionId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
  
      if (response.ok && response.status === 200) {
        const receivedData = await response.json();
        setAuctionData(receivedData.data);
      }
    }

    fetchAuctionData()
  },[])


  if(!auctionData)
  {
    return(
      <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
          </div>
    )
  }

return (
      <div className="max-w-6xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Product Header */}
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-900">{auctionData?.product.p_name}</h1>
          <div className="flex items-center gap-2 mt-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            {/* <span>{auction?.location}</span> */}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Left: Image */}
          <div>
            <img
              src={auctionData?.product.p_image || "https://static1.cbrimages.com/wordpress/wp-content/uploads/2019/10/Featured-Image-14.jpg"}
              alt={auctionData?.product.p_name}
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
                      {auctionData?.highestBid}/quintal
                    </span>
                  </div>
                </div>
               
              </div>
            </div>

            {/* Product Info Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <Scale className="w-5 h-5 text-gray-600 mb-2" />
                <p className="text-gray-600">Quantity</p>
                <p className="text-lg font-semibold text-gray-900">
                  {auctionData?.product.p_qty}
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <Calendar className="w-5 h-5 text-gray-600 mb-2" />
                <p className="text-gray-600">Harvest Date</p>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date(auctionData?.product.harvestDate).toLocaleDateString('en-in',{dateStyle:"medium"})}
                </p>
              </div>
            </div>

            {/* Quality Details */}
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Quality Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Grade</p>
                  <p className="text-lg font-semibold capitalize text-gray-900">{auctionData?.product.quality}</p>
                </div>
                <div>
                  <p className="text-gray-600">Moisture</p>
                  <p className="text-lg font-semibold text-gray-900">{auctionData?.product.moisture}%</p>
                </div>
              </div>
            </div>

            {/* {description} */}
          

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3"></h3>
              <div className="grid grid-cols-2 grid-rows-2 gap-4">
                <div>
                  <p className="text-gray-600">color</p>
                  <p className="text-lg font-semibold text-gray-900">{auctionData?.product.color}</p>
                </div>
                <div>
                  <p className="text-gray-600">texture</p>
                  <p className="text-lg font-semibold text-gray-900">{auctionData?.product.texture}</p>
                </div>
                <div>
                  <p className="text-gray-600">Origin</p>
                  <p className="text-lg font-semibold text-gray-900">{auctionData?.product.origin}</p>
                </div>
                { auctionData.product.certification && <div>
                  <p className="text-gray-600">certification</p>
                  <p className="text-lg font-semibold text-gray-900">{auctionData?.product.certification}</p>
                </div> }
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Packaging Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Storage</p>
                  <p className="text-lg font-semibold text-gray-900">{auctionData?.product.storage}</p>
                </div>
                <div>
                  <p className="text-gray-600 capitalize">packaging Type</p>
                  <p className="text-lg font-semibold text-gray-900">{auctionData?.product.packaging}</p>
                </div>
              </div>
            </div>

            {/* Seller Info */}
            <div className="flex items-center gap-4 border-t pt-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{"Seller"}</p>
                <p className="font-medium text-gray-900">{auctionData?.farmer.fullname}</p>
                <p className="text-gray-600">{auctionData?.farmer.email}</p>
              </div>
            </div>

            {/* Action Button */}
            <button onClick={()=>{navigate(`/auction/${auctionId}`)}} className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white py-3 rounded-lg font-medium hover:from-teal-600 hover:to-blue-600 transition-colors duration-200">
              Place Bid
            </button>
          </div>
        </div>

        {/* Description Section */}
        <div className="border-t p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Product Description</h3>
          <p className="text-gray-600">{auctionData?.product.p_desc}</p>
        </div>
      </div>
    </div>
  );


};

export default ProductDesc;
