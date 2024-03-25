"use client";

import { sortSection } from "@/shared/actions/section/set/sort-sections";
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
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { SectionPanelTools } from "../section-panel-tools";

type SectionRefs = {
  [key: string]: HTMLDivElement | null;
};

type DNDProps = {
  items: typeCurrentItemsDND[];
};

export function DNDSection({ items }: DNDProps) {
  const { currentItems, setDNDItems } = useDNDSectionStore();
  const [isMounted, setIsMounted] = useState(false);

  const sectionRefs: MutableRefObject<SectionRefs> = useRef<SectionRefs>({});
  const [panelPositions, setPanelPositions] = useState<Record<string, number>>(
    {},
  );
  const [visiblePanels, setVisiblePanels] = useState<Record<string, boolean>>(
    {},
  );

  const updatePanelPositions = () => {
    const newPositions: Record<string, number> = {};
    const newVisiblePanels: Record<string, boolean> = {};

    Object.keys(sectionRefs.current).forEach((id) => {
      const section = sectionRefs.current[id];
      if (section) {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        newVisiblePanels[id] = isVisible;

        if (isVisible) {
          const visibleHeight =
            Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
          newPositions[id] = Math.max(rect.top, 0) + visibleHeight / 2;
        }
      }
    });

    setVisiblePanels(newVisiblePanels);
    setPanelPositions(newPositions);
  };

  useEffect(() => {
    const handleScroll = () => updatePanelPositions();

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {currentItems.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={(ref) => {
                        provided.innerRef(ref);
                        sectionRefs.current[item.id] = ref;
                      }}
                      {...provided.draggableProps}
                      className="relative"
                    >
                      <SectionPanelTools
                        provided={provided}
                        id={item.id}
                        top={panelPositions[item.id] || `calc(50% + 24px)`}
                        isVisible={
                          index === 0 && visiblePanels[item.id] === undefined
                            ? true
                            : visiblePanels[item.id]
                        }
                      />

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
