import { DraggableProvided } from "@hello-pangea/dnd";
import cn from "classnames";
import { MutableRefObject, forwardRef } from "react";
import { CreateElementTrigger } from "./triggers/create-element-trigger";
import { CreateSectionTrigger } from "./triggers/create-section-trigger";
import { DragHandleTrigger } from "./triggers/drag-handle-trigger";
import { SectionToolsTrigger } from "./triggers/section-tools-trigger";
import { PanelParams } from "./types/types";

type SectionPanelToolsProps = {
  id: string;
  provided: DraggableProvided;
  panelParams: PanelParams;
  // setDragPositionPanel: (id: string) => void;
};

export const SectionPanelTools = forwardRef<HTMLDivElement, SectionPanelToolsProps>(
  ({ id, provided, panelParams, 
    // setDragPositionPanel 
  }, ref) => {
    const { isAbsolute, positionY, lastPositionY } = panelParams;

    return (
      <div
        ref={ref}
        className={cn(
          "bg-glass absolute right-[20px] top-[calc(50%-24px)] z-10 -translate-y-1/2 transform rounded-xl border-none p-1 shadow-xl",
          {
            ["!bottom-0 top-auto !-translate-y-[20px]"]:
              lastPositionY === "bottom",
            ["!top-0 !translate-y-[20px]"]: lastPositionY === "top",
          },
        )}
        style={{
          top: !isAbsolute ? positionY : undefined,
          position: isAbsolute ? "absolute" : "fixed",
        }}
      >
        {/* Кнопка для перетаскивания секций */}
        <DragHandleTrigger provided={provided} id={id} 
        // setDragPositionPanel={setDragPositionPanel}
        />

        {/*Кнопка для открытия поповера настроек секции*/}
        <SectionToolsTrigger id={id} />

        {/* Кнопка для создания элементов */}
        <CreateElementTrigger id={id} />

        {/* Кнопка для создания секции */}
        <CreateSectionTrigger />
      </div>
    );
  },
);
