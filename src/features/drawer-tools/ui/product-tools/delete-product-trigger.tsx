"use client";

import { useDrawerToolsStore } from "@/shared/store/editable-group-store";
import { XCircle } from "lucide-react";
import { useRef } from "react";

type DeleteProductTriggerProps = {
  idProduct: string;
};

export function DeleteProductTrigger({ idProduct }: DeleteProductTriggerProps) {
  const triggerPopoverRefs = useRef<SVGSVGElement | null>(null);

  const {
    setEditableGroup,
    setIsOpenDrawerTools,
    setTypeOpen,
    setIdProduct,
    editableGroup,
    isOpenDrawerTools,
  } = useDrawerToolsStore();

  const { editableElement, editableTrigger } = editableGroup;

  const onHandleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    // Помечаем с чем работает поповер
    setTypeOpen("delete-product");

    setIdProduct(idProduct);

    // Убираем outline c предыдущего элемента
    editableElement &&
      (editableElement as HTMLElement)?.style.setProperty("outline", "none");

    // Убираем outline c текущего элемента(кнопка)
    triggerPopoverRefs.current?.style.setProperty("outline", "none");

    // Условие закрытия и открытия поповера

    if (!isOpenDrawerTools || editableTrigger === e.target)
      setIsOpenDrawerTools(!isOpenDrawerTools);

    // Сохраняем элемент на который мы нажали.
    setEditableGroup({
      ...editableGroup,
      editableTrigger: triggerPopoverRefs.current,
    });
  };

  return (
    <div className="absolute right-[-20px] top-[-20px] animate-pulse animate-pulse cursor-pointer rounded-xl border bg-slate-100 shadow-xl transition-all hover:scale-110">
      <XCircle
        className="h-[15px] w-[15px] text-slate-950"
        strokeWidth={0.5}
        absoluteStrokeWidth
        data-trigger-popover
        ref={triggerPopoverRefs}
        onClick={(e) => onHandleClick(e)}
        tabIndex={0}
      />
    </div>
  );
}
