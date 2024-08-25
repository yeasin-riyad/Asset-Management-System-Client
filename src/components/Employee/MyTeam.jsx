import { useEffect, useState } from 'react';
import { FaUserShield, FaUser } from 'react-icons/fa'; // Icons for admin and normal employee
import useAuth from '../useAuth';
import axiosSecure from '../AxiosSecure';

const MyTeam = () => {
  const [team, setTeam] = useState([]);
  const [managerEmail, setManagerEmail] = useState(null);
  const { currentUser } = useAuth(); 

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        // Fetch manager email
        const { data: managerEmail } = await axiosSecure.get(`/my-hr/${currentUser?.email}`);
        setManagerEmail(managerEmail);

        // Fetch manager information
        const { data: managerData } = await axiosSecure.get(`/my-Info/${managerEmail}`);
        
        // Fetch team members
        if(managerEmail){
          const response = await axiosSecure.get(`/my-team/${managerEmail}`);
          const modifiedTeam = response.data.map(user => {
            // Add "(You)" if the user email matches the current user's email
            if (user?.email === currentUser?.email) {
              return { ...user, displayName: `${user.displayName} (You)` };
            }
            return user;
          });
  
          // Set the team state with manager info and team members
          setTeam([managerData, ...modifiedTeam]);

        }
       
      } catch (error) {
        console.error('Error fetching team:', error);
      }
    };

    if (currentUser?.email) {
      fetchTeam();
    }
  }, [currentUser?.email]); // Only depend on currentUser.email

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">My Team</h1>
      
      {team.length === 0 ? (
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">No Team Members Found</h2>
          <p className="text-gray-600 dark:text-gray-400">
            You don't have any team members yet..
          </p>
        </div>
      ) : (
        <ul className="space-y-4">
          {team.map((user) => (
            <li 
              key={user?.email} 
              className="flex items-center p-4 bg-white dark:bg-gray-800 shadow rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              <img 
                src={user?.photoURL || user?.photoUrl || 'https://via.placeholder.com/150'} 
                alt={`${user?.displayName}'s avatar`} 
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="ml-4">
                <h2 className="text-lg font-semibold">
                  {user?.displayName}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {user?.role === 'manager' ? (
                    <span className="flex items-center">
                      <FaUserShield className="mr-2 text-blue-500" /> Admin
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <FaUser className="mr-2 text-green-500" /> Normal Employee
                    </span>
                  )}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyTeam;
