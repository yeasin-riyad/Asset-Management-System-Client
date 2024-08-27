import { Navigate } from "react-router-dom";
import useAuth from "../useAuth";
import useRole from "../useRole";

const ManagerPrivate = ({ children }) => {
  const { currentUser, loading: authLoading } = useAuth();
  const { role, isLoading: roleLoading } = useRole();


  if (authLoading || roleLoading) {
    return <div>Loading...</div>;
  }

  if (currentUser && role === "manager") {
    return children;
  }

  return <Navigate to="/employee" />;
};

export default ManagerPrivate;
