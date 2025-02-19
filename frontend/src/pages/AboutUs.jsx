import React from 'react';
import { 
  Users, 
  Target, 
  Award, 
  Sprout, 
  ShieldCheck, 
  TrendingUp,
  Handshake,
  Scale
} from 'lucide-react';

const AboutUs = () => {
  const stats = [
    { label: 'Active Farmers', value: '10,000+' },
    { label: 'Successful Auctions', value: '50,000+' },
    { label: 'States Covered', value: '15+' },
    { label: 'Trading Volume', value: '₹100Cr+' }
  ];

  const values = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-green-600" />,
      title: 'Trust & Transparency',
      description: 'We ensure secure and transparent transactions between farmers and buyers.'
    },
    {
      icon: <Handshake className="w-8 h-8 text-green-600" />,
      title: 'Fair Trading',
      description: 'Our platform promotes fair pricing and equal opportunities for all participants.'
    },
    {
      icon: <Scale className="w-8 h-8 text-green-600" />,
      title: 'Quality Assurance',
      description: 'We maintain high standards for agricultural products traded on our platform.'
    },
    {
      icon: <Sprout className="w-8 h-8 text-green-600" />,
      title: 'Farmer Empowerment',
      description: 'We work towards empowering farmers through technology and market access.'
    }
  ];

  const team = [
    {
      name: 'kakarot',
      position: 'Founder & CEO',
      image: 'goku.png'
    },
    {
      name: 'Jethalal Champaklal Gada',
      position: 'Head of Operations',
      image:"jethalal.webp"
    },
    {
      name: 'Krishnan Iyer ',
      position: 'Technical Director',
      image: 'krishnan.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-teal-500 to-blue-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              Revolutionizing Agricultural Trade
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              We're building India's largest agricultural auction platform, connecting farmers directly with buyers for better prices and transparency.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50"></div>
      </div>

      {/* Stats Section */}
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-xl shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            To create a sustainable and efficient agricultural marketplace that empowers farmers 
            and ensures fair prices through technology-driven solutions.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {values.map((value, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-gradient-to-r from-teal-50 to-blue-50 rounded-full">
                  {React.cloneElement(value.icon, { className: "w-8 h-8 text-teal-600" })}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Vision Section */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
            <p className="text-lg text-gray-600 mb-8">
              To become the most trusted agricultural trading platform in India, 
              fostering direct farmer-to-buyer relationships and contributing to 
              the growth of the agricultural sector.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">``
              <div className="flex flex-col items-center">
                <Target className="w-12 h-12 text-teal-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Market Access</h3>
                <p className="text-gray-600">Connecting farmers to nationwide markets</p>
              </div>
              <div className="flex flex-col items-center">
                <TrendingUp className="w-12 h-12 text-teal-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Better Prices</h3>
                <p className="text-gray-600">Ensuring fair prices for agricultural produce</p>
              </div>
              <div className="flex flex-col items-center">
                <Award className="w-12 h-12 text-teal-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Standards</h3>
                <p className="text-gray-600">Maintaining high quality benchmarks</p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Meet the people driving our mission forward
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-gray-600">{member.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Growing Community</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Be part of India's digital agricultural revolution. Join thousands of farmers and buyers 
            already benefiting from our platform.
          </p>
          <button className="bg-white text-teal-600 px-8 py-3 rounded-lg font-medium hover:bg-teal-50 transition-colors duration-200">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;