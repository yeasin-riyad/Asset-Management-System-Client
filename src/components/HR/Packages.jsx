import { FaUserAlt, FaUserFriends, FaUsers } from 'react-icons/fa';
import PayMentModal from '../PaymentModal';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Packages = () => {
  const [open, setOpen] = useState(false);
  const [pay, setPay] = useState(0);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const packageLimit = parseInt(queryParams.get('packageLimit'), 10); // Ensure packageLimit is a number

  console.log('Package Limit:', packageLimit);

  const handleChoosePlan = (amount) => {
    setPay(amount);
    setOpen(true);
  };

  return (
    <section className="py-12">
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
              <li>- 5 employees</li>
              <li>- Basic support</li>
              <li>- Asset tracking</li>
            </ul>
            <button
              onClick={() => handleChoosePlan(5)}
              disabled={packageLimit >= 5} // Disable if packageLimit is 5 or more
              className={`mt-6 w-full text-white font-bold py-2 px-4 rounded ${
                packageLimit >= 5 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
              }`}
            >
              {packageLimit >= 5 ? 'Plan Active' : 'Choose Plan'}
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
              <li>- 10 employees</li>
              <li>- Priority support</li>
              <li>- Advanced asset tracking</li>
            </ul>
            <button
              onClick={() => handleChoosePlan(8)}
              disabled={packageLimit >= 10} // Disable if packageLimit is 10 or more
              className={`mt-6 w-full text-white font-bold py-2 px-4 rounded ${
                packageLimit >= 10 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
              }`}
            >
              {packageLimit >= 10 ? 'Plan Active' : 'Choose Plan'}
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
              <li>- 20 employees</li>
              <li>- Premium support</li>
              <li>- Comprehensive asset tracking</li>
            </ul>
            <button
              onClick={() => handleChoosePlan(15)}
              disabled={packageLimit >= 20} // Disable if packageLimit is 20 or more
              className={`mt-6 w-full text-white font-bold py-2 px-4 rounded ${
                packageLimit >= 20 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
              }`}
            >
              {packageLimit >= 20 ? 'Plan Active' : 'Choose Plan'}
            </button>
          </div>
        </div>
      </div>
      <div>
        <PayMentModal open={open} pay={pay} />
      </div>
    </section>
  );
};

export default Packages;
