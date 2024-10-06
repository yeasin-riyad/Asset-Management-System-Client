import { FaSearch, FaClipboardList, FaCheckCircle } from 'react-icons/fa'; // Example icons for steps

const HowItWorksSection = () => {
  const steps = [
    {
      icon: <FaSearch className="text-indigo-600 dark:text-indigo-400 text-4xl" />,
      title: 'Step 1: Discover Assets',
      description:
        'Easily browse and search for assets using our intuitive platform. Filter by type, availability, and more.',
    },
    {
      icon: <FaClipboardList className="text-indigo-600 dark:text-indigo-400 text-4xl" />,
      title: 'Step 2: Request Assets',
      description:
        'Once you find the asset you need, submit a request to your HR or manager. You can track the status in real-time.',
    },
    {
      icon: <FaCheckCircle className="text-indigo-600 dark:text-indigo-400 text-4xl" />,
      title: 'Step 3: Manage Approvals',
      description:
        'Managers and HR can quickly review and approve or reject requests, ensuring that all assets are properly managed.',
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center">How It Works</h2>
        <p className="mt-4 max-w-2xl text-lg text-gray-500 dark:text-gray-300 mx-auto text-center">
          Learn how to easily manage your assets in just a few simple steps.
        </p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{step.title}</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
