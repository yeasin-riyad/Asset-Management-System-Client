import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "./components/useAuth";
import useRole from "./components/useRole";


const ErrorPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { role } = useRole();

  useEffect(() => {
    document.title = "Page Not Found - MyApp";
  }, []);

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  const handleGoHome = () => {
    if (currentUser) {
      if (role === "employee") {
        navigate("/employee");
      } else if (role === "manager") {
        navigate("/hr");
      }
    } else {
      navigate("/"); // If no user is logged in, navigate to the home page
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
          404
        </h1>
        <p className="text-2xl text-gray-700 dark:text-gray-300 mb-8">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <div className="flex space-x-4 justify-center">
          <button
            onClick={handleGoBack}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none transition duration-300 ease-in-out"
          >
            Go Back
          </button>
          <button
            onClick={handleGoHome}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none transition duration-300 ease-in-out"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
