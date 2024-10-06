import { FaCogs, FaClock, FaClipboardList } from 'react-icons/fa'; // Importing icons

const FeaturesSection = () => {
  const features = [
    {
      icon: <FaCogs className="text-blue-500 w-12 h-12 mb-4" />,
      title: 'Asset Management',
      description: 'Manage and track all your assets in one place, ensuring proper usage and optimization.',
    },
    {
      icon: <FaClock className="text-green-500 w-12 h-12 mb-4" />,
      title: 'Real-Time Tracking',
      description: 'Track your assets in real-time with our up-to-date monitoring system for better decision-making.',
    },
    {
      icon: <FaClipboardList className="text-yellow-500 w-12 h-12 mb-4" />,
      title: 'Request Management',
      description: 'Easily handle asset requests with a streamlined approval and management process.',
    },
  ];

  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center">
          Key Features
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-gray-500 dark:text-gray-300 mx-auto text-center">
          Discover how our platform can simplify and enhance your asset management process.
        </p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 text-center">
              {feature.icon}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-gray-500 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
