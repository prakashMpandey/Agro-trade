import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../../store/authStore'
import { useNavigate } from 'react-router-dom'

const Card = (props) => {

 

  const {user}=useAuthStore()
  const [timeLeft,setTimeLeft]=useState('');
  const navigate=useNavigate()

  const calculateTime=()=>{

    const endTime=new Date(props.auction.endTime).getTime();
    const currentTime=new Date().getTime()

    const difference=endTime-currentTime;


    if(difference>0)
    {
      const hours=Math.floor(difference/(60*60*1000)%24).toString().padStart(2,'0')
      const minutes=Math.floor(difference/(60*1000)%60).toString().padStart(2,'0')
      const seconds=Math.floor((difference/1000)%60).toString().padStart(2,'0')

      setTimeLeft(`${hours}:${minutes}:${seconds}`)

     
    }
    else {
      setTimeLeft("Auction ended");
    }

  }

  //redirect to bet
  const handleBid=(e)=>{

    navigate(`/auction/${props.auction._id}`,)
    
  }
  
  useEffect(() => {
    calculateTime()
    const timer=setInterval(calculateTime,1000);

  
    return () => {
      clearInterval(timer)
    }
  }, [])
  
  return (
    <div className='bg-white relative flex flex-col md:flex-row overflow-hidden transform transition duration-500 hover:scale-105 rounded-xl mb-4 shadow-xl p-6 max-w-7xl w-full'>
      <div className='md:w-1/3 mb-4 md:mb-0' onClick={()=>{navigate(`/product/${props.auction._id}`)}}>
        <img 
          className='w-full h-64 md:h-full object-cover rounded-xl shadow-md'
          src={props.auction.product.p_image} 
          alt={props.auction.product.p_name}
        />
      </div>

      <div className='md:w-2/3 md:pl-8 relative'>
        <div className='absolute top-0 right-0'>
          <span className='inline-flex items-center px-4 py-2 bg-red-500 text-white font-semibold rounded-xl shadow-lg hover:animate-pulse'>
            <span className='mr-2 h-2 w-2 bg-white rounded-full animate-ping'></span>
            Live Auction
          </span>
        </div>

        <h2 className='text-2xl font-bold text-gray-800 mb-4 capitalize mt-8 md:mt-0'>
          {props.auction.product.p_name}
        </h2>
        
        <p className='text-gray-600 text-lg mb-6 leading-relaxed'>
          {props.auction.product.p_desc 
            ? props.auction.product.p_desc.slice(0,150) 
            : "Bid now to get organic wheat straight from the farm, the finest quality."
          }
          <span className='text-blue-500 hover:text-blue-700 cursor-pointer' onClick={()=>{navigate(`/product/${props.auction._id}`)}}>...read more</span>
        </p>

        <div className='flex flex-wrap items-center justify-between mb-6 bg-gray-50 p-4 rounded-lg'>
          <div className='flex flex-col'>
            <span className='text-gray-500 text-sm'>Current Bid</span>
            <span className='text-2xl font-bold text-green-500'>₹5000/quintal</span>
          </div>
          
          <div className='flex flex-col text-right'>
            <span className='text-gray-500 text-sm'>Time Remaining</span>
            <span className='text-xl font-bold text-red-500'>{timeLeft}</span>
          </div>
        </div>

        <button 
          onClick={handleBid} 
          className='w-full bg-blue-600 text-lg font-semibold rounded-xl py-3 px-6 text-white hover:bg-blue-700 transform transition hover:-translate-y-1 shadow-lg'
        >
          Join Auction
        </button>
      </div>
    </div>
  )
}

export default Card
