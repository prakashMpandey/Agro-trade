import React from 'react'
import { LoaderCircle } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { Circle } from 'lucide-react'
const LoadingPage = () => {

    const {isLoading}=useAuthStore()
  return (
    <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
  </div>
   
   )
  
}

export default LoadingPage
