import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/auth';

interface AuthStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,

      setUser: (user: User): void => { set({ user }); },

      setToken: (token: string): void => {
        localStorage.setItem('access_token', token);
        set({ token });
      },

      setLoading: (isLoading: boolean): void => {set({ isLoading });  },

      logout: (): void => {
        localStorage.removeItem('access_token');
        set({ user: null, token: null });
      },

      isAuthenticated: (): boolean => !!get().token,
    }),
    { name: 'lifekart-auth' }
  )
);