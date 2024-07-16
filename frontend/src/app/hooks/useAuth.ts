import type {AxiosError} from 'axios';
import useAuthStore from '../store/authStore';
import {ErrorToast, SuccessToast} from '@/app/components/common/Toast/Toast';
import axiosInstance from '@/utils/axiosInstance';
import {useRouter} from 'next/navigation';
import Cookies from 'js-cookie';

const isAxiosError = (error: any): error is AxiosError => {
  return error.isAxiosError === true;
};

export const useLogin = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post('users/login', {
        email,
        password,
      });
      setToken(response.data.access_token);
      setUser(response.data.user);
      Cookies.set('auth_token', response.data.access_token, {expires: 1});
      router.push('/dashboard');
      SuccessToast('Login successful');
    } catch (error) {
      ErrorToast('Invalid email or password');
      console.error('Login error:', error);
    }
  };
  return login;
};

export const useRegister = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);

  const register = async (
    name: string,
    surname: string,
    email: string,
    password: string,
  ) => {
    try {
      const response = await axiosInstance.post('users/register', {
        name,
        surname,
        email,
        password,
      });
      setToken(response.data.access_token);
      setUser(response.data.user);
      SuccessToast('Register successful');
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        ErrorToast('Invalid email or password');
      }
      ErrorToast('Network or unknown error');
    }
  };
  return register;
};
