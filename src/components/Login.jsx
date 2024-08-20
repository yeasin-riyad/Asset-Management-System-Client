import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { useEffect } from "react";
import useAuth from "./useAuth";
import axiosPublic from "./AxiosPublic";

// import './ButtonSpinner.css'
const Login = () => {
  const {login, googleLogin,loading,currentUser}=useAuth()
  const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // useEffect(()=>{
  //   if(currentUser){
  //     navigate('/')
  //   }
  // },[currentUser])

  

  const onSubmit = async(data) => {
    const {email,password}=data;
  

    try{
      await login(email,password)

      navigate('/')
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "You Logged In Successfully...",
        showConfirmButton: false,
        timer: 1500
      });
    
     
    
    }catch{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Your Email And Password Are Not Matching.!",
      });

    }
    
    reset()
  
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();
      const user = result.user;

      const newUser = {
        displayName: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
        role: "employee",
      };

      // Save the user in the database
      const { data } = await axiosPublic.post('/saveUser', { user: newUser });

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "You Logged In Successfully...",
        showConfirmButton: false,
        timer: 1500
      });

      navigate('/');
    } catch {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something Went Wrong..!",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Login Button */}
          <button disabled={loading}
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
          >
            {loading ? "Waiting......": "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-4 flex items-center">
          <div className="flex-grow h-px bg-gray-400 dark:bg-gray-600"></div>
          <span className="px-4 text-gray-700 dark:text-gray-300">or</span>
          <div className="flex-grow h-px bg-gray-400 dark:bg-gray-600"></div>
        </div>

        {/* Google Login Button */}
        <button disabled={loading}
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold py-2 px-4 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none"
        >
              {loading ? "Waiting......" : <><FcGoogle className="mr-2" />Login with Google</>}

          
        </button>

        {/* Register Links */}
        <div className="text-center mt-4">
          <span className="text-gray-700 dark:text-gray-300">
            Don't have an account?{" "}
          </span>
          <div className="flex flex-col items-center space-y-2">
            <NavLink
              to="/join-hr"
              className="text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500"
            >
              Register as Employee
            </NavLink>
            <NavLink
              to="/join-employee"
              className="text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500"
            >
              Register as HR Manager
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
