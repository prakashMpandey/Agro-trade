import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit, 
  Gavel, 
  Package, 
  Award,
  Loader,
  ShoppingBag,
  Plus,
  Clock,
  DollarSign,
  Tag,
  ArrowRight,
  History,
  TrendingUp,
  BarChart3,
  ShoppingCart
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const ProfilePage = () => {
  const { user, Auction_URL } = useAuthStore();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [productStats, setProductStats] = useState({
    active: 0,
    sold: 0,
    totalEarnings: 0
  });
  const [bidHistory, setBidHistory] = useState([]);
  const [wonAuctions, setWonAuctions] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${Auction_URL}/dashboard-stats`, {
          credentials: 'include'
        });
        const data = await response.json();
        setStats(data.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
        toast.error('Failed to load profile statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();


    if (user?.role === 'farmer') {
      const fetchProducts = async () => {
        try {
          const response = await fetch(`${Auction_URL}/myAuctions`, {
            credentials: 'include'
          });
          const data = await response.json();
          setProducts(data.data);
          
          // Calculate product stats
          const active = data.data.filter(p => p.status === 'active').length;
          const sold = data.data.filter(p => p.status === 'completed').length;
          const earnings = data.data
            .filter(p => p.status === 'completed')
            .reduce((sum, p) => sum + p.highestBid, 0);
          
          setProductStats({ active, sold, earnings });
        } catch (error) {
          console.error('Error fetching products:', error);
          toast.error('Failed to load products');
        }
      };

      fetchProducts();
    } else if (user?.role === 'business') {
      const fetchBusinessData = async () => {
        try {
          
          const bidsResponse = await fetch(`${Auction_URL}/myBids`, {
            credentials: 'include'
          });
          const bidsData = await bidsResponse.json();
          setBidHistory(bidsData.data);

          
        } catch (error) {
          console.error('Error fetching business data:', error);
          toast.error('Failed to load business data');
        }
      };

      fetchBusinessData();
    }
  }, [Auction_URL, user?.role]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-emerald-500" />
      </div>
    );
  }

 
  const BusinessContent = () => (
    <div className="col-span-12 lg:col-span-8">
      <div className="space-y-6">
        {/* Business Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Investment</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  ₹{bidHistory
                    .reduce((sum, bid) => sum + bid.bid_amount, 0)
                    .toLocaleString()}
                </h3>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-600">
              <BarChart3 className="w-4 h-4 mr-1" />
              <span>Based on your winning bids</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Success Rate</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {stats?.wonAuctions > 0
                    ? Math.round((stats.wonAuctions / stats.totalBids) * 100)
                    : 0}%
                </h3>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <Award className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-600">
              <ShoppingCart className="w-4 h-4 mr-1" />
              <span>{stats?.wonAuctions} auctions won</span>
            </div>
          </div>
        </div>

       
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {bidHistory.slice(0, 5).map((bid) => (
              <div key={bid._id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Gavel className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        Bid on {bid.auction.product.p_name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {new Date(bid.bid_time).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      ₹{bid.bid_amount.toLocaleString()}
                    </p>
                    <p className={`text-sm ${
                      bid.auction.highestBidder === user._id
                        ? 'text-green-600'
                        : 'text-gray-500'
                    }`}>
                      {bid.auction.highestBidder === user._id ? 'Winning' : 'Outbid'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {bidHistory.length === 0 && (
            <div className="p-8 text-center">
              <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Activity Yet</h3>
              <p className="text-gray-600 mb-4">
                Start participating in auctions to see your activity here
              </p>
              <button
                onClick={() => navigate('/auction')}
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Browse Auctions →
              </button>
            </div>
          )}
        </div>

        {/* Watchlist or Interested Items */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Active Bids</h2>
            <button
              onClick={() => navigate('/auction')}
              className="text-emerald-600 hover:text-emerald-700 font-medium text-sm"
            >
              View All →
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {bidHistory
              .filter(bid => bid.auction.status === 'active')
              .slice(0, 4)
              .map((bid) => (
                <div
                  key={bid._id}
                  className="group relative bg-gray-50 rounded-xl overflow-hidden hover:shadow-md transition-all duration-200"
                >
                  <img
                    src={bid.auction.product.p_image}
                    alt={bid.auction.product.p_name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900">
                      {bid.auction.product.p_name}
                    </h3>
                    <div className="mt-2 flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        Your bid: ₹{bid.bid_amount.toLocaleString()}
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        bid.auction.highestBidder === user._id
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {bid.auction.highestBidder === user._id ? 'Winning' : 'Outbid'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-500 to-blue-500 h-80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end">
          <div className="flex flex-col sm:flex-row items-center sm:items-end pb-6 gap-6">
            <div className="relative -mb-20">
              <img
                src={user?.avatar || 'https://via.placeholder.com/160'}
                alt={user?.username}
                className="w-40 h-40 rounded-2xl border-4 border-white shadow-xl object-cover"
              />
              <button 
                onClick={() => navigate('/edit-details')}
                className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50"
              >
                <Edit className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="text-center sm:text-left pb-4">
              <h1 className="text-3xl font-bold text-white mb-2">{user?.username}</h1>
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm capitalize">
                  {user?.role}
                </span>
                <span className="text-white/80 text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Joined {new Date(user?.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-8">
 
          <div className="col-span-12 lg:col-span-4 space-y-6">
        
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-900 font-medium">{user?.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-gray-900 font-medium">
                      {user?.contact.mobile.countryCode} {user?.contact?.mobile?.phoneNo || 'Not provided'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="text-gray-900 font-medium">
                      {user?.contact ? (
                        `${user.contact.street}, ${user.contact.city}, ${user.contact.state} - ${user.contact.pinCode}`
                      ) : (
                        'Address not provided'
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Activity Overview</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Package className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">Total Auctions</span>
                  </div>
                  <span className="text-xl font-semibold text-blue-600">{stats?.totalAuctions || 0}</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Gavel className="w-5 h-5 text-emerald-600" />
                    <span className="text-gray-700">Active Auctions</span>
                  </div>
                  <span className="text-xl font-semibold text-emerald-600">{stats?.activeAuctions || 0}</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Award className="w-5 h-5 text-purple-600" />
                    <span className="text-gray-700">Won Auctions</span>
                  </div>
                  <span className="text-xl font-semibold text-purple-600">{stats?.wonAuctions || 0}</span>
                </div>
              </div>
            </div>
          </div>

      
          {user?.role === 'farmer' ? (
           
            <div className="col-span-12 lg:col-span-8">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">My Products</h2>
                    <p className="text-gray-600">Manage your product listings</p>
                  </div>
                  <button
                    onClick={() => navigate('/create-auction')}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all duration-200"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Add New Product</span>
                  </button>
                </div>

                {/* Product Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <Tag className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Active Listings</p>
                        <p className="text-2xl font-bold text-gray-900">{productStats.active}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-green-100 rounded-lg">
                        <ShoppingBag className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Products Sold</p>
                        <p className="text-2xl font-bold text-gray-900">{productStats.sold}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-yellow-100 rounded-lg">
                        <DollarSign className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Earnings</p>
                        <p className="text-2xl font-bold text-gray-900">₹{productStats.earnings.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {products.map((product) => (
                    <div 
                      key={product._id} 
                      className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="aspect-w-16 aspect-h-9">
                        <img
                          src={product.product.p_image}
                          alt={product.product.p_name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-1">
                              {product.product.p_name}
                            </h3>
                            <p className="text-gray-600">{product.product.p_desc}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            product.status === 'active' 
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {product.status}
                          </span>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t">
                          <div className="flex items-center space-x-2 text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span>Ends: {new Date(product.endTime).toLocaleDateString()}</span>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Current Bid</p>
                            <p className="text-xl font-bold text-gray-900">₹{product.highestBid.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Empty State */}
                {products.length === 0 && (
                  <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
                    <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Listed</h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      Start your journey by adding your first product to the marketplace
                    </p>
                    <button
                      onClick={() => navigate('/create-auction')}
                      className="inline-flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      <span>Add Your First Product</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Business user content
            <BusinessContent />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 