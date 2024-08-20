import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../AxiosSecure";

const AssetRequestHistory = ({ email }) => {
  const { data: allRequests = [] } = useQuery({
    queryKey: ["assetRequestHistory", email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/employee-requested-assets/${email}`);
      return response.data;
    },
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">
        Asset Request History
      </h2>
      <table className="min-w-full bg-white dark:bg-gray-800">
        <thead>
          <tr>
            <th className="py-2 px-4 text-left text-gray-800 dark:text-gray-200">Asset Name</th>
            <th className="py-2 px-4 text-left text-gray-800 dark:text-gray-200">Requested By</th>
            <th className="py-2 px-4 text-left text-gray-800 dark:text-gray-200">Status</th>
            <th className="py-2 px-4 text-left text-gray-800 dark:text-gray-200">Request Date</th>
          </tr>
        </thead>
        <tbody>
          {allRequests.map((request) => (
            <tr key={request._id}>
              <td className="py-2 px-4 text-gray-700 dark:text-gray-300">{request.asset.productName}</td>
              <td className="py-2 px-4 text-gray-700 dark:text-gray-300">{request.user.name}</td>
              <td className="py-2 px-4 text-gray-700 dark:text-gray-300 capitalize">{request.status}</td>
              <td className="py-2 px-4 text-gray-700 dark:text-gray-300">{new Date(request.requestDate).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssetRequestHistory;
