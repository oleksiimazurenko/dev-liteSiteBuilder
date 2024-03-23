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
    <PlusSquare
      data-trigger-popover
      onClick={(e) => onHandleClick(e)}
      tabIndex={0}
      strokeWidth={0.5}
      size={40}
      absoluteStrokeWidth
      className="cursor-pointer transition-all hover:scale-105 svg-icon-stroke"
    />
  );
}
