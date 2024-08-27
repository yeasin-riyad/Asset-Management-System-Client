import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from './components/useAuth';
import axiosSecure from './components/AxiosSecure';
import Title from './components/Helmet';
import Swal from 'sweetalert2';

const Admin = () => {
  const { currentUser } = useAuth();
  const [managers, setManagers] = useState([]);

  const fetchUsers = async (email) => {
    const { data } = await axiosSecure.get(`/all-users/${email}`);
    return data;
  };

  const { data: users, isLoading, refetch } = useQuery({
    queryKey: ['users', currentUser?.email],
    queryFn: () => fetchUsers(currentUser?.email),
    enabled: !!currentUser?.email,
  });

  useEffect(() => {
    if (users) {
      // Group users by manager
      const groupedManagers = users
        .filter(user => user?.role === 'manager')
        .map(manager => ({
          ...manager,
          employees: users.filter(user => user.HrEmail === manager.email),
        }));

      setManagers(groupedManagers);
    }
  }, [users]);

  const toggleBlockManager = async (managerEmail, currentBlockStatus) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You Want to do This???",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes,Block/Unblock User!"
    }).then((result) => {
      if (result.isConfirmed) {
        const blockUser=async()=>{
          try {
            await axiosSecure.patch(`/block-manager/${managerEmail}`, { block: !currentBlockStatus });
            // Refetch data to update the UI with the new block status
            refetch();
            Swal.fire({
              title: "Done!",
              text: "Your Data has been Recorded.",
              icon: "success"
            });
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
              footer: error
            });
          }

        }

        blockUser()
       
      }
    });
   
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <Title title={"Admin"} />
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {managers.map((manager) => (
        <div key={manager.email} className="bg-white shadow-md rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">{manager.name}</h2>
              <p>{manager.email}</p>
              <p className="text-sm text-gray-600">Role: {manager.role}</p>
            </div>
            <button
              onClick={() => toggleBlockManager(manager?.email, manager?.block)}
              className={`px-4 py-2 rounded-lg ${manager?.block ? 'bg-green-500' : 'bg-red-500'} text-white`}
            >
              {manager?.block ? 'Unblock Manager' : 'Block Manager'}
            </button>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Employees</h3>
            {manager?.employees?.length > 0 ? (
              <ul className="list-disc ml-5">
                {manager.employees.map((employee) => (
                  <li key={employee.email}>
                    <p>{employee.name} ({employee.email})</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No employees under this manager.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Admin;
