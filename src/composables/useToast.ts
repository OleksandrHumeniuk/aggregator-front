import { useToast as usePrimeToast } from 'primevue/usetoast';

const TOAST_LIFETIME = 3000;

const useToast = () => {
  const toast = usePrimeToast();

  return {
    error: (message: string) => {
      toast.add({
        severity: 'error',
        summary: 'Помилка!',
        detail: message,
        life: TOAST_LIFETIME,
      });
    },
  };
};

export default useToast;
