import { create } from "zustand";
import { persist } from 'zustand/middleware'

interface UIStore{
  isDark: boolean;
  toggleTheme: () => void
};

export const useUIStore = create<UIStore>()(persist(
  (set) => ({
    isDark: false,
    toggleTheme: () => {
      set ((state) =>({isDark: !state.isDark}));
      document.documentElement.classList.toggle('dark');
    }
  }),
  { 
    name: 'ui-store',
    onRehydrateStorage: () => (state) => {
      if (state?.isDark) {
        document.documentElement.classList.add('dark')
      }
    } 
  }
  
))