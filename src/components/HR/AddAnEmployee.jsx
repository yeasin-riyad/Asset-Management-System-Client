import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosSecure from '../AxiosSecure';
import { FaUserPlus } from 'react-icons/fa';
import useAuth from '../useAuth';
import Swal from 'sweetalert2';

const AddAnEmployee = () => {
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch unaffiliated users, affiliated count, and package limit
  const { data, isLoading, error } = useQuery(
    {
      queryKey:['unaffiliatedUsers', currentUser?.email],
      queryFn: async () => {
        const { data } = await axiosSecure.get(`/unaffiliated-users/${currentUser?.email}`);
        return data;
      }

    }
   
  );

  // Fetch HR's information
  const { data: hrInfo } = useQuery({
    queryKey:    ['myInfo', currentUser?.email],
    queryFn:   async () => {
      const { data } = await axiosSecure.get(`/my-Info/${currentUser?.email}`);
      return data;
    }

  }
 
  );

  const addToTeamMutation = useMutation({
    mutationFn: async (userId) => {
      const { email, companyName, companyLogoUrl } = hrInfo;
      await axiosSecure.patch(`/update-user-info/${userId}`, { HrEmail:email, companyName, companyLogoUrl });
    },
    onSuccess: () => {
      // Refetch unaffiliated users list after successful mutation
      queryClient.invalidateQueries(['unaffiliatedUsers', currentUser?.email]);
      setSelectedUser(null); // Reset selected user
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User has been Added in your Team",
        showConfirmButton: false,
        timer: 1500
      });
    },
  });

  const handleSelectUser = (userId) => {
    setSelectedUser((prev) => (prev === userId ? null : userId));
  };

  const handleAddToTeam = () => {
    if (selectedUser) {
      addToTeamMutation.mutate(selectedUser);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;

  const { unaffiliatedUsers, affiliatedCount, packageLimit } = data;

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">Employee Page</h1>

      {/* Package Section */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-8">
        <h2 className="text-lg font-semibold mb-2">Package Details</h2>
        <p>Affiliated Members: {affiliatedCount} / {packageLimit}</p>
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
          onClick={() => window.location.href = `/packages?packageLimit=${packageLimit}`}
        >
          Increase Limit
        </button>
      </div>

      {/* Unaffiliated Users List */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Unaffiliated Users</h2>
        <ul className="space-y-4">
          {unaffiliatedUsers.map((user) => (
            <li key={user.email} className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-4"
                  checked={selectedUser === user.email}
                  onChange={() => handleSelectUser(user.email)}
                />
                <img
                  src={user.photoUrl || 'https://via.placeholder.com/150'}
                  alt={`${user.displayName}'s avatar`}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h2 className="text-lg font-semibold">{user.displayName}</h2>
                </div>
              </div>
              <button
                className={`px-4 py-2 ${selectedUser === user.email ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-300 cursor-not-allowed'} text-white rounded-lg shadow flex items-center`}
                onClick={handleAddToTeam}
                disabled={!selectedUser || selectedUser !== user.email}
              >
                <FaUserPlus className="mr-2" /> Add to Team
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddAnEmployee;
