
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'John Doe',
      title: 'HR Manager',
      image: 'https://randomuser.me/api/portraits/men/32.jpg', // Example image
      review:
        'This platform has completely transformed how we manage our assets. The real-time tracking and request management features are game-changers!',
    },
    {
      name: 'Jane Smith',
      title: 'Operations Head',
      image: 'https://randomuser.me/api/portraits/women/44.jpg', // Example image
      review:
        'We’ve saved so much time and effort thanks to this system. The interface is user-friendly, and the features are exactly what we needed!',
    },
    {
      name: 'Michael Johnson',
      title: 'IT Administrator',
      image: 'https://randomuser.me/api/portraits/men/45.jpg', // Example image
      review:
        'Managing our IT assets has never been easier. I highly recommend this platform to anyone looking for a simple yet powerful solution.',
    },
  ];

  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center">What Our Users Say</h2>
        <p className="mt-4 max-w-2xl text-lg text-gray-500 dark:text-gray-300 mx-auto text-center">
          Hear from our satisfied users who have seen the impact of our platform firsthand.
        </p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 text-center">
              <img
                className="w-16 h-16 rounded-full mx-auto mb-4"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{testimonial.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">{testimonial.title}</p>
              <p className="text-gray-600 dark:text-gray-300">{testimonial.review}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
