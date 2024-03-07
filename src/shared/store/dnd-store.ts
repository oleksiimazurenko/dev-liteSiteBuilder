import { ReactNode } from "react";
import { create } from "zustand";

export type typeCurrentItemsDND = {
  id: string;
  content: JSX.Element | ReactNode | string;
};

//-----------------------------------------------------------------------------------------------------------------------

export type typeStoreDNDSection = {
  currentItems: typeCurrentItemsDND[];
  setDNDItems: (items: typeCurrentItemsDND[]) => void;
};

export const useDNDSectionStore = create<typeStoreDNDSection>((set) => ({
  currentItems: [],
  setDNDItems: (items) => set({ currentItems: items }),
}));

//-----------------------------------------------------------------------------------------------------------------------

export type typeActiveDNDComponent = {
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
};

export const useActiveDNDComponentStore = create<typeActiveDNDComponent>(
  (set) => ({
    isActive: false,
    setIsActive: (isActive) => set({ isActive }),
  }),
);

//-----------------------------------------------------------------------------------------------------------------------
