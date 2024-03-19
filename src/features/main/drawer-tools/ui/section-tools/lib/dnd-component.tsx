"use client";

import { sortComponents } from "@/shared/actions/element/set/sort-components";
import {
  typeCurrentItemsDND,
  useActiveDNDComponentStore,
} from "@/shared/store/dnd-store";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import cn from "classnames";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type DNDProps = {
  items: typeCurrentItemsDND[];
};

export function DNDComponent({ items }: DNDProps) {
  const [currentItems, setDNDItems] = useState<typeCurrentItemsDND[]>(items);
  const [isMounted, setIsMounted] = useState(false);
  const pathName = usePathname();
  const { isActive } = useActiveDNDComponentStore();

  useEffect(() => {
    if (isActive) {
      setDNDItems(items);
      setIsMounted(true);
    }
  }, [items, setDNDItems, isActive]);

  if (!isActive) return items.map((item) => item.content);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const reorderedItems = reorder(
      currentItems,
      result.source.index,
      result.destination.index,
    );

    (async () => {
      const response = await sortComponents({
        currentItems: reorderedItems.map((item) => ({ id: item.id })),
        rPath: pathName,
      });
      response.success && toast.success("Sort success");
      response.error && toast.error(response.error);
    })();

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

  const onMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
    const parentElement = e.currentTarget as Element;
    parentElement?.classList.add("border", "border-blue-500", "rounded-md");
  };

  const onMouseOut = (e: React.MouseEvent<HTMLDivElement>) => {
    const parentElement = e.currentTarget as Element;
    parentElement?.classList.remove("border", "border-blue-500", "rounded-md");
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {isMounted ? (
        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="!w-full"
            >
              {currentItems.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={cn(
                        "relative flex flex-col items-center justify-center hover:cursor-grab",
                      )}
                      onMouseOver={onMouseOver}
                      onMouseOut={onMouseOut}
                    >
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