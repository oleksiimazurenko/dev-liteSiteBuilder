import { create } from "zustand";

export type typeRefreshGsapToken = {
  refreshToken: number;
  setRefreshGsapToken: (value: number) => void;
};

export const useRefreshGsapToken = create<typeRefreshGsapToken>((set) => ({
  refreshToken: Math.random(),
  setRefreshGsapToken: (value) => set({ refreshToken: value }),
}));
