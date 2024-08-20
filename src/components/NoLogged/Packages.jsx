import React from 'react';
import { FaUserAlt, FaUserFriends, FaUsers } from 'react-icons/fa';

const Packages = () => {
  return (
    <section className=" py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-300 sm:text-4xl">Our Packages</h2>
          <p className="mt-4 text-lg text-gray-300">Choose a package that suits your business needs.</p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-6">
          {/* Package 1 */}
          <div className="bg-gray-100 rounded-lg shadow-lg p-6 w-full md:w-1/3">
            <div className="flex items-center justify-center text-blue-500 mb-4">
              <FaUserAlt size={48} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Maximum 5 Employees</h3>
            <p className="mt-4 text-lg text-gray-600">$5 per month</p>
            <ul className="mt-4 text-gray-700">
              <li>-  5 employees</li>
              <li>- Basic support</li>
              <li>- Asset tracking</li>
            </ul>
            <button className="mt-6 w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
              Choose Plan
            </button>
          </div>
          {/* Package 2 */}
          <div className="bg-gray-100 rounded-lg shadow-lg p-6 w-full md:w-1/3">
            <div className="flex items-center justify-center text-blue-500 mb-4">
              <FaUserFriends size={48} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Maximum 10 Employees</h3>
            <p className="mt-4 text-lg text-gray-600">$8 per month</p>
            <ul className="mt-4 text-gray-700">
              <li>-  10 employees</li>
              <li>- Priority support</li>
              <li>- Advanced asset tracking</li>
            </ul>
            <button className="mt-6 w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
              Choose Plan
            </button>
          </div>
          {/* Package 3 */}
          <div className="bg-gray-100 rounded-lg shadow-lg p-6 w-full md:w-1/3">
            <div className="flex items-center justify-center text-blue-500 mb-4">
              <FaUsers size={48} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Maximum 20 Employees</h3>
            <p className="mt-4 text-lg text-gray-600">$15 per month</p>
            <ul className="mt-4 text-gray-700">
              <li>-  20 employees</li>
              <li>- Premium support</li>
              <li>- Comprehensive asset tracking</li>
            </ul>
            <button className="mt-6 w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
              Choose Plan
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Packages;
