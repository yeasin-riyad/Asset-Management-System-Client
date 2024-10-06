import React from 'react';

const BlogNewsSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'The Future of Asset Management: Key Trends in 2024',
      date: 'October 5, 2024',
      description:
        'Discover the emerging trends shaping the future of asset management, from AI-powered tracking to sustainable asset strategies.',
      imageUrl: 'https://via.placeholder.com/600x400', // Replace with actual image URL
      link: '/blog/future-of-asset-management',
    },
    {
      id: 2,
      title: 'How to Optimize Your Company’s Asset Lifecycle',
      date: 'September 28, 2024',
      description:
        'Learn the best practices to maximize asset lifecycle management and increase your company’s ROI on investments.',
      imageUrl: 'https://via.placeholder.com/600x400', // Replace with actual image URL
      link: '/blog/asset-lifecycle-management',
    },
    {
      id: 3,
      title: 'Company Updates: New Features Added in TrackMyAssets',
      date: 'September 15, 2024',
      description:
        'We are excited to announce new features in our platform, including real-time asset tracking, enhanced reporting, and more!',
      imageUrl: 'https://via.placeholder.com/600x400', // Replace with actual image URL
      link: '/blog/new-features-update',
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center">Latest News & Articles</h2>
        <p className="mt-4 max-w-2xl text-lg text-gray-500 dark:text-gray-300 mx-auto text-center">
          Stay up to date with the latest news, tips, and updates on asset management and our platform.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{post.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{post.date}</p>
                <p className="mt-4 text-gray-700 dark:text-gray-300">{post.description}</p>
                <a
                  
                  className="mt-6 inline-block text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 font-semibold"
                >
                  Read more →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogNewsSection;
