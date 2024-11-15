import { Link } from "react-router-dom";

function SliderImg2() {
  return (
    <div className="relative h-[450px]">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{
          backgroundImage: "url('https://i.ibb.co/hcTpk6Q/pexels-mikhail-nilov-9301259.jpg')",
        }}
      ></div>

      {/* Content Section */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-y-4">
        <h2 className="text-5xl text-gray-50">
          Welcome to <span className="text-blue-700">TrackMyAssets</span>
        </h2>
        <p className="text-2xl text-gray-100">
          Get Started with Asset Management Join Us to Streamline Your Workflow
        </p>
        <Link
          to="/join-employee"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-7 py-3.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Join as an Employee
        </Link>
      </div>
    </div>
  );
}

export default SliderImg2;
