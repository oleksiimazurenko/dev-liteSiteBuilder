import { create } from "zustand";

export type typeCurrentProfessionStore = {
  currentProfession: string;
  setCurrentProfession: (currentProfession: string) => void;
};

export const useCurrentProfessionStore = create<typeCurrentProfessionStore>(
  (set) => ({
    currentProfession: "Pattern Landee",
    setCurrentProfession: (currentProfession) =>
      set({ currentProfession: currentProfession }),
  }),
);
