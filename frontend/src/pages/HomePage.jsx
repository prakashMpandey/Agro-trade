import React, { useState } from 'react'
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import {toast} from "react-hot-toast"
import Navbar from '../components/Navbar';
import InfoBanner from '../components/Categories';
import Card from '../components/card';
import Banner from '../components/Banner';
import { useEffect} from 'react';
import LoadingPage from './loadingPage';
import ContactDetailsModal from '../components/ContactDetailsModal';

const controller=new AbortController
const signal=controller.signal
const HomePage = () => {


  const navigate=useNavigate()
  const {isLoading,logout,Auction_URL,user,setLoadingState}=useAuthStore()
  const [auctions,setAuctions]=useState([])
  const [isContactDetailsModalOpen, setIsContactDetailsModalOpen] = useState(false);  
  useEffect(() => {

    const fetchItems=async ()=>{
      try {

        if(!user.contact)
        {
          setIsContactDetailsModalOpen(true)
        }

        setLoadingState()
      const response=await fetch(`${Auction_URL}/getAllauctions`,{
        method:"GET",
        credentials:"include",
        signal
      })

        if(!response.ok)
        {
          toast.error("something went wrong")
    
          return;
        }
        const data = await response.json();
        setAuctions(data.data);
        console.log(data.data);
       

      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
         
        } else {
          console.error("Error fetching auctions:", error);
          toast.error("An error occurred. Please try again.");
          
        }

      }

      finally{
        setLoadingState()
      }

    }

     fetchItems()

  
  }, [])
  

  if(isLoading)
  {
    return <LoadingPage/>
  }

  return (

   <>


   {/* <InfoBanner/> */}
     <div className='bg-white max-w-6xl   p-6 my-2 drop-shadow-lg  rounded-lg min-h-screen   mx-auto text-gray-600'>

     <Banner/>
     {
      auctions.map((auction,index)=>(
        <Card auction={auction} key={auction._id}/>
      ))
     }

</div>
    <ContactDetailsModal 
      isOpen={isContactDetailsModalOpen} 
      onClose={() => setIsContactDetailsModalOpen(false)} 
    />
   </>
    
   
  )
}

export default HomePage
