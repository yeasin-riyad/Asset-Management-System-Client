import { useState, useEffect } from 'react';
import useAuth from '../useAuth';
import axiosSecure from '../AxiosSecure';
import { useQuery } from '@tanstack/react-query';

const EmployeeHome = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [monthlyRequests, setMonthlyRequests] = useState([]);
  const { currentUser } = useAuth();
  const [userCompany, setUserCompany] = useState(null);

    // Get Current User Information...
    const {data:user={}}=useQuery({
      queryKey:['userInfo'],
      queryFn:async()=>{
        const response=await axiosSecure.get(`/my-Info/${currentUser?.email}`)
        return response.data;
      },
      enabled:!!currentUser?.email
    })
    console.log(user)

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const response = await axiosSecure.get(`/request-asset/${currentUser.email}`, {
          params: { status: 'pending' },
        });
        setPendingRequests(response.data);
      } catch (error) {
        console.error('Error fetching pending requests:', error);
      }
    };

    const fetchMonthlyRequests = async () => {
      try {
        const response = await axiosSecure.get(`/request-asset/${currentUser.email}`);
        const currentMonthRequests = response.data.filter(request => {
          const requestDate = new Date(request.requestDate);
          const currentDate = new Date();
          return requestDate.getMonth() === currentDate.getMonth() &&
                 requestDate.getFullYear() === currentDate.getFullYear();
        });
        currentMonthRequests.sort((a, b) => new Date(b.requestDate) - new Date(a.requestDate));
        setMonthlyRequests(currentMonthRequests);
      } catch (error) {
        console.error('Error fetching monthly requests:', error);
      }
    };

    const fetchUserCompany = async () => {
      try {
        // Assume you have an endpoint to fetch user's company affiliation
        const response = await axiosSecure.get(`/user-company/${currentUser.email}`);
        setUserCompany(response.data.company);
      } catch (error) {
        console.error('Error fetching user company:', error);
      }
    };

    fetchPendingRequests();
    fetchMonthlyRequests();
    fetchUserCompany();
  }, [currentUser]);

  if (!user?.companyName) {
  
     var notAffiliated= <div className="container mx-auto p-4 text-center bg-yellow-100 border border-yellow-400 text-yellow-800 rounded-md dark:bg-yellow-900 dark:border-yellow-800 dark:text-yellow-300">
        Contact your HR to affiliate with a company.
      </div>
  
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">My Pending Requests</h2>
        {pendingRequests.length > 0 ? (
          <ul className="space-y-4">
            {pendingRequests.map((request) => (
              <li key={request._id} className="p-4 border rounded-md shadow-md dark:bg-gray-800 dark:text-white">
                <p><strong>Asset Name:</strong> {request.asset.productName}</p>
                <p><strong>Quantity:</strong> {request.quantity}</p>
                <p><strong>Status:</strong> {request.status}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No pending requests...</p>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">My Monthly Requests</h2>
        {monthlyRequests.length > 0 ? (
          <ul className="space-y-4">
            {monthlyRequests.map((request) => (
              <li key={request._id} className="p-4 border rounded-md shadow-md dark:bg-gray-800 dark:text-white">
                <p><strong>Asset Name:</strong> {request.asset.productName}</p>
                <p><strong>Quantity:</strong> {request.quantity}</p>
                <p><strong>Date:</strong> {new Date(request.requestDate).toLocaleDateString()}</p>
                <p><strong>Status:</strong> {request.status}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No requests made this month...</p>
        )}
      </section>

      {/* Extra sections like Calendar, Events, Notices */}
      {userCompany && <>
        <section>
        <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
        <p>Details about upcoming events...</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Company Notices</h2>
        <p>Important notices from your company...</p>
      </section></>}
      <section>
        {notAffiliated}
      </section>

    </div>
  );
};

export default EmployeeHome;
