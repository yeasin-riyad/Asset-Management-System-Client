import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { ImSpinner3 } from 'react-icons/im';
import useAuth from '../useAuth';
import imgHosting from '../ImgHosting';
import axiosPublic from '../AxiosPublic';
import { FcGoogle } from 'react-icons/fc';
import Title from '../Helmet';

const JoinEmployee = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const { signUp, updateUser, googleLogin } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    const imageUrl = await imgHosting(data.photo);

    data.photoUrl = imageUrl;
    delete data.photo;

    const { fullName: displayName, email, password, dateOfBirth, photoUrl } = data;
    const user = { displayName, email, password, dateOfBirth, photoUrl, role: "employee" };
    
    try {
      const { data } = await axiosPublic.post('/saveUser', { user });
      await signUp(email, password);
      await updateUser(displayName, photoUrl);
      
      if (data) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You Logged In Successfully.",
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/employee');
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }

    setLoading(false);
    reset();
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

      navigate('/employee');
    } catch {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something Went Wrong..!",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg mt-7">
                  <Title title={"Employee || Register"}></Title>

      <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">Register New Employee</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">Full Name</label>
          <input
            type="text"
            {...register('fullName', { required: 'Full Name is required' })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
          />
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">Email</label>
          <input
            type="email"
            {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">Password</label>
          <input
            type="password"
            {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        {/* Date of Birth */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">Date of Birth</label>
          <input
            type="date"
            {...register('dateOfBirth', { required: 'Date of Birth is required' })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
          />
          {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth.message}</p>}
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

        {/* Signup Button */}
        <button  disabled={loading}
          type="submit"
          className="load-button w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
        >
          {loading ?<ImSpinner3 className='spinner mx-auto text-center'/>: "Register"}
        </button>
        <h1 className='text-center text'>Or</h1>
        
        {/* Google Login Button */}
        <button disabled={loading}
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold py-2 px-4 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none"
        >
              {loading ? "Waiting......" : <><FcGoogle className="mr-2" />Login with Google</>}

          
        </button>
      </form>

      <div className="text-center mt-4">
        <span className="text-gray-700 dark:text-gray-300">Already registered? </span>
        <NavLink to="/login" className="text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500">
          Please Login
        </NavLink>
      </div>
    </div>
  );
}

export default JoinEmployee;
