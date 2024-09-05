import axios from 'axios';

const axiosSecure = axios.create({
  baseURL: 'https://server-assets.vercel.app',
  // baseURL:"http://localhost:9000"
});

// Add a request interceptor to include the latest token
axiosSecure.interceptors.request.use(
  (config) => {
    // Always fetch the latest token from localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosSecure;
