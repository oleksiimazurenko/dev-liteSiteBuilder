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

export type typePopoverToolsStore = {
  editableGroup: typeEditableGroup;
  isOpenPopoverTools: boolean;
  typeOpen: typeOpen | null;

  idPage: string | null;

  idComponent: string | null;

  idProduct: string | null;

  setEditableGroup: (popupTriggerElement: typeEditableGroup) => void;
  setIsOpenPopoverTools: (isOpenPopoverTools: boolean) => void;
  setTypeOpen: (typeOpen: typeOpen) => void;

  setIdPage: (idPage: string) => void;

  setIdComponent: (idComponent: string) => void;

  setIdProduct: (idProduct: string) => void;
};

export const usePopoverToolsStore = create<typePopoverToolsStore>((set) => ({
  editableGroup: {
    editableElement: null,
    editableTrigger: null,
  },
  isOpenPopoverTools: false,
  typeOpen: null,

  idPage: null,

  idComponent: null,

  idProduct: null,

  setEditableGroup: (editableGroup) => set({ editableGroup }),
  setIsOpenPopoverTools: (isOpenPopoverTools) =>
    set({ isOpenPopoverTools: isOpenPopoverTools }),
  setTypeOpen: (typeOpen) => set({ typeOpen }),

  setIdPage: (idPage) => set({ idPage }),
  setIdComponent: (idComponent) => set({ idComponent }),

  setIdProduct: (idProduct) => set({ idProduct }),
}));