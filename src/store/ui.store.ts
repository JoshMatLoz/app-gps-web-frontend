import { create } from "zustand";

interface UIStore{
  isDark: boolean;
  toggleTheme: () => void
};

export const useUIStore = create<UIStore>()((set) => ({
  isDark: false,
  toggleTheme: () => {
    set ((state) =>({isDark: !state.isDark}));
    document.documentElement.classList.toggle('dark');
  }
}))