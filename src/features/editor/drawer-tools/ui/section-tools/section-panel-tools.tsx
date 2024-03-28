import { DraggableProvided } from "@hello-pangea/dnd";
import cn from "classnames";
import { forwardRef, useEffect } from "react";
import { CreateElementTrigger } from "./triggers/create-element-trigger";
import { CreateSectionTrigger } from "./triggers/create-section-trigger";
import { DragHandleTrigger } from "./triggers/drag-handle-trigger";
import { SectionToolsTrigger } from "./triggers/section-tools-trigger";

type SectionPanelToolsProps = {
  id: string;
  provided: DraggableProvided;
};

export const SectionPanelTools = forwardRef<
  HTMLDivElement,
  SectionPanelToolsProps
>(({ id, provided }, ref) => {


  return (
    <div
      ref={ref}
      className={cn(
        "bg-glass absolute right-[20px] z-10 rounded-xl border-none p-1 shadow-xl",
      )}
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
});

SectionPanelTools.displayName = "SectionPanelTools";
