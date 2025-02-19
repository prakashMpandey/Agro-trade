import React, { useEffect } from 'react'
import { useState,useRef } from 'react'
import {motion} from "framer-motion"
import { useAuthStore } from '../../store/authStore'
import { useNavigate } from 'react-router-dom'
import {toast} from "react-hot-toast"
const VerificationEmailPage = () => {

    const navigate=useNavigate()



    const [code,setCode]=useState(["","","","","",""])
    const inputRefs=useRef([])
   

    const{verify_email,isLoading,error}=useAuthStore();



    

    const handleChange=(index,value)=>{


        const newCode=[...code];

        if(value.length>1)

        {
            const pastedCode=value.slice(0,6).split("");

            for(let i=0;i<6;i++)
            {
                newCode[i]=pastedCode[i];
            }
            setCode(newCode)

            
        }

        
        
        else{ newCode[index]=value;
            setCode(newCode)
    
            
            if(value && index < inputRefs.current.length - 1)
            {
                inputRefs.current[index+1].focus()
            }}
    }
    const handleKeyDown=(index,e)=>{

        if(e.key==='Backspace' && !code[index] && index>0)
        {
            inputRefs.current[index-1].focus();
        }
    }

    const handlePaste=(index,e)=>{

        e.preventDefault();
        const value=e.clipboardData.getData('text').split('').filter(char => char >= '0' && char <= '9').join('');
        const newCode=[...code];

        const pastedCode=value.split("");

        for(let i=0;i<6;i++){
            newCode[index+i]=pastedCode[i] || "";
        }

        setCode(newCode);

        const lastFilledIndex= newCode.findIndex((digit)=>digit ==="");
        const focusIndex = lastFilledIndex !== -1 ? lastFilledIndex : 5;

        inputRefs.current[focusIndex].focus();
      



        
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        const verificationCode=code.join("");
        try {
            const response =await verify_email(verificationCode);

            if(response.success)
            {
                toast.success("email verified successfully")
                navigate("/home")
            }

            toast.error(response.message)
            

        } catch (error) {

            
            console.log(error)
            toast.error("something went wrong try again later")
            navigate("/signin")
        }

    }
    useEffect(() => {

        if(code.every((digit)=> digit!==""))
        {
            handleSubmit(new Event("submit"));
        }
    }
    , [code])
    
  return (
<div className='flex h-screen justify-center items-center'>
<div className='max-w-sm w-full    bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shdow-xl overflow-hidden '>
     
     <motion.div initial={{opacity:0,y:-50}} animate={{opacity:1,y:0}} transition={{ducration:0.5
     }}
     className="bg-gray-800 bg-opacity-50  backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-5 w-full max-w-md">

     <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'> Verify your Email</h2>

     <p className='text-center text-gray-300 mb-6'>Enter the 6-digit code sent to your email address</p>

     <form action="" className='space-y-6'>
     
     <div className="flex justify-between">
     
        {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onPaste={(e)=> handlePaste(index,e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-10 h-10 bg-white font-bold text-black focus:border-green-500 focus:outline-none text-2xl text-center border-2 border-gray-300"
              />
            ))}
     
     </div>
     </form>

     {error && <div className='text-red-500 font-semibold mt-2 '>{error}</div>}
     <motion.button 
     whileHover={{scale:1.05}}
     whileTap={{scale:0.95}}
     type='submit'
     onSubmit={handleSubmit}
     disabled={isLoading}
     className='w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-3 px-3 rounded-lg shadow-lg
     
     hover:from-green-600 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-20 disabled:opacity-20 '>
Verify
     </motion.button>
     </motion.div>

    </div>
</div>
  )
}

export default VerificationEmailPage
