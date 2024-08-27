import { Navigate } from "react-router-dom";
import useAuth from "../useAuth";
import useRole from "../useRole";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../AxiosSecure";
import ManagerBlockedMessage from "./ManagerBlockedMessage";

const ManagerPrivate = ({ children }) => {
  const { currentUser, loading: authLoading } = useAuth();
  const { role, isLoading: roleLoading } = useRole();

 // Get Current User Information...
 const { data: user = {} } = useQuery({
  queryKey: ["userInfo"],
  queryFn: async () => {
    const response = await axiosSecure.get(`/my-Info/${currentUser?.email}`);
    return response.data;
  },
  enabled: !!currentUser?.email,
});


  if (authLoading || roleLoading) {
    return <div>Loading...</div>;
  }

  if (currentUser && role === "manager") {
    if(user?.block) {

      return <Navigate to="/hr/manager-block"/>
  
    }
    return children;
  }

 

  return <Navigate to="/login" />;
};

export default ManagerPrivate;
