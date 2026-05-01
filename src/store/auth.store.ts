import { create } from "zustand";
import type { User } from "../auth/types/auth.types";

interface AuthStore{
  user: User | null;
  isLoading: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
  setIsLoading: (value: boolean) =>void;
};

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  isLoading: true,
  // Usas esta cuando el valor nuevo viene de afuera — te lo pasan como parámetro. No necesitas saber el valor anterior.
  setUser: (newUser) => set({
    user: newUser
  }),
  clearUser: () => set({
    user: null
  }),
  setIsLoading: (newValue) => set({
    isLoading: newValue
  })
}));