import { Children, useState } from 'react'
import {Routes,Route} from "react-router-dom"
import SignInPage from './pages/SignInPage.jsx'
import VerificationEmailPage from './pages/VerificationEmailPage.jsx'
import './App.css'
import ForgotPassword from './pages/forgotPassword.jsx'
import SignupPage from './pages/SignupPage.jsx'
import { useEffect } from 'react'
import {Toaster} from "react-hot-toast"
import HomePage from './pages/HomePage'
import { useAuthStore } from '../store/authStore.js'
import { Navigate } from 'react-router-dom'
import ResetPassword from './pages/ResetPassword.jsx'
import LoadingPage from './pages/LoadingPage.jsx'
import Navbar from './components/Navbar.jsx'
import CreateAuction from './pages/CreateAuction.jsx'
import AuctionPage from './pages/AuctionPage.jsx'
import {ToastContainer} from "react-toastify"
import EditProfile from './pages/EditProfile.jsx'
import AuctionTabPage from './pages/AuctionTabPage.jsx'
import InfoPage from './pages/InfoPage.jsx'
import MyListedAuctions from './pages/MyListedAuctions.jsx'
import MyBids from './pages/MyBidsPage.jsx'
import ContactUs from './pages/ContactUs.jsx'
import AboutUs from './pages/AboutUs.jsx'
import LandingPage from './pages/LandingPage'
import ProductDesc from './components/productDesc.jsx';
import CreateInfo from "./pages/AdminPages/CreateInfo.jsx"
import ParticipatedAuctions from './pages/ParticipatedAuctions'
import Footer from "./pages/Footer.jsx"
import SearchPage from './pages/SearchPage'
import AdminPage from './pages/AdminPage'
import Users from './pages/AdminPages/Users.jsx'
import Auctions from './pages/AdminPages/Auctions'
import Information from './pages/AdminPages/Information.jsx'
import NotFoundPage from './pages/NotFoundPage'
import UnauthorizedPage from './pages/UnauthorizedPage'
import ProfilePage from './pages/ProfilePage';
import MarketplacePage from './pages/MarketPlace.jsx'


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

    if(user.role==="admin")
    return <Navigate to="/admin"  replace />
    else{
      return <Navigate to="/home"  replace />
    }
  }

  return children
}

const RedirectAdmin=({children})=>{

  const {isAuthenticated,user}=useAuthStore();

  if(isAuthenticated && user.role==="admin")
  return children
  else
  return <Navigate to="/unauthorized"  replace />
}



const shouldShowNavbarAndFooter = !["/unauthorized", "*"].includes(window.location.pathname);

function App() {


 const{checkAuth,isAuthenticated,isCheckingAuth,user}= useAuthStore()

 useEffect(() => {
  const checkUserAuth = async () => {
    try {
      await checkAuth();
    } catch (error) {
      console.error("Auth check failed:", error);
      // Handle error appropriately
    }
  };
  
  checkUserAuth();
}, [checkAuth]);


 if(isCheckingAuth)
 {
  return <LoadingPage/>
 }
 
  return (
    <div className=''>


 {shouldShowNavbarAndFooter && <Navbar/>} 

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
    
    
    
    <Route path='/contact' element={<RedirectAuthenticatedUser><ContactUs/></RedirectAuthenticatedUser>}/>
    <Route path='/aboutus' element={<RedirectAuthenticatedUser><AboutUs/></RedirectAuthenticatedUser>}/>
    <Route path='/' element={<RedirectAuthenticatedUser><LandingPage/></RedirectAuthenticatedUser>}/>





    <Route path='/verify-email' element={<VerificationEmailPage/>}/>
    <Route path='/forgotPassword' element={<RedirectAuthenticatedUser><ForgotPassword/></RedirectAuthenticatedUser>}/>
    <Route path='/reset-password/:token' element={<RedirectAuthenticatedUser><ResetPassword/></RedirectAuthenticatedUser>}/>
    <Route path="/search" element={<ProtectedRoutes><SearchPage /></ProtectedRoutes>} />
    <Route path="/market" element={<ProtectedRoutes><MarketplacePage /></ProtectedRoutes>} />
    

    {/* admin routes */}
    <Route
      path="/admin"
      element={
      
          <RedirectAdmin><AdminPage/></RedirectAdmin>

      }
    />
        <Route path='/admin/create-info' element={<RedirectAdmin><CreateInfo/></RedirectAdmin>}/>
        <Route path='/admin/users' element={<RedirectAdmin><Users/></RedirectAdmin>}/>
        <Route path='/admin/auctions' element={<RedirectAdmin><Auctions/></RedirectAdmin>}/>
        <Route path='/admin/information' element={<RedirectAdmin><Information/></RedirectAdmin>}/>
    
    <Route path="/unauthorized" element={<UnauthorizedPage />} />
    <Route path="/profile" element={<ProtectedRoutes><ProfilePage /></ProtectedRoutes>} />
    <Route path="*" element={<NotFoundPage />} />
    </Routes>

    {shouldShowNavbarAndFooter &&<Footer/>}
    <Toaster/>
    <ToastContainer/>
    </div>
  )
}

export default App
