import Swal from "sweetalert2";

const ManagerBlockedMessage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md text-center">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Account Blocked
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Your account has been temporarily blocked By the Admin due to policy violations. Please contact support for further assistance.
        </p>
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
          onClick={() => Swal.fire("Contact with Admin: admin@gmail.com")}
        >
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default ManagerBlockedMessage;
