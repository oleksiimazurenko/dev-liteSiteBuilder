import { create } from 'zustand'

export type typeRefreshGsapToken = {
  refreshToken: number;
  setRefreshToken: (value: number) => void;
};

export const useRefreshGsapToken = create<typeRefreshGsapToken>((set) => ({
  refreshToken: Math.random(),
  setRefreshToken: (value) => set({ refreshToken: value}),
}));

