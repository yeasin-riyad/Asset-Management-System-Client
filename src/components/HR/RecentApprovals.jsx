import { useQuery } from "@tanstack/react-query";
import { AiOutlineCheckCircle } from "react-icons/ai"; // Importing an icon for approved status
import axiosSecure from "../AxiosSecure";

const RecentApprovals = ({ email }) => {
  const { data: approvedRequests = [] } = useQuery({
    queryKey: ["recentApprovals", email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/employee-requested-assets/${email}`);
      return response.data.filter(request => request.status === "approved");
    },
  });

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-extrabold text-center text-gray-800 dark:text-white mb-6">
        Recent Approvals
      </h2>
      <ul className="space-y-4">
        {approvedRequests.map((request) => (
          <li key={request._id} className="flex items-center space-x-4">
            <AiOutlineCheckCircle className="text-green-500 text-3xl" />
            <div className="flex-1">
              <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {request.asset.productName}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Approved for <span className="font-medium">{request.user.name}</span> on{" "}
                <span className="font-medium">{new Date(request.approvalDate).toLocaleDateString()}</span> at{" "}
                <span className="font-medium">{new Date(request.approvalDate).toLocaleTimeString()}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentApprovals;
