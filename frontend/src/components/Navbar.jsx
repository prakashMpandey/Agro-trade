import React, { useState, useRef, useEffect } from "react";
import { House, Gavel, LogOut, UserRound, UserPen, BookOpenText, Search, Menu, X, Store} from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuthStore();
  const [isOpen, setOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async(e) => {
    if(search.length === 0 || e.key !== "Enter") return;
    navigate(`/search?query=${encodeURIComponent(search.trim())}`);
    setSearch("");
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

  if (isAuthenticated && user?.role === "admin") return null;

  return (
    <nav className="sticky top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-3">
            {/* <img src="/logo.png" alt="Logo" className="h-8 w-auto" /> */}
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 text-transparent bg-clip-text">
            AgroTrade
            </span>
          </NavLink>

          {isAuthenticated && user? (
            <>
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {/* Search Bar */}
                <div className="relative w-64">
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleSearch}
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>

                {/* Nav Links */}

                <NavLink
                  to="/home"
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                      isActive
                        ? 'text-emerald-600 bg-emerald-50 font-medium'
                        : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
                    }`
                  }
                >
                  <House className="w-5 h-5" />
                  <span>Home</span>
                </NavLink>
                <NavLink
                  to="/market"
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                      isActive
                        ? 'text-emerald-600 bg-emerald-50 font-medium'
                        : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
                    }`
                  }
                >
                 <Store className="w-5 h-5" />
                  <span>Market</span>
               </NavLink>

                <NavLink
                  to="/auction"
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                      isActive
                        ? 'text-emerald-600 bg-emerald-50 font-medium'
                        : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
                    }`
                  }
                >
                  <Gavel className="w-5 h-5" />
                  <span>Auction</span>
                </NavLink>

                <NavLink
                  to="/info"
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                      isActive
                        ? 'text-emerald-600 bg-emerald-50 font-medium'
                        : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
                    }`
                  }
                >
                  <BookOpenText className="w-5 h-5" />
                  <span>Info</span>
                </NavLink>

                {/* User Menu */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setOpen(!isOpen)}
                    className="flex items-center space-x-2 focus:outline-none"
                  >
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 p-[2px]">
                      <div className="h-full w-full rounded-full bg-white p-[2px]">
                        {user?.avatar ? (
                          <img src={user.avatar} alt="" className="h-full w-full rounded-full object-cover" />
                        ) : (
                          <div className="h-full w-full rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 flex items-center justify-center text-white">
                            <span className="text-sm font-medium">{user?.username?.charAt(0).toUpperCase()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  {isOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-lg py-2 border border-gray-100">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user?.username}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                      <NavLink to="/profile" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50">
                        <UserRound className="w-4 h-4" />
                        <span>My profile</span>
                      </NavLink>
                      <NavLink to="/edit-details" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50">
                        <UserPen className="w-4 h-4" />
                        <span>Edit Profile</span>
                      </NavLink>
                      <button
                        onClick={handleLogOut}
                        className="w-full flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign out</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <NavLink
                to="/signin"
                className={({ isActive }) =>
                  `px-6 py-2 rounded-full transition-all duration-200 ${
                    isActive
                      ? 'text-emerald-600 bg-emerald-50 font-medium'
                      : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
                  }`
                }
              >
                Sign In
              </NavLink>
              <NavLink
                to="/signup"
                className=" px-4 sm:px-6 py-1 sm:py-2 rounded-full bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-200"
              >
                Sign Up
              </NavLink>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isAuthenticated && isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-3">
            {/* Mobile Search */}
            <div className="relative">
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleSearch}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>


            {/* Mobile Nav Links */}
            <NavLink to="/home" className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50">
              <House className="w-5 h-5" />
              <span>Home</span>
            </NavLink>
            <NavLink to="/auction" className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50">
              <Gavel className="w-5 h-5" />
              <span>Auction</span>
            </NavLink>
            <NavLink to="/info" className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50">
              <BookOpenText className="w-5 h-5" />
              <span>Info</span>
            </NavLink>
            <NavLink
                  to="/market"
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                      isActive
                        ? 'text-emerald-600 bg-emerald-50 font-medium'
                        : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
                    }`
                  }
                >
                 <Store className="w-5 h-5" />
                  <span>Market</span>
                </NavLink>
                <button
                        onClick={handleLogOut}
                        className="w-full flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign out</span>
                      </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
