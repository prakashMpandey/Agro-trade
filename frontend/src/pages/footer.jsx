import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  
  Mail,
  Phone,
  MapPin,
  Heart
} from 'lucide-react';

const Footer = () => {
  const navigate = useNavigate();

  const quickLinks = [
    { name: 'About Us', path: '/aboutus' },
    { name: 'Contact', path: '/contact-us' },
    // { name: 'FAQs', path: '/faqs' },
    // { name: 'Terms & Conditions', path: '/terms' },
    // { name: 'Privacy Policy', path: '/privacy' }
  ];

  // const services = [
  //   { name: 'Marketplace', path: '/marketplace' },
  //   { name: 'Create Auction', path: '/create-auction' },
  //   { name: 'My Bids', path: '/my-bids' },
  //   { name: 'My Auctions', path: '/my-auctions' }
  // ];

//   const socialLinks = [
//     { icon: <Facebook className="w-5 h-5" />, url: 'https://facebook.com' },
//     { icon: <Twitter className="w-5 h-5" />, url: 'https://twitter.com' },
//     { icon: <Instagram className="w-5 h-5" />, url: 'https://instagram.com' },
//     { icon: <Linkedin className="w-5 h-5" />, url: 'https://linkedin.com' }
//   ];

  return (
    <footer className="bg-white border-t mt-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent mb-4">
            AgroTrade
            </h3>
            <p className="text-gray-600 mb-4">
              Empowering farmers through technology and fair trade practices.
            </p>
            {/* <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div> */}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-gray-600 hover:text-teal-600 transition-colors duration-200"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

         

          <div>
            <h3 className="text-gray-900 font-semibold mb-4" >Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-teal-600 mt-1" />
                <div>
                  <p className="text-gray-600">+91 123 456 7890</p>
                  <p className="text-gray-600">+91 987 654 3210</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-teal-600 mt-1" />
                <div>
                  <p className="text-gray-600">support@AgroTrade.com</p>
                  <p className="text-gray-600">info@prakashmanipandey685@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-teal-600 mt-1" />
                <p className="text-gray-600">
                  123 harshit Nagar,<br />
                  raipur,chhattisgarh<br />
                  India-492099
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Agro trade. All rights reserved.
            </p>
            <p className="text-gray-600 text-sm flex items-center">
              Made with <Heart className="w-4 h-4 text-red-500 mx-1" /> in India
            </p>
            <p className="text-gray-600 text-sm flex items-center">
              It is for education purpose,so any transaction done with it are not viable
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
