import { create } from 'zustand'

export type Theme = "light" | "dark";

export type typeStoreTheme = {
  theme: Theme;
  setTheme: (value: Theme) => void;
};

export const useThemeStore = create<typeStoreTheme>((set) => ({
  theme: 'light',
  setTheme: (value) => set({ theme: value}),
}));

