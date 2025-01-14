import React from 'react'

const Input = (props) => {
 
  return (
   
    <div className='relative mb-3 p-4 '>
      <div className="h-5  text-gray-500">

        <input placeholder={props.placeholder} className='h-9 w-full rounded-md placeholder:text-lg  capitalize border-2 border-gray-500 p-3'  />

        
      </div>
    </div>
  )
}

export default Input
