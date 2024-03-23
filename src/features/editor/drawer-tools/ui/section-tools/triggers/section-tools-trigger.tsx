"use client";

import { useDrawerToolsStore } from "@/shared/store/editable-group-store";
import { Settings } from "lucide-react";
import { forwardRef } from "react";

type SectionToolsTriggerProps = {
  id: string;
};

const SectionToolsTrigger = forwardRef<SVGSVGElement, SectionToolsTriggerProps>(
  ({ id }, ref) => {
    const {
      setEditableGroup,
      setIsOpenDrawerTools,
      setTypeOpen,
      editableGroup,
      isOpenDrawerTools,
    } = useDrawerToolsStore();

    const { editableElement, editableTrigger } = editableGroup;

    const onHandleClick = (e: React.MouseEvent<SVGSVGElement>, id: string) => {
      // Устанавливаем тип открытия поповера
      setTypeOpen("section");

      // Убираем outline c предыдущего элемента
      (editableElement as HTMLElement)?.style.setProperty("outline", "none");

      // Убираем outline c кнопки
      e.currentTarget?.style.setProperty("outline", "none");

      if (!isOpenDrawerTools || editableTrigger === e.target)
        setIsOpenDrawerTools(!isOpenDrawerTools);

      // Сохраняем элемент над которым производились изменения
      setEditableGroup({
        editableElement: document.querySelector(`[data-id="${id}"]`),
        editableTrigger: e.target as SVGSVGElement,
      });
    };

    return (
      <Settings
        data-trigger-tools
        size={40}
        strokeWidth={0.5}
        tabIndex={0}
        className="cursor-pointer transition-all hover:scale-105 svg-icon-stroke"
        onClick={(e) => onHandleClick(e, id)}
      />
    );
  },
);

SectionToolsTrigger.displayName = "TriggerDrawerTools";

export { SectionToolsTrigger };
