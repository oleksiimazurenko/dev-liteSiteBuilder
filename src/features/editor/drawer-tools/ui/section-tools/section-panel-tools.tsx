import { DraggableProvided } from "@hello-pangea/dnd";
import cn from "classnames";
import { CreateElementTrigger } from "./triggers/create-element-trigger";
import { CreateSectionTrigger } from "./triggers/create-section-trigger";
import { DragHandleTrigger } from "./triggers/drag-handle-trigger";
import { SectionToolsTrigger } from "./triggers/section-tools-trigger";
import { PanelParams } from "./types/types";

type SectionPanelToolsProps = {
  id: string;
  provided: DraggableProvided;
  panelParams: PanelParams;
};

export const SectionPanelTools = ({
  id,
  provided,
  panelParams,
}: SectionPanelToolsProps) => {
  const { isAbsolute, positionY, lastPositionY } = panelParams;

  return (
    <div
      className={cn(
        "bg-glass absolute right-[20px] top-[calc(50%-24px)] z-10 -translate-y-1/2 transform rounded-xl border-none p-1 shadow-xl",
        {
          ["!bottom-0 !-translate-y-[20px] top-auto"]: lastPositionY === "bottom",
          ["!top-0 !translate-y-[20px]"]: lastPositionY === "top",
        },
      )}
      style={{
        top: !isAbsolute ? positionY : undefined,
        position: isAbsolute ? "absolute" : "fixed",
      }}
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
};
