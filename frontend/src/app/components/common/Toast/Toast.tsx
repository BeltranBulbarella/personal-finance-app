import {toast} from 'react-toastify';

const baseToast = (type: 'success' | 'error', message: string) => {
  return toast[type](message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  });
};

export const SuccessToast = (message: string) => baseToast('success', message);
export const ErrorToast = (message: string) => baseToast('error', message);
