import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosSecure from "../AxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../useAuth";
import Title from "../Helmet";

const MyEmployeeList = () => {
  const queryClient = useQueryClient();
  const { currentUser } = useAuth();
  const email = currentUser?.email;

  // Fetch employee list
  const { data: employees = [], isLoading } = useQuery({
    queryKey: ['myEmployeeList', email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/my-employee-list/${email}`);
      return response.data;
    },
    enabled: !!email,
  });

  // Mutation to remove a member
  const removeMemberMutation = useMutation({
    mutationFn: async (employeeEmail) => {
      return axiosSecure.delete(`/remove-team-member/${employeeEmail}`);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['myEmployeeList', email]);
    },
  });

  const handleRemoveMember = (employeeEmail, memberName) => {
    Swal.fire({
      title: `Are you sure you want to remove ${memberName} from the team?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove',
      cancelButtonText: 'Cancel',
      customClass: {
        confirmButton: 'bg-red-600 hover:bg-red-700 text-white',
        cancelButton: 'bg-gray-300 hover:bg-gray-400 text-black'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        removeMemberMutation.mutate(employeeEmail, {
          onSuccess: () => {
            Swal.fire('Removed!', `${memberName} has been removed from the team.`, 'success');
          },
          onError: () => {
            Swal.fire('Error!', `Failed to remove ${memberName} from the team.`, 'error');
          }
        });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
            <Title title={"Manager || Employee-List"}></Title>

      <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800 dark:text-white">
        Team Members
      </h2>
      {employees.length === 0 ? (
        <div className="flex justify-center items-center h-full">
          <p className="text-2xl text-gray-600 dark:text-gray-300">
            No team members found.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((employee) => (
            <div key={employee._id} className="group p-6 border rounded-lg shadow-lg bg-white dark:bg-gray-800 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
              <img
                src={employee.photoUrl || "/default-avatar.png"}
                alt={employee.name}
                className="w-20 h-20 rounded-full mb-4 mx-auto group-hover:scale-110 transition-transform duration-300"
              />
              <h3 className="text-2xl font-semibold text-center text-gray-700 dark:text-gray-200">
                {employee?.displayName}
              </h3>
              <h4 className="text-xl font-semibold text-center text-gray-700 dark:text-gray-200">
                {employee?.email}
              </h4>
              <p className="text-center text-gray-500 dark:text-gray-400">
                <span className="text-green-500 font-bold">Employee</span>
              </p>
              <div className="mt-4 flex justify-center">
                <button
                  className="bg-red-500 text-white font-semibold px-4 py-2 rounded-full shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-100 transition-all duration-300"
                  onClick={() => handleRemoveMember(employee?.email, employee?.displayName)}
                >
                  Remove From Team
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEmployeeList;
