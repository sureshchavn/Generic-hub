import React from 'react';
import { Link } from 'react-router-dom';
import { FacebookIcon, TwitterIcon, InstagramIcon } from './icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-gray-300 dark:bg-black dark:text-gray-400 pt-12 pb-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Generic Hub</h3>
            <p className="text-sm">
              Your trusted source for affordable, high-quality generic medications. We are committed to making healthcare accessible to everyone.
            </p>
          </div>
          
          {/* Quick Links Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/compare" className="hover:text-white transition-colors">Compare Medicines</Link></li>
              <li><Link to="/locator" className="hover:text-white transition-colors">Store Locator</Link></li>
            </ul>
          </div>

          {/* Contact Info Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li>123 Health St, Wellness City, 45678</li>
              <li>Phone: (123) 456-7890</li>
              <li>Email: <a href="mailto:support@generichub.com" className="hover:text-white transition-colors">support@generichub.com</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-center">
            &copy; {new Date().getFullYear()} Generic Hub. All Rights Reserved.
          </p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="#" className="hover:text-white transition-colors"><TwitterIcon /></a>
            <a href="#" className="hover:text-white transition-colors"><FacebookIcon /></a>
            <a href="#" className="hover:text-white transition-colors"><InstagramIcon /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;