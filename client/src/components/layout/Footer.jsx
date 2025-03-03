import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiYoutube } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-900 text-#5c5470 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">EI</span>
              </div>
              <h3 className="text-lg font-bold">Education Institute</h3>
            </div>
            <p className="text-secondary-300 mb-4">
              Committed to providing excellence in education and shaping the future leaders of tomorrow through innovation, integrity, and inclusivity.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-secondary-300 hover:text-primary-400 transition-colors" aria-label="Facebook">
                <FiFacebook size={20} />
              </a>
              <a href="https://twitter.com" className="text-secondary-300 hover:text-primary-400 transition-colors" aria-label="Twitter">
                <FiTwitter size={20} />
              </a>
              <a href="https://instagram.com" className="text-secondary-300 hover:text-primary-400 transition-colors" aria-label="Instagram">
                <FiInstagram size={20} />
              </a>
              <a href="https://youtube.com" className="text-secondary-300 hover:text-primary-400 transition-colors" aria-label="YouTube">
                <FiYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-secondary-700 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-secondary-300 hover:text-primary-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/vision-mission" className="text-secondary-300 hover:text-primary-400 transition-colors">Vision & Mission</Link>
              </li>
              <li>
                <Link to="/principal-message" className="text-secondary-300 hover:text-primary-400 transition-colors">Principal's Message</Link>
              </li>
              <li>
                <Link to="/admissions" className="text-secondary-300 hover:text-primary-400 transition-colors">Admissions</Link>
              </li>
              <li>
                <Link to="/news" className="text-secondary-300 hover:text-primary-400 transition-colors">News & Updates</Link>
              </li>
              <li>
                <Link to="/events" className="text-secondary-300 hover:text-primary-400 transition-colors">Events</Link>
              </li>
              <li>
                <Link to="/gallery" className="text-secondary-300 hover:text-primary-400 transition-colors">Gallery</Link>
              </li>
              <li>
                <Link to="/contact" className="text-secondary-300 hover:text-primary-400 transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-secondary-700 pb-2">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FiMapPin className="mt-1 text-primary-400 flex-shrink-0" />
                <span className="text-secondary-300">123 Education Lane, Knowledge City, State 12345</span>
              </li>
              <li className="flex items-center space-x-3">
                <FiPhone className="text-primary-400 flex-shrink-0" />
                <span className="text-secondary-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <FiMail className="text-primary-400 flex-shrink-0" />
                <a href="mailto:info@educationinstitute.com" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  info@educationinstitute.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-secondary-700 pb-2">Newsletter</h3>
            <p className="text-secondary-300 mb-4">
              Subscribe to our newsletter to receive updates and news about our institution.
            </p>
            <form className="space-y-2">
              <div>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full p-2 rounded bg-secondary-800 border border-secondary-700 text-white placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-secondary-800 text-center text-secondary-400 text-sm">
          <p>© {currentYear} Education Institute. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
