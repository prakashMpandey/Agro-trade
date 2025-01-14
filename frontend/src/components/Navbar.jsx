import React, { useState } from "react";
import { House, Gavel, LogOut, UserRound, UserPen, BookOpenText, Search } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuthStore();
  const [isOpen, setOpen] = useState(false);

  const toggleDropDown = () => {
    setOpen(!isOpen);
  };

  const handleLogOut = async (e) => {
    try {
      e.preventDefault();
      const response = await logout();

      if (!response) {
        toast.error("Cannot log out");
        return;
      }

      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  if (isAuthenticated) {
    return (
      <nav className="bg-gradient-to-r from-green-400 via-teal-500 to-blue-600 h-16 w-full px-4 md:px-6 flex items-center text-white shadow-lg">
        {/* Left Section */}
        <div className="left-section flex gap-4 md:gap-6 flex-1 items-center">
          <div className="logo font-bold text-lg tracking-wide">Logo</div>
          <div className="input flex-grow max-w-xs md:max-w-sm relative">
            <input
              type="text"
              className="w-full text-md p-2 text-gray-700 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 hover:scale-105 transition-transform duration-150"
              placeholder="Search..."
            />
            <Search className="absolute top-1/2 right-2 text-gray-500 transform -translate-y-1/2" />
          </div>
        </div>

        {/* Right Section */}
        <div className="right-section flex items-center gap-6 md:gap-10">
          <ul className="flex gap-6 md:gap-10 items-center">
            <NavLink className="relative group" to={"/home"}>
              <div className="flex flex-col items-center">
                <House className="hover:text-yellow-300 transition-colors duration-150" />
                <span className="absolute bottom-[-1.5rem] text-sm bg-gray-800 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                  Home
                </span>
              </div>
            </NavLink>
            <NavLink className="relative group" to={"/auction"}>
              <div className="flex flex-col items-center">
                <Gavel className="hover:text-yellow-300 transition-colors duration-150" />
                <span className="absolute bottom-[-1.5rem] text-sm bg-gray-800 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                  Auction
                </span>
              </div>
            </NavLink>
            <NavLink className="relative group" to={"/info"}>
              <div className="flex flex-col items-center">
                <BookOpenText className="hover:text-yellow-300 transition-colors duration-150" />
                <span className="absolute bottom-[-1.5rem] text-sm bg-gray-800 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                  Info
                </span>
              </div>
            </NavLink>
            <li className="relative group">
              <div className="flex flex-col items-center">
                
                  <div className="h-10 w-10 focus:ring-2 focus:blur-lg border-gray-500 hover:shadow-md capitalize">
                    <button className="h-full w-full" onClick={toggleDropDown}>
                      <img
                        src={user.avatar || (
                  <UserRound className="hover:text-yellow-300 transition-colors duration-150" />
                )}
                        alt=""
                        className="rounded-full h-full w-full"
                      />
                    </button>
                    <div
                      id="dropDown"
                      className={`bg-white w-40 absolute right-0 transform translate-y-2 shadow-lg rounded-md z-50 
                      transition-all duration-200 ease-in-out ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`}
                    >
                      <ul className="w-full flex flex-col text-gray-700 ">
                        <li className="border-b border-gray-300 px-4 py-2 hover:bg-gray-100">
                          <div className="div flex items-center gap-2" onClick={handleLogOut}>
                            <LogOut />
                            <p>Logout</p>
                          </div>
                        </li>
                        <li className="border-b border-gray-300 px-4 py-2 hover:bg-gray-100">
                          <Link to={"/myAuction"}>My Auction</Link>
                        </li>
                        <li className="border-b border-gray-300 px-4 py-2 hover:bg-gray-100">
                          <div className="div flex items-center gap-2">
                            <UserPen />
                            <Link to={"/edit-details"}>Edit Details</Link>
                          </div>
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100">
                          <Link to={"/contact-us"}>Contact Us</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                 
                <span className="absolute bottom-[-1.5rem] text-sm bg-gray-800 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                  Account
                </span>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }

  // If not authenticated, render a basic navbar or nothing
  return (
    <nav className="bg-gradient-to-r from-green-400 via-blue-600 to-teal-600 h-16 w-full px-4 md:px-6 flex items-center justify-between text-white shadow-lg">
      <div className="logo font-bold text-lg tracking-wide">Logo</div>

      <div className="right-section flex items-center gap-6 md:gap-10">
          <ul className="flex gap-6 md:gap-10 items-center">
            <NavLink className="" to={"/signin"}>
              <div className="flex flex-col items-center">
                <span className=" text-md p-2  text-white px-2 py-1 rounded-md  transition-opacity duration-150">
                  Sign In
                </span>
              </div>
            </NavLink>
            <NavLink className="" to={"/signup"}>
              <div className="flex flex-col items-center">
                <span className=" text-md p-2  text-white px-2 py-1 rounded-md  transition-opacity duration-150">
                  Sign Up
                </span>
              </div>
            </NavLink>
            </ul>
            </div>
    </nav>
  );
};

export default Navbar;
