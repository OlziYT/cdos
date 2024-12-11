import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthError, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthStore extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,

      login: async ({ email, password }) => {
        set({ isLoading: true, error: null });
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) throw error;
          set({ user: data.user, isLoading: false });
        } catch (error) {
          set({
            error: (error as AuthError).message,
            isLoading: false,
          });
        }
      },

      signup: async ({ email, password }) => {
        set({ isLoading: true, error: null });
        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
          });

          if (error) throw error;
          set({ user: data.user, isLoading: false });
        } catch (error) {
          set({
            error: (error as AuthError).message,
            isLoading: false,
          });
        }
      },

      logout: async () => {
        set({ isLoading: true, error: null });
        try {
          const { error } = await supabase.auth.signOut();
          if (error) throw error;
          set({ user: null, isLoading: false });
        } catch (error) {
          set({
            error: (error as AuthError).message,
            isLoading: false,
          });
        }
      },

      resetPassword: async (email: string) => {
        set({ isLoading: true, error: null });
        try {
          const { error } = await supabase.auth.resetPasswordForEmail(email);
          if (error) throw error;
          set({ isLoading: false });
        } catch (error) {
          set({
            error: (error as AuthError).message,
            isLoading: false,
          });
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);