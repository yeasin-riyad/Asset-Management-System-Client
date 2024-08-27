import { Navigate } from "react-router-dom";
import useAuth from "./components/useAuth";
import useRole from "./components/useRole";

const AdminPrivate = ({ children }) => {
  const { currentUser, loading: authLoading } = useAuth();
  const { role, isLoading: roleLoading } = useRole();

  if (authLoading || roleLoading) {
    return <div>Loading...</div>;
  }

  if (currentUser && role === "admin") {
    return children;
  }

  // If not authenticated or role isn't 'employee', redirect to login
  return <Navigate to="/login" />;
};

export default AdminPrivate;
