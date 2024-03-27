"use client";

import { sortSection } from "@/shared/actions/section/set/sort-sections";
import {
  typeCurrentItemsDND,
  useDNDSectionStore,
} from "@/shared/store/dnd-store";
import {
  DragDropContext,
  DragStart,
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
type PanelRefs = {
  [key: string]: HTMLDivElement | null;
};

type DNDProps = {
  items: typeCurrentItemsDND[];
};

export function DNDSection({ items }: DNDProps) {
  const { currentItems, setDNDItems } = useDNDSectionStore();
  const [isMounted, setIsMounted] = useState(false);
  // const handleScrollRef = useRef<() => void>(updatePanelPositions);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const sectionRefs: MutableRefObject<SectionRefs> = useRef<SectionRefs>({});
  const panelRefs: MutableRefObject<PanelRefs> = useRef<PanelRefs>({});

  const [panelParams, setPanelParams] = useState<Record<string, PanelParams>>(
    {},
  );

  function updatePanelPositions() {
    const viewportHeight = window.innerHeight;
    const newPanelParams = Object.keys(sectionRefs.current).reduce<
      Record<string, PanelParams>
    >((acc, id, i) => {
      const section = sectionRefs.current[id];
      if (!section) return acc;

      const rectSection = section.getBoundingClientRect();
      const isVisible =
        rectSection.top < viewportHeight && rectSection.bottom > 0;

      acc[id] = {
        ...calculatePanelParams(rectSection, isVisible, viewportHeight),
        lastRectTopPanel: panelRefs.current[id]?.getBoundingClientRect().top,
      };

      if (i === 0)
        console.log(panelRefs.current[id]?.getBoundingClientRect().top);

      return acc;
    }, {});

    setPanelParams(newPanelParams);
  }

  useEffect(() => {
    const handleScroll = () => {
      if (scrollEnabled) {
        updatePanelPositions();
      }
    };

    window.addEventListener("scroll", handleScroll);
    if (scrollEnabled) {
      handleScroll(); // Инициализирующий вызов
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollEnabled]);

  //--------------------------------------------------------------------------------

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

    // -----------------------------
    const id = result.draggableId;
    const childElement = sectionRefs.current[id]?.firstChild;

    // Включаем скроллинг обратно
    setScrollEnabled(true);

    if (childElement instanceof HTMLElement) {
      childElement.style.transform = "translateY(-50%)";
      childElement.style.position = "fixed";
    }
  };

  // ---------------------------------------------------------------------------

  const setDragPositionPanel = (e: DragStart) => {
    // Отрубаем этот гребанный скроллинг!
    setScrollEnabled(false);

    // Получаем id перетаскиваемой панели
    const id = e.draggableId;

    // Переводим все эти конченные панели в абсолютное позиционирование
    Object.keys(sectionRefs.current).forEach((id) => {
      const childElement = sectionRefs.current[id]?.firstChild;
      if (childElement instanceof HTMLElement) {
        childElement.style.position = "absolute";
      }
    });

    const childElement = sectionRefs.current[id]?.firstChild;
    const parentElement = sectionRefs.current[id];
    const childRectTop = panelParams[id]?.lastRectTopPanel;

    if (childElement instanceof HTMLElement && parentElement && childRectTop) {
      const parentRectTop = parentElement.getBoundingClientRect().top;
      const distanceToParentTop = childRectTop - parentRectTop;

      childElement.style.top = `${distanceToParentTop}px`;
      childElement.style.transform = `translateY(${0}px)`;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={setDragPositionPanel}>
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
                        ref={(ref) => (panelRefs.current[item.id] = ref)}
                        panelParams={
                          panelParams[item.id]
                            ? panelParams[item.id]
                            : {
                                isAbsolute: true,
                                positionY: undefined,
                                lastPositionY: "initial",
                                lastRectTopPanel: undefined,
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
): Omit<PanelParams, "lastRectTopPanel"> {
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
}
