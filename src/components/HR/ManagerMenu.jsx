import { Link } from "react-router-dom";

const ManagerMenu = () => {
  return (
    <>
      <li>
        <Link to="hr">Home</Link>
      </li>
      <li>
        <Link to="hr/asset-list">Asset List</Link>
      </li>
      <li>
        <Link to="hr/add-an-asset">Add An Asset</Link>
      </li>
      <li>
        <Link to="hr/all-request">All Request</Link>
      </li>
      <li>
        <Link to="hr/my-employee-list">Employee List</Link>
      </li>
      <li>
        <Link to="hr/add-an-employee">Add Employee</Link>
      </li>
      <li>
        <Link to="hr/hr-profile">Profile</Link>
      </li>
    </>
  );
};

export default ManagerMenu;
