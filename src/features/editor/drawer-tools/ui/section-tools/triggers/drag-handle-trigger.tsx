'use client'

import { DraggableProvided } from "@hello-pangea/dnd";
import { GripVertical } from "lucide-react";
import { MutableRefObject, forwardRef } from 'react'

type DragHandleTriggerProps = {
  provided: DraggableProvided;
  id: string;
  // setDragPositionPanel: (id: string) => void;
};

export const DragHandleTrigger = forwardRef<HTMLDivElement, DragHandleTriggerProps>(({ provided, id, 
  // setDragPositionPanel
 }, ref) => {

  // const handleMouseEnter = () => {
    
  //   const mutableRef = ref as MutableRefObject<HTMLDivElement | null>;
  //   console.log(mutableRef.current);
  //   if (mutableRef.current) {
  //     mutableRef.current.style.position = "absolute";
  //   }
    
  // }

  return (
    <div {...provided.dragHandleProps} 
    // onMouseEnter={() => setDragPositionPanel(id)}
    >
      <GripVertical
        size={40}
        strokeWidth={0.5}
        className="py-[5px] transition-all hover:scale-105 hover:cursor-grab svg-icon-stroke"
      />
    </div>
  );
  
})