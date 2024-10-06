import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const ContactUsSection = () => {
  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center">Contact Us</h2>
        <p className="mt-4 max-w-2xl text-lg text-gray-500 dark:text-gray-300 mx-auto text-center">
          Have questions? Reach out to us for support, queries, or more information.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Send Us a Message</h3>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Write your message here"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info and Social Links */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h3>
            <ul className="space-y-4">
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <FaPhoneAlt className="text-indigo-600 dark:text-indigo-400 mr-3" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <FaEnvelope className="text-indigo-600 dark:text-indigo-400 mr-3" />
                support@trackmyassets.com
              </li>
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <FaMapMarkerAlt className="text-indigo-600 dark:text-indigo-400 mr-3" />
                1234 Asset Street, City, Country
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Follow Us</h3>
            <div className="flex space-x-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400">
                <FaFacebook className="text-2xl" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400">
                <FaTwitter className="text-2xl" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400">
                <FaLinkedin className="text-2xl" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsSection;
