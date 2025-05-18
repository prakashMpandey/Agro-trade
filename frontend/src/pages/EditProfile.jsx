import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../../store/authStore';
import axios from 'axios';

const EditProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isAnyThingChanged, setIsAnythingChanged] = useState(false);
  const { user,API_URL } = useAuthStore();
  const [profileImage, setProfileImage] = useState(user?.avatar || null);
  const User_URL = `${API_URL}/api/v1/user`;
  
  // Initialize all form fields with empty strings
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    countryCode: '+91',
    phoneNo: '',
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    street: '',
    city: '',
    state: '',
    pinCode: '',
    landMark: '',
    addressType: 'home',
    country: 'India'
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${User_URL}/isLoggedIn`, {
          withCredentials: true
        });

        if (response.status === 200) {
          const data = response.data.data;
          setUserData({
            username: data.username || '',
            email: data.email || '',
            countryCode: data.contact?.mobile?.countryCode || '+91',
            phoneNo: data.contact?.mobile?.phoneNo || '',
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            dob: data.dob ? new Date(data.dob).toISOString().split('T')[0] : '',
            gender: data.gender || '',
            street: data.contact?.street || '',
            city: data.contact?.city || '',
            state: data.contact?.state || '',
            pinCode: data.contact?.pinCode || '',
            landMark: data.contact?.landMark || '',
            addressType: data.contact?.addressType || 'home',
            country: data.contact?.country || 'India'
          });
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        toast.error('Failed to load user details');
      }
    };

    fetchUserDetails();
  }, []);

  const handleChange = (e) => {

    setIsAnythingChanged(true)
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const formattedData = {
        ...userData,
        dob: userData.dob ? new Date(userData.dob).toISOString().split('T')[0] : undefined,
      };

      const response = await axios.put(
        `${User_URL}/update-profile`,
        formattedData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success('Profile updated successfully');
        navigate(-1);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileImage=async(e)=>{

    setIsLoading(true);
    const avatar=e.target.files[0];
try {
  
      const formData = new FormData();
    formData.append("avatar", avatar); 
    
      const response=await fetch(`${User_URL}/add-avatar`,{method:"post",
        
        credentials:"include",
        body:formData
      })
  
      if(response.ok)
      {
        const receivedData=await response.json()
        setProfileImage(receivedData.data);
        user.avatar=receivedData.data;
      }
  
      else{
        toast.error("avatar cannot be changed")
      }
      console.log(response.data)
} catch (error) {
  console.log(error)
}
finally{
  setIsLoading(false)
}
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
          <p className="mt-2 text-sm text-gray-600">
            Update your personal information and preferences
          </p>
        </div>

        {/* Main Form */}
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Profile Image Section */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">


                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100" >
                    {profileImage ? (
                    isLoading?<div className=''>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><radialGradient id="a12" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)"><stop offset="0" stop-color="#050040"></stop><stop offset=".3" stop-color="#050040" stop-opacity=".9"></stop><stop offset=".6" stop-color="#050040" stop-opacity=".6"></stop><stop offset=".8" stop-color="#050040" stop-opacity=".3"></stop><stop offset="1" stop-color="#050040" stop-opacity="0"></stop></radialGradient><circle transform-origin="center" fill="none" stroke="url(#a12)" stroke-width="12" stroke-linecap="round" stroke-dasharray="200 1000" stroke-dashoffset="0" cx="100" cy="100" r="70"><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform></circle><circle transform-origin="center" fill="none" opacity=".2" stroke="#050040" stroke-width="12" stroke-linecap="round" cx="100" cy="100" r="70"></circle></svg>
                    </div>
                    :<img
                        src={profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                       
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 cursor-pointer hover:bg-blue-600 transition-colors">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleProfileImage}
                    />
                  </label>
                </div>
                <p className="text-sm text-gray-500">Click the camera icon to update your profile picture</p>
              </div>

              {/* Basic Information */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={userData.username}
                      onChange={handleChange}
                      className="mt-1 p-1.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={userData.email}
                      onChange={handleChange}
                      className="mt-1 block p-1.5 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex gap-2">
                    <div className="w-1/4">
                      <label className="block text-sm font-medium text-gray-700">Code</label>
                      <select
                        name="countryCode"
                        value={userData.countryCode}
                        onChange={handleChange}
                        className="mt-1 block p-1.5 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="+91">+91</option>
                        <option value="+1">+1</option>
                        <option value="+44">+44</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                      <input
                        type="tel"
                        name="phoneNo"
                        value={userData.phoneNo}
                        onChange={handleChange}
                        className="mt-1 block p-1.5 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Details */}
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={userData.firstName}
                      onChange={handleChange}
                      className="mt-1 block w-full  p-1.5 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={userData.lastName}
                      onChange={handleChange}
                      className="mt-1 block p-1.5 w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                    <input
                      type="date"
                      name="dob"
                      value={userData.dob}
                      onChange={handleChange}
                      className="mt-1 block p-1.5 w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                    <select
                      name="gender"
                      value={userData.gender}
                      onChange={handleChange}
                      className="mt-1 block w-full p-1.5 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Address Information</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Street Address</label>
                    <input
                      type="text"
                      name="street"
                      value={userData.street}
                      onChange={handleChange}
                      className="mt-1 block p-1.5 w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">City</label>
                      <input
                        type="text"
                        name="city"
                        value={userData.city}
                        onChange={handleChange}
                        className="mt-1 block p-1.5 w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">State</label>
                      <input
                        type="text"
                        name="state"
                        value={userData.state}
                        onChange={handleChange}
                        className="mt-1 block p-1.5 w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">PIN Code</label>
                      <input
                        type="text"
                        name="pinCode"
                        value={userData.pinCode}
                        onChange={handleChange}
                        className="mt-1 block p-1.5 w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Landmark</label>
                      <input
                        type="text"
                        name="landMark"
                        value={userData.landMark}
                        onChange={handleChange}
                        className="mt-1 block p-1.5 w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address Type</label>
                    <select
                      name="addressType"
                      value={userData.addressType}
                      onChange={handleChange}
                      className="mt-1 block p-1.5 w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    >
                      <option value="home">Home</option>
                      <option value="work">Work</option>
                      <option value="farm">Farm</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Bank Details */}
              {/* <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Bank Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Account Holder Name</label>
                    <input
                      type="text"
                      name="bankDetails.accountHolderName"
                      value={userData.bankDetails.accountHolderName}
                      onChange={handleChange}
                      className="mt-1 block w-full p-1.5 rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Account Number</label>
                    <input
                      type="text"
                      name="bankDetails.accountNumber"
                      value={userData.bankDetails.accountNumber}
                      onChange={handleChange}
                      className="mt-1 block w-full p-1.5 rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">IFSC Code</label>
                    <input
                      type="text"
                      name="bankDetails.ifscCode"
                      value={userData.bankDetails.ifscCode}
                      onChange={handleChange}
                      className="mt-1 block w-full p-1.5 rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Bank Name</label>
                    <input
                      type="text"
                      name="bankDetails.bankName"
                      value={userData.bankDetails.bankName}
                      onChange={handleChange}
                      className="mt-1 block w-full p-1.5 rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                    />
                  </div>
                </div>
              </div> */}

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading || !isAnyThingChanged}
                  className={`px-6 py-2 ${
                    isLoading
                      ? 'bg-gray-400'
                      : 'bg-blue-600 hover:bg-blue-700'
                  } text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile; 