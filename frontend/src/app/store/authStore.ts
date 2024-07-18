import {create} from 'zustand';
import Cookies from 'js-cookie';
import type {User} from '@/app/types/authTypes';

interface AuthState {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

const getUserFromCookies = () => {
  const userCookie = Cookies.get('user');
  if (userCookie) {
    try {
      return JSON.parse(userCookie);
    } catch (error) {
      console.error('Failed to parse user cookie:', error);
      return null;
    }
  }
  return null;
};

const useAuthStore = create<AuthState>((set) => ({
  user: getUserFromCookies(),
  token: Cookies.get('auth_token') || null,

  setUser: (user: User | null) => {
    set({user});
    if (user) {
      Cookies.set('user', JSON.stringify(user), {expires: 1}); // 1 day
    } else {
      Cookies.remove('user');
    }
  },

  setToken: (token: string | null) => {
    set({token});
    if (token) {
      Cookies.set('auth_token', token, {expires: 7}); // 7 days
    } else {
      Cookies.remove('auth_token');
    }
  },

  logout: () => {
    set({user: null, token: null});
    Cookies.remove('user');
    Cookies.remove('auth_token');
  },
}));

export default useAuthStore;
