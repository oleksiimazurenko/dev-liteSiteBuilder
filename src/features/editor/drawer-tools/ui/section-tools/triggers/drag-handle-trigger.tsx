"use client";

import { DraggableProvided } from "@hello-pangea/dnd";
import { GripVertical } from "lucide-react";

type DragHandleTriggerProps = {
  provided: DraggableProvided;
  id: string;
};

export const DragHandleTrigger = ({ provided, id }: DragHandleTriggerProps) => {
  return (
    <div {...provided.dragHandleProps}>
      <GripVertical
        size={40}
        strokeWidth={0.5}
        className="svg-icon-stroke py-[5px] transition-all hover:scale-105 hover:cursor-grab"
      />
    </div>
  );
};
