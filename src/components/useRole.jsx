import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import axiosSecure from './AxiosSecure';

const fetchUserRole = async (email) => {
  const { data } = await axiosSecure.get(`/checkRole/${email}`);
  return data.role;
};

const useRole = () => {
  const { currentUser } = useAuth();

  const { data: role, isLoading, error, refetch } = useQuery({
    queryKey: ['userRole', currentUser?.email],
    enabled: !!currentUser?.email,
    queryFn: () => fetchUserRole(currentUser.email),
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return { role: 'loading', refetch };
  }

  if (error) {
    console.error('Failed to fetch user role:', error);
    return { role: null, refetch };
  }

  return { role, refetch };
};

export default useRole;
