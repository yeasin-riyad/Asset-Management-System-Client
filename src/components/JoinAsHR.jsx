import  {  useState } from "react";
import { useForm } from "react-hook-form";

import { NavLink, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import { ImSpinner3 } from "react-icons/im";
// import '../components/ButtonSpinner'
import imgHosting from "./ImgHosting";
import axiosPublic from "./AxiosPublic";
import useAuth from "./useAuth";
import Title from "./Helmet";



const JoinAsHR = () => {

   const navigate=useNavigate()
    // const { data, isLoading ,refetch} = VerifyUserRole();
    // console.log(data);
    const{signUp,updateUser}=useAuth()
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();
   
    const [loading,setLoading]=useState(false)
  
    const onSubmit = async (data) => {
      setLoading(true)
      // Logo Url
     const imageUrl=await imgHosting(data.companyLogo)
      data.companyLogoUrl = imageUrl;
      delete data.companyLogo;
      
  
      //User Photo Url
      const PhotoUrl=await imgHosting(data.photo)
      data.photoUrl=PhotoUrl;
      delete data.photo;
  
  
        const{fullName:displayName,companyName,companyLogoUrl,password,email,dob,photoUrl}=data;
        const user={displayName,companyName,companyLogoUrl,password,email,dob,photoUrl,role:"manager"}
        // setPay(parseInt(Package))
        try{
           
        
          const response=await axiosPublic.post('/saveUser',{user})
        
           await signUp(email,password)
          await updateUser(displayName,photoUrl)
          
  
        
  
  
  
          if(response){
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "You Are Logged In Successfully !!",
              showConfirmButton: false,
              timer: 1500
            });
           
            reset();
            navigate('/packages')

          }
       
  
        }catch{
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
  
  
        
        setLoading(false)
     
    };
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
              <Title title={"Manager || Registration"}></Title>

        <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
            Register New HR Manager
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <input
                type="text"
                {...register("fullName", { required: "Full Name is required" })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>
  
            {/* Company Name */}
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300">
                Company Name
              </label>
              <input
                type="text"
                {...register("companyName", {
                  required: "Company Name is required",
                })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
              />
              {errors.companyName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.companyName.message}
                </p>
              )}
            </div>
  
            {/* Company Logo */}
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300">
                Company Logo
              </label>
              <input
                type="file"
                {...register("companyLogo", {
                  required: "Company Logo is required",
                })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
              />
              {errors.companyLogo && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.companyLogo.message}
                </p>
              )}
            </div>
  
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
  
  
                {/* Upload User Photo */}
                <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300">
                Upload Your Photo
              </label>
              <input
                type="file"
                {...register("photo", {
                  required: "Photo is required",
                })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
              />
              {errors.photo && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.photo.message}
                </p>
              )}
            </div>
  
            {/* Date of Birth */}
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300">
                Date of Birth
              </label>
              <input
                type="date"
                {...register("dob", { required: "Date of Birth is required" })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
              />
              {errors.dob && (
                <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>
              )}
            </div>
  
          
  
            {/* Signup Button */}
            <button  disabled={loading}
                type="submit"
                className="load-button w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
              >
                {loading ?<ImSpinner3 className='spinner text-center mx-auto '/>: "Register"}
              </button>
            
  
          </form>
  
  
  
          {/* Already Registered Link */}
          <div className="text-center mt-4">
            <span className="text-gray-700 dark:text-gray-300">
              Already registered?{" "}
            </span>
            <NavLink
              to="/login"
              className="text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500"
            >
              Please Login
            </NavLink>
          </div>
        </div>
      </div>
    );
  };
  
  export default JoinAsHR;