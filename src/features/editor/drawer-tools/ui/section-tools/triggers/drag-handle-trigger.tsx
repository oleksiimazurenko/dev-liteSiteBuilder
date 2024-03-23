import { DraggableProvided } from "@hello-pangea/dnd";
import { GripVertical } from "lucide-react";

type SectionPanelToolsProps = {
  provided: DraggableProvided;
};

export function DragHandleTrigger({ provided }: SectionPanelToolsProps) {
  return (
    <div {...provided.dragHandleProps}>
      <GripVertical
        size={40}
        strokeWidth={0.5}
        className="py-[5px] transition-all hover:scale-105 hover:cursor-grab svg-icon-stroke"
      />
    </div>
  );
}
