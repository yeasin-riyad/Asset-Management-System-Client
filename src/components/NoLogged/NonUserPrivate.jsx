import { useNavigate } from "react-router-dom";
import useAuth from "../useAuth";
import useRole from "../useRole";

const NonUserPrivate = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const {role}=useRole()
  const navigate=useNavigate()

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return children;
  }

  if(currentUser) {
    if(role === "manager") return navigate('/hr')
        else if (role==="employee") return navigate('/employee')
    else return navigate('/')

  }

};

export default NonUserPrivate;
