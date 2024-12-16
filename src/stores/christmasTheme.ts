import { create } from 'zustand';

interface ChristmasThemeState {
  isChristmasTheme: boolean;
  toggleChristmasTheme: () => void;
  setChristmasTheme: (value: boolean) => void;
}

export const useChristmasThemeStore = create<ChristmasThemeState>((set) => ({
  isChristmasTheme: false,
  toggleChristmasTheme: () => set((state) => ({ isChristmasTheme: !state.isChristmasTheme })),
  setChristmasTheme: (value) => set({ isChristmasTheme: value }),
}));
