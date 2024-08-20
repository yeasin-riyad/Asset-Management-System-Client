import { Link } from "react-router-dom";

const EmployeeMenu = () => {
  return (
    <>
      <li>
        <Link to="employee">Home</Link>
      </li>
      <li>
        <Link to="employee/my-assets">My Assets</Link>
      </li>
      <li>
        <Link to="employee/my-team">My Team</Link>
      </li>
      <li>
        <Link to="employee/request-for-an-asset">Request For An Asset</Link>
      </li>
      <li>
        <Link to="employee/my-profile">My Profile</Link>
      </li>
    </>
  );
};

export default EmployeeMenu;
