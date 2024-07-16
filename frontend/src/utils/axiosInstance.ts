import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle 401 errors, maybe refresh the token or redirect to login
      console.log('Unauthorized, logging out...');
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
