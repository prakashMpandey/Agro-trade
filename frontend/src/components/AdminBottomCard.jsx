import { useState,useEffect } from 'react'
import React from 'react'
import axios from 'axios';
import { useAuthStore } from '../../store/authStore.js';
const AdminBottomCard=(props)=>{


  console.log(props)

  const users=props.users
  const auctions=props.auctions

    const {Admin_URL}=useAuthStore();
   
    // const users = [
    //     { id: 1, name: 'John Doe', role: 'Farmer', status: 'Active', joined: '2024-02-15' },
    //     { id: 2, name: 'Jane Smith', role: 'Buyer', status: 'Active', joined: '2024-02-14' },
    //     { id: 3, name: 'Mike Johnson', role: 'Farmer', status: 'Inactive', joined: '2024-02-13' }
    //   ];
    
    //   // Demo Auctions Data
    //   const auctions = [
    //     { id: 1, title: 'Apple Auction', price: '₹100', status: 'Active', bids: 5 },
    //     { id: 2, title: 'Banana Auction', price: '₹75', status: 'Inactive', bids: 3 },
    //     { id: 3, title: 'Cherry Auction', price: '₹90', status: 'Active', bids: 7 }
    //   ];
    
    return(
        
       <div className='grid grid-cols-2 gap-8'>
          <div className="grid grid-cols-1  gap-8">
          {/* Users Table */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-800">Recent Users</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.slice(0, 5).map((user, index) => (
                    <tr key={user.id || index}>
                      <td className="px-6 py-4">{user.username}</td>
                      <td className="px-6 py-4">{user.role}</td>
                      <td className="px-6 py-4">
                        {new Date(user.createdAt).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Auctions */}
          
        </div>
         <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b">
          <h3 className="text-xl font-semibold text-gray-800">Recent Auctions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {auctions.slice(0, 5).map((auction, index) => (
                <tr key={auction.id || index}>
                  <td className="px-6 py-4">{auction.product.p_name}</td>
                  <td className="px-6 py-4">₹{auction.basePrice}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      auction.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {auction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
       </div>
    )
}

export default AdminBottomCard;