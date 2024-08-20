import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../AxiosSecure";

const PendingRequests = ({ email }) => {
  const { data: pendingRequests = [] } = useQuery({
    queryKey: ["pendingRequests", email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/employee-requested-assets/${email}`);
      return response.data.slice(0, 5); // Limit to 5 items
    },
  });

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 dark:bg-gray-800">
      <h2 className="text-2xl text-center font-semibold text-gray-800 dark:text-white mb-4">
        Pending Requests
      </h2>
      <ul className="space-y-4">
        {pendingRequests.length > 0 ? (
          pendingRequests.map((request) => (
            <li
              key={request._id}
              className="border border-gray-200 rounded-lg p-4 bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {request.asset.productName}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Type: {request.asset.productType}
                  </p>
                </div>
                <span className="text-gray-500 dark:text-gray-300">
                  {new Date(request.requestDate).toLocaleDateString()}
                </span>
              </div>
            </li>
          ))
        ) : (
          <li className="text-gray-600 dark:text-gray-400">
            No pending requests.
          </li>
        )}
      </ul>
    </div>
  );
};

export default PendingRequests;
