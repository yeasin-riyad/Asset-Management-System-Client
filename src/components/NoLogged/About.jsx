

const About = () => {
    return (
      <div>
     
  <section className="py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-gray-300 sm:text-4xl">
          About <span className="text-blue-700">TrackMyAssets</span>
        </h2>
        <p className="mt-4 text-lg text-gray-300">
          We help businesses efficiently manage their assets and products.
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center">
        <div className="md:w-1/2 md:pr-8">
          <img src="https://i.ibb.co/0fJwP4v/About.webp" alt="About Image" className="w-full rounded-lg shadow-lg" />
        </div>
        <div className="mt-8 md:mt-0 md:w-1/2 md:pl-8">
          <p className="text-lg text-gray-300">
            TrackMyAssets is dedicated to providing top-notch asset management solutions for businesses. Our platform allows HR Managers to easily track how employees are using company assets, ensuring everything is accounted for and efficiently managed.
          </p>
          <p className="mt-4 text-lg text-gray-300">
            We offer solutions for both returnable assets (like laptops, keyboards, mouse, chairs, desks, Cell Phones and Many Mores.
  ) and non-returnable assets (pens, pencils, paper, diaries, tissue paper and Many Mores). Our goal is to make asset management as seamless as possible, helping your business run smoothly.
          </p>
        </div>
      </div>
    </div>
  </section>
  
      </div>
    )
  }
  
  export default About