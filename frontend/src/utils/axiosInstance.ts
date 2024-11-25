import axios from 'axios';
import Cookies from 'js-cookie';
import {useRouter} from 'next/navigation';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Request Interceptor: Attach Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response Interceptor: Handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error) => {
    const router = useRouter();
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized, redirecting to login...');
      // Remove the invalid token
      Cookies.remove('auth_token');

      // Redirect to login page
      router.push('/');

      // Optionally, you can also display a notification to the user
      // e.g., using a toast library
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
