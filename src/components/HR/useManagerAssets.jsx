import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../AxiosSecure';
import useAuth from '../useAuth';

const fetchManagerAssets = async (email) => {
  const { data } = await axiosSecure.get(`/manager-assets/${email}`);
  return data;
};

const useManagerAssets = () => {
  const { currentUser } = useAuth();

  return useQuery({
    queryKey: ['managerAssets', currentUser?.email],
    queryFn: () => fetchManagerAssets(currentUser.email),
    enabled: !!currentUser?.email, 
    staleTime: 5 * 60 * 1000, 
  });
};

export default useManagerAssets;
