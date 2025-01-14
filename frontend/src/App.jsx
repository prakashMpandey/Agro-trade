import { Children, useState } from 'react'
import {Routes,Route} from "react-router-dom"
import SignInPage from './pages/SignInPage'
import VerificationEmailPage from './pages/verificationEmailPage'
import './App.css'
import ForgotPassword from './pages/forgotPassword'
import SignupPage from './pages/SignupPage'
import { useEffect } from 'react'
import {Toaster} from "react-hot-toast"
import HomePage from './pages/HomePage'
import { useAuthStore } from '../store/authStore'
import { Navigate } from 'react-router-dom'
import ResetPassword from './pages/resetPassword'
import LoadingPage from './pages/loadingPage'
import Navbar from './components/Navbar'
import CreateAuction from './pages/createAuction'
import AuctionPage from './pages/AuctionPage'
import {ToastContainer} from "react-toastify"
import EditProfile from './pages/EditProfile'
import AuctionTabPage from './pages/AuctionTabPage'
import InfoPage from './pages/InfoPage'
import MyListedAuctions from './pages/MyListedAuctions'
import MyBids from './pages/MyBidsPage'
import ContactUs from './pages/ContactUs'
import AboutUs from './pages/AboutUs'
import LandingPage from './pages/LandingPage'
import ProductDesc from './components/productDesc';
import CreateInfo from "./pages/AdminPages/createInfo.jsx"
import ParticipatedAuctions from './pages/ParticipatedAuctions'
import Footer from "./pages/footer"
const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

const RedirectAuthenticatedUser=({children})=>{

  const {isAuthenticated,user}=useAuthStore();
  
  if(isAuthenticated && user)
  {

    return <Navigate to="/home"  replace />
  }

  return children
}


function App() {


 const{checkAuth,isAuthenticated,isCheckingAuth}= useAuthStore()

 useEffect(() => {


    checkAuth()

 }, [checkAuth])


 if(isCheckingAuth)
 {
  return <LoadingPage/>
 }
 
  return (
    <div className=''>

<Navbar/>
    <Routes>

    <Route path='/signup' element={<RedirectAuthenticatedUser ><SignupPage/></RedirectAuthenticatedUser>}/>
    <Route path='/signin' element={<RedirectAuthenticatedUser ><SignInPage/></RedirectAuthenticatedUser>}/>


{//protected routes 
}
    <Route path='/home' element={<ProtectedRoutes><HomePage/></ProtectedRoutes>}/>
    <Route path='/auction' element={<ProtectedRoutes><AuctionTabPage/></ProtectedRoutes>}/>
    <Route path='/create-auction' element={<ProtectedRoutes><CreateAuction/></ProtectedRoutes>}/>
    <Route path='/auction/:auctionId' element={<ProtectedRoutes><AuctionPage/></ProtectedRoutes>}/>
    <Route path='/edit-details' element={<ProtectedRoutes><EditProfile/></ProtectedRoutes>}/>
    <Route path='/info' element={<ProtectedRoutes><InfoPage/></ProtectedRoutes>}/>
    <Route path='/participated-auctions' element={<ProtectedRoutes><ParticipatedAuctions/></ProtectedRoutes>}/>
    <Route path='/my-auctions' element={<ProtectedRoutes><MyListedAuctions/></ProtectedRoutes>}/>
    <Route path='/my-bids' element={<ProtectedRoutes><MyBids/></ProtectedRoutes>}/>
    <Route path='/product/:auctionId' element={<ProtectedRoutes><ProductDesc/></ProtectedRoutes>}/>
    
    
    
    <Route path='/contact-us' element={<ContactUs/>}/>
    <Route path='/admin/create-info' element={<CreateInfo/>}/>
    <Route path='/about us' element={<AboutUs/>}/>
    <Route path='/' element={<LandingPage/>}/>





    <Route path='/verify-email' element={<VerificationEmailPage/>}/>
    <Route path='/forgotPassword' element={<RedirectAuthenticatedUser><ForgotPassword/></RedirectAuthenticatedUser>}/>
    <Route path='/reset-password/:token' element={<RedirectAuthenticatedUser><ResetPassword/></RedirectAuthenticatedUser>}/>
    </Routes>

    <Footer/>
    <Toaster/>
    <ToastContainer/>
    </div>
  )
}

export default App
