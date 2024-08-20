import {  NavLink } from "react-router-dom";

const ManagerMenu = () => {
  return (
    <>
      <li>
        <NavLink end to="hr" activeClassName="active">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="hr/asset-list" activeClassName="active">
          Asset List
        </NavLink>
      </li>
      <li>
        <NavLink to="hr/add-an-asset" activeClassName="active">
          Add An Asset
        </NavLink>
      </li>
      <li>
        <NavLink to="hr/all-request" activeClassName="active">
          All Request
        </NavLink>
      </li>
      <li>
        <NavLink to="hr/my-employee-list" activeClassName="active">
          Employee List
        </NavLink>
      </li>
      <li>
        <NavLink to="hr/add-an-employee" activeClassName="active">
          Add Employee
        </NavLink>
      </li>
      <li>
        <NavLink to="hr/hr-profile" activeClassName="active">
          Profile
        </NavLink>
      </li>
    </>
  );
};

export default ManagerMenu;
