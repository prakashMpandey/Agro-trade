import React from 'react'
import { useAuthStore } from '../../store/authStore'

const Categories = () => {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

    const {user}=useAuthStore()
  return (

  
    <div className=' bg-white shadow-lg p-2 shadow-black rounded-lg ' style={{'height':'10%','width':'60%'}}>

    <h2 className='font-bold text-2xl'>Categories You May Like</h2>

    <div className='flex flex-row justify-around items-center gap-2 rounded-lg shadow-lg bg-white border-1 border-gray-300 ' >

      <div className='flex flex-col p-2 items-center justify-center'>
        <img className="rounded-lg overflow-hidden object-cover"  src={user.avatar} alt="" />
       <div>
       <p>{user.username}</p>
       <button className='bg-blue-500 rounded-xl p-2 w-full text-white font-semibold'>Search auction</button>
       </div>
      </div>
     
    </div>
   
    </div>
  )
}

export default Categories
