import { Navigate } from "react-router-dom";
import useAuth from "../useAuth";
import useRole from "../useRole";

const EmployeePrivate = ({ children }) => {
  const { currentUser, loading: authLoading } = useAuth();
  const { role, isLoading: roleLoading } = useRole();

console.log(authLoading,roleLoading)

  if (authLoading || roleLoading) {
    return <div>Loading...</div>;
  }

  if (currentUser && role === "employee") {
    return children;
  }

  // If not authenticated or role isn't 'employee', redirect to login
  return <Navigate to="/hr" />;
};

export default EmployeePrivate;
