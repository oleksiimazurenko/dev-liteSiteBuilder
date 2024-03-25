"use client";

import { DraggableProvided } from "@hello-pangea/dnd";
import { CreateElementTrigger } from "./triggers/create-element-trigger";
import { CreateSectionTrigger } from "./triggers/create-section-trigger";
import { DragHandleTrigger } from "./triggers/drag-handle-trigger";
import { SectionToolsTrigger } from "./triggers/section-tools-trigger";
import cn from "classnames";

type SectionPanelToolsProps = {
  id: string;
  provided: DraggableProvided;
  top: string | number | undefined;
  isVisible: boolean;
};

export function SectionPanelTools({
  id,
  provided,
  top,
  isVisible,
}: SectionPanelToolsProps) {
  console.log(isVisible);
  return (
    <div
      className={cn(
        "bg-glass right-[20px] z-10 -translate-y-1/2 transform rounded-xl border-none p-1 shadow-xl",
        {
          ["fixed"]: isVisible,
          ["absolute"]: !isVisible,
        },
      )}
      style={{
        top: top,
      }}
      key={id}
    >
      {/* Кнопка для перетаскивания секций */}
      <DragHandleTrigger provided={provided} />

      {/*Кнопка для открытия поповера настроек секции*/}
      <SectionToolsTrigger id={id} />

      {/* Кнопка для создания элементов */}
      <CreateElementTrigger id={id} />

      {/* Кнопка для создания секции */}
      <CreateSectionTrigger />
    </div>
  );
}
