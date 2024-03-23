"use client";

import { useFirstSectionSpace } from "@/shared/hooks/use-first-section-space";
import {
  typeCurrentItemsDND,
  useDNDSectionStore,
} from "@/shared/store/dnd-store";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import { sortSection } from "../../../../../../shared/actions/section/set/sort-sections";
import { SectionPanelTools } from "../section-panel-tools";

type DNDProps = {
  items: typeCurrentItemsDND[];
};

export function DNDSection({ items }: DNDProps) {
  const { currentItems, setDNDItems } = useDNDSectionStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Установка начального состояния
    setDNDItems(items);
    setIsMounted(true);
  }, [items, setDNDItems]);

  // useFirstSectionSpace(); Пока что не нужно это делать так как нет Header

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const reorderedItems = reorder(
      currentItems,
      result.source.index,
      result.destination.index,
    );

    sortSection({
      currentItems: reorderedItems.map((item) => ({ id: item.id })),
      rPath: "/",
    });
    setDNDItems(reorderedItems);
  };

  // Функция для переупорядочивания элементов
  const reorder = (
    list: typeCurrentItemsDND[],
    startIndex: number,
    endIndex: number,
  ): typeCurrentItemsDND[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {isMounted ? (
        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              
            >
              {currentItems.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="relative"
                    >
                      <SectionPanelTools provided={provided} id={item.id} />

                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ) : null}
    </DragDropContext>
  );
}
