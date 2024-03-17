"use client";

import { useDrawerToolsStore } from "@/shared/store/editable-group-store";
import { PlusSquare } from "lucide-react";

export function CreateSectionTrigger() {
  const {
    setEditableGroup,
    setIsOpenDrawerTools,
    setTypeOpen,
    editableGroup,
    isOpenDrawerTools,
  } = useDrawerToolsStore();

  const { editableElement, editableTrigger } = editableGroup;

  const onHandleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    // Устанавливаем тип открытия поповера
    setTypeOpen("create-section");

    // Убираем outline c предыдущего элемента
    (editableElement as HTMLElement)?.style.setProperty("outline", "none");

    // Убираем outline c кнопки
    e.currentTarget?.style.setProperty("outline", "none");

    if (!isOpenDrawerTools || editableTrigger === e.target)
      setIsOpenDrawerTools(!isOpenDrawerTools);

    // Сохраняем элемент над которым производились изменения
    setEditableGroup({
      ...editableGroup,
      editableTrigger: e.target as SVGSVGElement,
    });
  };

  return (
    <div className="mr-[30px] w-[52.5px] cursor-pointer justify-self-end rounded-bl-sm rounded-br-sm border bg-slate-100 shadow-xl">
      <PlusSquare
        data-trigger-popover
        onClick={(e) => onHandleClick(e)}
        tabIndex={0}
        strokeWidth={0.5}
        absoluteStrokeWidth
        className="z-40 h-[50px] w-[50px] animate-pulse text-slate-950 transition-all hover:scale-105"
      />
    </div>
  );
}
