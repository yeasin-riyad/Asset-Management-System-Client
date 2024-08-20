import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import useRole from "./useRole"; // Custom hook to get user role
import Swal from "sweetalert2";
import EmployeeMenu from "./Employee/EmployeeMenu";
import ManagerMenu from "./HR/ManagerMenu";
import axiosSecure from "./AxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const { role, refetch } = useRole(); // Get the user's role
  const navigate = useNavigate();

  // Get Current User Information...
  const { data: user = {} } = useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => {
      const response = await axiosSecure.get(`/my-Info/${currentUser?.email}`);
      return response.data;
    },
    enabled: !!currentUser?.email,
  });

  const handleSignOut = () => {
    refetch();
    Swal.fire({
      title: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Log Out!",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate("/");
        Swal.fire({
          title: "Logged Out!",
          text: "You are logged out successfully.",
          icon: "success",
        });
      }
    });
  };
  const renderLink = () => {
    if (!currentUser) return "/";

    return role === "manager" ? "/manager" : "/employee";
  };

  return (
    <div className="navbar bg-base-100 container mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {!currentUser && (
              <>
                <li>
                  <NavLink to="/" activeClassName="active">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/join-hr" activeClassName="active">
                    JoinAsHR
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/join-employee" activeClassName="active">
                    JoinAsEmployee
                  </NavLink>
                </li>
              </>
            )}

            {role === "employee" && <EmployeeMenu />}
            {role === "manager" && <ManagerMenu />}
          </ul>
        </div>
        <Link to={renderLink()}>
          {currentUser ? (
            <img
              src={user?.companyLogoUrl}
              alt="Company Logo"
              className="h-8"
            />
          ) : (
            <img
              src="https://play-lh.googleusercontent.com/iIl4aan6RbAUAcaFAPZMMCnn7ZBkzpgkqEaVQDi-t6aiCTn8UvQ5m0SSeajkQ5fJ0A"
              alt="XYZ Company Logo"
              className="h-8"
            />
          )}
        </Link>
        <Link to={renderLink()} className="btn btn-ghost text-xl">
          {currentUser ? `${user?.companyName}`:'TrackMyAssets'}
        </Link>
        
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {!currentUser && (
            <>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/join-hr">JoinAsHR</Link>
              </li>
              <li>
                <Link to="/join-employee">JoinAsEmployee</Link>
              </li>
            </>
          )}

          {role === "employee" && <EmployeeMenu />}
          {role === "manager" && <ManagerMenu />}
        </ul>
      </div>
      <div className="navbar-end">
        <div>
        <div>
          {
            currentUser?.email? <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar mx-4 tooltip tooltip-bottom" data-tip={user?.displayName}>
            <div className="w-10 rounded-full">
              <img
                alt="User Profile Pic"
                src={user?.photoUrl || user?.photoURL} />
            </div>
          </div>:""
          }
        </div>
          
        </div>

        {currentUser?.email ? (
          <button onClick={handleSignOut}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
