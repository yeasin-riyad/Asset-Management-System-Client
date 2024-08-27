import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axiosSecure from '../AxiosSecure';
import useAuth from '../useAuth';
import Title from '../Helmet';

const HrProfile = () => {
  const [user, setUser] = useState(null);
  const [newDisplayName, setNewDisplayName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosSecure.get(`/my-Info/${currentUser?.email}`);
        setUser(response.data);
        setNewDisplayName(response.data.displayName);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [currentUser]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsModalOpen(true); // Open modal
  };

  const confirmUpdate = async () => {
    try {
      await axiosSecure.put(`/update-user/${user.email}`, { displayName: newDisplayName });
      Swal.fire('Updated!', 'Your profile has been updated.', 'success');
      setIsModalOpen(false); // Close modal
    } catch (error) {
      Swal.fire('Error!', 'Failed to update profile.', 'error');
    }
  };

  const cancelUpdate = () => {
    setIsModalOpen(false); // Close modal
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
            <Title title={"Manager || Profile"}></Title>

      <h2 className="text-2xl mb-4">Update Profile</h2>
      <form onSubmit={handleUpdate} className="bg-white p-6 rounded-lg shadow-lg dark:bg-gray-800 dark:text-white">
        <div className="mb-4">
          <label className="block mb-2">Full Name</label>
          <input
            type="text"
            value={newDisplayName}
            onChange={(e) => setNewDisplayName(e.target.value)}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="text"
            value={user.email}
            readOnly
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white cursor-not-allowed"
          />
        </div>
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Update
        </button>
      </form>

      {/* Update Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg dark:bg-gray-800 dark:text-white">
            <h2 className="text-2xl mb-4">Confirm Update</h2>
            <p className="mb-4">Are you sure you want to update your profile?</p>
            <div className="mb-4">
              <p><strong>Full Name:</strong> {newDisplayName}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
            <div className="flex justify-between">
              <button
                onClick={cancelUpdate}
                className="p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={confirmUpdate}
                className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HrProfile;
