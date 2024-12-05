import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeStore {
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
}

// Détecte si le système préfère le thème sombre
const getSystemThemePreference = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

// Écoute les changements de préférence du système
const setupSystemThemeListener = (setTheme: (isDark: boolean) => void) => {
  if (typeof window === 'undefined') return;
  
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleChange = (e: MediaQueryListEvent) => {
    setTheme(e.matches);
  };
  
  mediaQuery.addEventListener('change', handleChange);
  return () => mediaQuery.removeEventListener('change', handleChange);
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      isDark: getSystemThemePreference(),
      toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
      setTheme: (isDark: boolean) => set({ isDark }),
    }),
    {
      name: 'theme-storage',
    }
  )
);

// Initialise l'écoute des changements de préférence système
if (typeof window !== 'undefined') {
  setupSystemThemeListener(useThemeStore.getState().setTheme);
}