import React from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../store/authStore';
import { set } from 'mongoose';
import { useNavigate } from 'react-router-dom';

const Auction_URL = "http://localhost:4000/api/v1/auction";

const CreateAuction = () => {

    const [productData,setProductData]=useState({
      product_name: "",
      desc: "",
      quantity: "",
      unit: "kg",
      basePrice: "",
      
      variety: "",
      gradeQuality: "",
      moisture: "",
      origin: "",
      harvestDate: "",
      organicStatus: "non-organic",
      certification: "",
      storageCondition: "",
      texture: "",
      color: "",
      packaging: "",
      expectedDelivery: "",
      category: "other"
    
    })
    
    const navigate=useNavigate()
    const [image,setImage]=useState(null)
    const [isDisabled,setIsDisabled]=useState(false)
    const {isLoading,setLoadingState}=useAuthStore()

    const handleChange=(e)=>{
      const name=e.target.name;
      const value=e.target.value;

      console.log(name,value)
      setProductData({...productData,[name]:value});
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
 
      setIsDisabled(true);
    
      const formData = new FormData();
      formData.append("product_name", productData.product_name);
      formData.append("desc", productData.desc);
      formData.append("quantity", productData.quantity + productData.unit); // This concatenates quantity and unit
      formData.append("basePrice", productData.basePrice);
      formData.append("image", image);
      formData.append("quality", productData.gradeQuality);
      formData.append("moisture", productData.moisture);
      formData.append("origin", productData.origin);
      formData.append("harvestDate", productData.harvestDate);
      formData.append("organicStatus", productData.organicStatus);
      formData.append("certification", productData.certification);
      formData.append("storage", productData.storageCondition);
      formData.append("texture", productData.texture);
      formData.append("color", productData.color);
      formData.append("packaging", productData.packaging);
      formData.append("deliveryTime", productData.expectedDelivery);
      formData.append("color", productData.color);
    formData.append("variety",productData.variety);
    formData.append("category",productData.category);
   
      

      console.log(formData);
    
      try {
        const response = await fetch(`${Auction_URL}/create-auction`, {
          method: "POST",
          credentials: "include",
          body: formData,
        });
    
        if (!response.ok) {
          throw new Error("Failed to create auction");
        }
    
        const receivedData = await response.json();
    
        toast.success(receivedData.message);
    
        setProductData({
          product_name: "",
          desc: "",
          quantity: "",
          unit: "",
          basePrice: "",
        });
        setImage(null);
        navigate("/home")

        
      }
      
      catch (error) {
        toast.error("Auction cannot be created");
        console.error(error);
      } 
      
      finally {

        setIsDisabled(false); 
        
      }
    };
    

    
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Auction</h1>
          <p className="mt-2 text-sm text-gray-600">
            Fill in the details below to list your agricultural products for auction
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Basic Details Section */}
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Details</h2>
                <div className="grid grid-cols-1 gap-6">
                  <div className='flex flex-col gap-2'>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="product_name"
                      value={productData.product_name}
                      onChange={handleChange}
                      placeholder="Enter product name"
                      className="w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                    <label className="block text-gray-600 font-medium mb-1">Category</label>
                    <select
                      name="category"
                      value={productData.category}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                    
                      <option value="vegetable">Vegetable</option>
                      <option value="fruit">Fruit</option>
                      <option value="grain">Grains</option>
                      <option value="spices">Spices</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Product Specifications */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Product Specifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="mb-4">
                    <label className="block text-gray-600 font-medium mb-1">
                      Variety/Type
                    </label>
                    <input
                      type="text"
                      name="variety"
                      value={productData.variety}
                      onChange={handleChange}
                      placeholder="e.g., Basmati, Durum"
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-600 font-medium mb-1">
                      Grade/Quality
                    </label>
                    <select
                      name="gradeQuality"
                      value={productData.gradeQuality}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="">Select Grade</option>
                      <option value="A">Grade A</option>
                      <option value="B">Grade B</option>
                      <option value="C">Grade C</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-600 font-medium mb-1">
                      Moisture Content (%)
                    </label>
                    <input
                      type="number"
                      name="moisture"
                      value={productData.moisture}
                      onChange={handleChange}
                      placeholder="e.g., 14"
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-600 font-medium mb-1">
                      Origin Location
                    </label>
                    <input
                      type="text"
                      name="origin"
                      value={productData.origin}
                      onChange={handleChange}
                      placeholder="e.g., Maharashtra"
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-600 font-medium mb-1">
                      Harvest Date
                    </label>
                    <input
                      type="date"
                      name="harvestDate"
                      value={productData.harvestDate}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-600 font-medium mb-1">
                      Organic Status
                    </label>
                    <select
                      name="organicStatus"
                      value={productData.organicStatus}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="non-organic">Non-Organic</option>
                      <option value="organic">Organic</option>
                      <option value="in-transition">In Transition</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-600 font-medium mb-1">
                      Certification (if any)
                    </label>
                    <input
                      type="text"
                      name="certification"
                      value={productData.certification}
                      onChange={handleChange}
                      placeholder="e.g., FSSAI, Organic"
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-600 font-medium mb-1">
                      Storage Condition
                    </label>
                    <input
                      type="text"
                      name="storageCondition"
                      value={productData.storageCondition}
                      onChange={handleChange}
                      placeholder="e.g., Cool & Dry"
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-600 font-medium mb-1">
                      Texture
                    </label>
                    <input
                      type="text"
                      name="texture"
                      value={productData.texture}
                      onChange={handleChange}
                      placeholder="e.g., Fine, Coarse"
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-600 font-medium mb-1">
                      Color
                    </label>
                    <input
                      type="text"
                      name="color"
                      value={productData.color}
                      onChange={handleChange}
                      placeholder="e.g., Golden Yellow"
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-600 font-medium mb-1">
                      Packaging Type
                    </label>
                    <input
                      type="text"
                      name="packaging"
                      value={productData.packaging}
                      onChange={handleChange}
                      placeholder="e.g., Jute Bags"
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-600 font-medium mb-1">
                      Expected Delivery Timeline
                    </label>
                    <input
                      type="text"
                      name="expectedDelivery"
                      value={productData.expectedDelivery}
                      onChange={handleChange}
                      placeholder="e.g., Within 7 days"
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                </div>
              </div>

              {/* Quantity and Pricing */}
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Quantity & Pricing</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity
                    </label>
                    <div className="flex gap-4">
                      <input
                        value={productData.quantity}
                        onChange={handleChange}
                        name="quantity"
                        type="text"
                        placeholder="Enter quantity"
                        className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      />
                      <select 
                        name='unit' 
                        value={productData.unit}
                        onChange={handleChange} 
                        className="rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      >
                        <option value="kg">kg</option>
                        <option value="quintal">quintal</option>
                        <option value="Litre">L</option>
                        <option value="pcs">pcs</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Base Price
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={productData.basePrice}
                        onChange={handleChange}
                        name='basePrice'
                        className="w-32 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        placeholder="Ex: 2000"
                      />
                      <span className="text-gray-600">per {productData.unit}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Upload */}
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Product Images</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-50">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 800x400px)</p>
                      </div>
                      <input 
                        type="file" 
                        className="hidden" 
                        onChange={(e)=>{setImage(e.target.files[0])}}
                        accept="image/*"
                      />
                    </label>
                  </div>
                  {image && (
                    <div className="mt-4">
                      <div className="relative w-40 h-40">
                        <img 
                          src={URL.createObjectURL(image)} 
                          alt="Preview" 
                          className="w-full h-full object-cover rounded-lg shadow-md"
                        />
                        <button
                          type="button"
                          onClick={() => setImage(null)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="bg-gradient-to-r from-pink-50 to-pink-100 p-4 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Description</h2>
                <textarea
                  name="desc"
                  value={productData.desc}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Enter detailed product description..."
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  disabled={isDisabled}
                  className={`w-full ${
                    isDisabled 
                      ? "bg-gray-400 cursor-not-allowed" 
                      : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                  } text-white text-lg font-semibold py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl`}
                  type="submit"
                >
                  {isDisabled ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      Creating Auction...
                    </div>
                  ) : (
                    "Create Auction"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAuction;
