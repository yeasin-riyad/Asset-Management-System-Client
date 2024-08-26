import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axiosSecure from '../AxiosSecure';
import useAuth from '../useAuth';

const CheckPayment = ({ children }) => {
  const [paymentId, setPaymentId] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currentUser,loading:userLoading } = useAuth();

  useEffect(() => {
    const fetchPaymentId = async () => {
      try {
        const response = await axiosSecure.get('/getPaymentId', {
          params: { email: currentUser?.email },
        });
        setPaymentId(response.data.PaymentId);
      } catch (error) {
        console.error('Error fetching payment ID:', error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?.email) {
      fetchPaymentId();
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  if (loading || userLoading) {
    return <div>Loading...</div>; // You can replace this with a more styled loading indicator
  }

  if (paymentId) {
    return children;
  }

  return <Navigate to="/packages" />;
};

export default CheckPayment;
