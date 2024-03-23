"use client";

import { useDrawerToolsStore } from "@/shared/store/editable-group-store";
import { Component } from "lucide-react";
import { forwardRef } from "react";

type SectionToolsTriggerProps = {
  id: string;
};

const CreateElementTrigger = forwardRef<
  SVGSVGElement,
  SectionToolsTriggerProps
>(({ id }, ref) => {
  const {
    setEditableGroup,
    setIsOpenDrawerTools,
    setTypeOpen,
    editableGroup,
    isOpenDrawerTools,
  } = useDrawerToolsStore();

  const { editableElement, editableTrigger } = editableGroup;

  const onHandleClick = (e: React.MouseEvent<SVGSVGElement>, id: string) => {
    // Помечаем с чем работает поповер
    setTypeOpen("create-element");

    // Убираем outline c предыдущего элемента
    (editableElement as HTMLElement)?.style.setProperty("outline", "none");

    // Убираем outline c текущего элемента(кнопка)
    (e.target as HTMLElement)?.style.setProperty("outline", "none");

    if (!isOpenDrawerTools || editableTrigger === e.target)
      setIsOpenDrawerTools(!isOpenDrawerTools);

    // Сохраняем элемент на который мы нажали.
    setEditableGroup({
      editableElement: document.querySelector(`[data-id="${id}"]`),
      editableTrigger: e.target as SVGSVGElement,
    });
  };

  return (
    <Component
      data-trigger-tools
      onClick={(e) => onHandleClick(e, id)}
      size={40}
      tabIndex={0}
      strokeWidth={0.5}
      absoluteStrokeWidth
      className="mt-1 cursor-pointer text-slate-950 transition-all hover:scale-105 svg-icon-stroke"
    />
  );
});

CreateElementTrigger.displayName = "CreateElementTrigger";

export { CreateElementTrigger };
