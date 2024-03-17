"use client";

import { useDrawerToolsStore } from "@/shared/store/editable-group-store";
import { PlusSquare } from "lucide-react";
import { useRef } from "react";

export function CreatePageTrigger() {
  const triggerPopoverRefs = useRef<SVGSVGElement | null>(null);

  const {
    setEditableGroup,
    setIsOpenDrawerTools,
    setTypeOpen,
    editableGroup,
    isOpenDrawerTools,
  } = useDrawerToolsStore();

  const { editableElement, editableTrigger } = editableGroup;

  const onHandleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    // Помечаем с чем работает поповер
    setTypeOpen("create-page");

    // Убираем outline c предыдущего элемента
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
    <div className="ml-[20px] animate-pulse cursor-pointer rounded-sm border bg-slate-100 shadow-xl transition-all hover:scale-125">
      <PlusSquare
        data-trigger-popover
        ref={triggerPopoverRefs}
        onClick={(e) => onHandleClick(e)}
        tabIndex={0}
        strokeWidth={0.5}
        absoluteStrokeWidth
        className="z-40 text-slate-950"
      />
    </div>
  );
}
