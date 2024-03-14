import { create } from "zustand";

type typeOpen =
  | "text"
  | "section"
  | "image"
  | "create-page"
  | "delete-page"
  | "delete-product"
  | "create-product"
  | "create-element"
  | "create-section";

type typeEditableGroup = {
  editableElement: HTMLElement | SVGSVGElement | null;
  editableTrigger: SVGSVGElement | HTMLElement | null;
};

export type typeDrawerToolsStore = {
  editableGroup: typeEditableGroup;
  isOpenDrawerTools: boolean;
  typeOpen: typeOpen | null;

  idPage: string | null;

  idComponent: string | null;

  idProduct: string | null;

  setEditableGroup: (popupTriggerElement: typeEditableGroup) => void;
  setIsOpenDrawerTools: (isOpenDrawerTools: boolean) => void;
  setTypeOpen: (typeOpen: typeOpen) => void;

  setIdPage: (idPage: string) => void;

  setIdComponent: (idComponent: string) => void;

  setIdProduct: (idProduct: string) => void;
};

export const useDrawerToolsStore = create<typeDrawerToolsStore>((set) => ({
  editableGroup: {
    editableElement: null,
    editableTrigger: null,
  },
  isOpenDrawerTools: false,
  typeOpen: null,

  idPage: null,

  idComponent: null,

  idProduct: null,

  setEditableGroup: (editableGroup) => set({ editableGroup }),
  setIsOpenDrawerTools: (isOpenDrawerTools) =>
    set({ isOpenDrawerTools: isOpenDrawerTools }),
  setTypeOpen: (typeOpen) => set({ typeOpen }),

  setIdPage: (idPage) => set({ idPage }),
  setIdComponent: (idComponent) => set({ idComponent }),

  setIdProduct: (idProduct) => set({ idProduct }),
}));
