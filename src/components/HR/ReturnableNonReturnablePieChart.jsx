import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../AxiosSecure";

const COLORS = ["#0088FE", "#FF8042"];

const ReturnableNonReturnablePieChart = ({ email }) => {
  const { data: items = [] } = useQuery({
    queryKey: ["returnableNonReturnableItems", email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/employee-requested-assets/${email}`);
      return response.data;
    },
  });

  const totalItems = items.length || 1; // Avoid division by zero
  const returnableCount = items.filter(item => item?.asset?.assetType === "returnable").length;
  const nonReturnableCount = totalItems - returnableCount;

  const data = [
    { name: "Returnable", value: (returnableCount / totalItems) * 100 },
    { name: "Non-Returnable", value: (nonReturnableCount / totalItems) * 100 },
  ];

  return (
    <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 w-full">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-4">
        Returnable vs Non-Returnable Items
      </h2>
      <div className="w-full h-80 sm:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              label={({ name, value }) => `${name}: ${value.toFixed(2)}%`}
              outerRadius="80%"
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ReturnableNonReturnablePieChart;
