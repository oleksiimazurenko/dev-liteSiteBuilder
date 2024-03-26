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
import { PanelParams, Rect } from "../types/types";

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

  const [panelParams, setPanelParams] = useState<Record<string, PanelParams>>(
    {},
  );

  const updatePanelPositions = () => {
    const viewportHeight = window.innerHeight;
    const newPanelParams = Object.keys(sectionRefs.current).reduce<
      Record<string, PanelParams>
    >((acc, id) => {
      const section = sectionRefs.current[id];
      if (!section) return acc;

      const rectSection = section.getBoundingClientRect();
      const isVisible =
        rectSection.top < viewportHeight && rectSection.bottom > 0;
      acc[id] = calculatePanelParams(rectSection, isVisible, viewportHeight);

      return acc;
    }, {});

    setPanelParams(newPanelParams);
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
                        panelParams={
                          panelParams[item.id]
                            ? panelParams[item.id]
                            : {
                                isAbsolute: true,
                                positionY: "calc(50% + 20px)",
                                lastPositionY: "initial",
                              }
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

export function calculatePanelParams(
  rect: Rect,
  isVisible: boolean,
  viewportHeight: number = window.innerHeight,
): PanelParams {
  const isAbsolute =
    !isVisible || rect.bottom < 212 || rect.top > viewportHeight - 214;
  const visibleHeight = isAbsolute
    ? Math.min(214, viewportHeight) - Math.max(rect.top, 0)
    : Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
  const positionY = `${Math.max(rect.top, 0) + visibleHeight / 2}px`;
  const lastPositionY =
    rect.bottom < 212
      ? "bottom"
      : rect.top > viewportHeight - 214
        ? "top"
        : "initial";

  return { isAbsolute, positionY, lastPositionY };
}

// Функция для переупорядочивания элементов
export function reorder(
  list: typeCurrentItemsDND[],
  startIndex: number,
  endIndex: number,
): typeCurrentItemsDND[] {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};