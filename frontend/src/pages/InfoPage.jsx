import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Sprout, IndianRupee, Tractor, Filter } from 'lucide-react';

const sampleInfo = [
  {
    _id: '1',
    title: 'PM Kisan Samman Nidhi Yojana',
    description: 'Direct income support of ₹6000 per year to eligible farmer families in three equal installments.',
    category: 'schemes',
    image: 'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?ixlib=rb-4.0.3',
    source: 'Ministry of Agriculture',
    link: 'https://pmkisan.gov.in/',
    validTill: '2024-12-31'
  },
  {
    _id: '2',
    title: 'Drip Irrigation Technique',
    description: 'Modern irrigation method that saves water and nutrients by allowing water to drip slowly to the roots of plants.',
    category: 'techniques',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3',
    source: 'Agricultural Extension Service',
    link: 'https://agricoop.gov.in/divisiontype/rainfed-farming-system/programs'
  },
  {
    _id: '3',
    title: 'Modern Harvester Equipment',
    description: 'Latest combine harvester with advanced grain separation technology and GPS guidance system.',
    category: 'equipment',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3',
    source: 'Agricultural Machinery Portal',
    link: 'https://agrimachinery.nic.in/'
  },
  {
    _id: '4',
    title: 'Soil Health Card Scheme',
    description: 'Government scheme to issue soil cards to farmers which will carry crop-wise recommendations of nutrients.',
    category: 'schemes',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3',
    source: 'Soil Health Card Portal',
    link: 'https://soilhealth.dac.gov.in/',
    validTill: '2024-03-31'
  },
  {
    _id: '5',
    title: 'Vertical Farming Method',
    description: 'Innovative technique for growing crops in vertically stacked layers, perfect for urban farming.',
    category: 'techniques',
    image: 'https://images.unsplash.com/photo-1505471768190-275e2ad070c9?ixlib=rb-4.0.3',
    source: 'Agricultural Research Institute',
    link: 'https://icar.org.in/content/vertical-farming'
  },
  {
    _id: '6',
    title: 'Smart Irrigation Controller',
    description: 'IoT-based irrigation controller that automatically adjusts watering based on weather conditions.',
    category: 'equipment',
    image: 'https://images.unsplash.com/photo-1463123081488-789f998ac9c4?ixlib=rb-4.0.3',
    source: 'Agri-Tech Portal',
    link: 'https://agrionics.in/smart-irrigation'
  }
];

const InfoPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  const tabs = [
    { id: 'all', label: 'All', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'schemes', label: 'Schemes', icon: <IndianRupee className="w-5 h-5" /> },
    { id: 'techniques', label: 'Techniques', icon: <Sprout className="w-5 h-5" /> },
    { id: 'equipment', label: 'Equipment', icon: <Tractor className="w-5 h-5" /> }
  ];

  useEffect(() => {
    fetchInfo();
  }, [activeTab]);

  const fetchInfo = async () => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Filter based on activeTab
      const filteredData = activeTab === 'all' 
        ? sampleInfo 
        : sampleInfo.filter(item => item.category === activeTab);
      
      setInfo(filteredData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching info:', error);
      setLoading(false);
    }
  };

  const filteredInfo = info.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Farming Information Hub
        </h1>
        <p className="text-lg text-gray-600">
          Discover latest farming schemes, techniques, and equipment information
        </p>
      </div>

      {/* Search and Filter */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search information..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200
                    ${activeTab === tab.id
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {tab.icon}
                  <span className="hidden md:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInfo.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium
                      ${item.category === 'schemes' ? 'bg-blue-100 text-blue-800' :
                        item.category === 'techniques' ? 'bg-green-100 text-green-800' :
                          'bg-purple-100 text-purple-800'}`}
                    >
                      {item.category}
                    </span>
                    {item.source && (
                      <span className="text-sm text-gray-500">
                        Source: {item.source}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {item.description}
                  </p>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-green-600 hover:text-green-700"
                    >
                      Learn More
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  )}
                </div>
                {item.validTill && (
                  <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
                    <p className="text-sm text-gray-600">
                      Valid till: {new Date(item.validTill).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {!loading && filteredInfo.length === 0 && (
          <div className="text-center py-12">
            <Filter className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No results found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoPage;
