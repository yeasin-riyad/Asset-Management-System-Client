import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../AxiosSecure";

const TopRequestedItems = ({ email }) => {
  const { data: topRequestedItems = [] } = useQuery({
    queryKey: ["topRequestedItems", email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/top-requested-items/${email}`);
      return response.data;
    },
  });

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h2 className="text-xl text-center font-semibold text-gray-800 dark:text-gray-100 mb-4">Top Requested Items</h2>
      <ul className="space-y-3">
        {topRequestedItems.map((item) => (
          <li
            key={item._id}
            className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm flex justify-between items-center"
          >
            <div>
              <span className="text-lg font-medium text-gray-700 dark:text-gray-200">
                {item.productName}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                ({item.productType})
              </span>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {item.requestCount} requests
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopRequestedItems;
