"use client";

import { useDrawerToolsStore } from "@/shared/store/editable-group-store";
import { PlusSquare } from "lucide-react";
import { useRef } from "react";

type CreateProductTriggerProps = {
  componentId: string;
};

export function CreateProductTrigger({
  componentId,
}: CreateProductTriggerProps) {
  const triggerPopoverRefs = useRef<HTMLDivElement | null>(null);

  const {
    setEditableGroup,
    setIsOpenDrawerTools,
    setTypeOpen,
    setIdComponent,
    editableGroup,
    isOpenDrawerTools,
  } = useDrawerToolsStore();

  const { editableElement, editableTrigger } = editableGroup;

  const onHandleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Помечаем с чем работает поповер
    setTypeOpen("create-product");

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

    setIdComponent(componentId);
  };

  return (
    <div
      className="flex h-[240px] w-[220px] cursor-pointer items-center justify-center rounded-xl border bg-slate-100 shadow-xl transition hover:scale-105"
      data-trigger-popover
      tabIndex={0}
      onClick={(e) => onHandleClick(e)}
      ref={triggerPopoverRefs}
    >
      <PlusSquare
        strokeWidth={0.1}
        absoluteStrokeWidth
        width={100}
        height={100}
      />
    </div>
  );
}
