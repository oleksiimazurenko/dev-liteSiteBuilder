"use client";

import { DraggableProvided } from "@hello-pangea/dnd";
import cn from "classnames";
import { CreateElementTrigger } from "./triggers/create-element-trigger";
import { DragHandleTrigger } from "./triggers/drag-handle-trigger";
import { SectionToolsTrigger } from "./triggers/section-tools-trigger";
import { CreateSectionTrigger } from './triggers/create-section-trigger'

type SectionPanelToolsProps = {
  id: string;
  provided: DraggableProvided;
};

export function SectionPanelTools({ id, provided }: SectionPanelToolsProps) {
  return (
    <div
      className="bg-glass absolute bottom-8 right-6 rounded-xl border-none p-1 shadow-xl"
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
