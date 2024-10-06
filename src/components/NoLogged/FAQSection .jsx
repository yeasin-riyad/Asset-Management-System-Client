import  { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; 

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'What is Track-My-Assets?',
      answer: 'Track-My-Assets is a platform that helps you manage, track, and optimize your company’s assets in real time, ensuring proper usage and seamless request handling.',
    },
    {
      question: 'How does the pricing work?',
      answer: 'We offer a variety of pricing packages based on the size of your company and the number of assets managed. You can choose a package that suits your needs and scale as your business grows.',
    },
    {
      question: 'Can I request a demo?',
      answer: 'Yes, you can request a free demo by signing up on our platform. Our team will guide you through the key features and how it can benefit your organization.',
    },
    {
      question: 'Is the platform suitable for small businesses?',
      answer: 'Absolutely! Track-My-Assets is designed to be scalable, making it suitable for both small businesses and large enterprises. You can start with a basic package and upgrade as your needs grow.',
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle the FAQ
  };

  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center">Frequently Asked Questions</h2>
        <p className="mt-4 max-w-2xl text-lg text-gray-500 dark:text-gray-300 mx-auto text-center">
          Find answers to some of the common questions about our platform.
        </p>
        <div className="mt-10 space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4">
              <div
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center cursor-pointer"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{faq.question}</h3>
                <span>
                  {activeIndex === index ? (
                    <FaChevronUp className="text-gray-500 dark:text-gray-300" />
                  ) : (
                    <FaChevronDown className="text-gray-500 dark:text-gray-300" />
                  )}
                </span>
              </div>
              {activeIndex === index && (
                <p className="mt-4 text-gray-600 dark:text-gray-300">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
