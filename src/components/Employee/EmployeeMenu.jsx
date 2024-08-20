import { Link, NavLink } from "react-router-dom";

const EmployeeMenu = () => {
  return (
    <>
      <li>
        <NavLink end to="employee" activeClassName="active">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="employee/my-assets" activeClassName="active">
          My Assets
        </NavLink>
      </li>
      <li>
        <NavLink to="employee/my-team" activeClassName="active">
          My Team
        </NavLink>
      </li>
      <li>
        <NavLink to="employee/request-for-an-asset" activeClassName="active">
          Request For An Asset
        </NavLink>
      </li>
      <li>
        <NavLink to="employee/my-profile" activeClassName="active">
          My Profile
        </NavLink>
      </li>
    </>
  );
};

export default EmployeeMenu;
