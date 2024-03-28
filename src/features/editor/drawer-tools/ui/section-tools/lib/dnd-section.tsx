"use client";

import { sortSection } from "@/shared/actions/section/set/sort-sections";
import {
  typeCurrentItemsDND,
  useDNDSectionStore,
} from "@/shared/store/dnd-store";
import { useRefreshGsapToken } from "@/shared/store/refresh-gsap-status";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { SectionPanelTools } from "../section-panel-tools";

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
  const { refreshToken } = useRefreshGsapToken();

  const sectionRefs: MutableRefObject<SectionRefs> = useRef<SectionRefs>({});
  const panelRefs: MutableRefObject<PanelRefs> = useRef<PanelRefs>({});

  useEffect(() => {
    if (Object.keys(sectionRefs.current).length > 0) {
      Object.keys(sectionRefs.current).forEach((id) => {
        const section = sectionRefs.current[id];
        const panel = panelRefs.current[id];

        if (panel && section) {
          const sectionRect = section.getBoundingClientRect();
          const viewportHeight = window.innerHeight;

          // Вычисляем видимую высоту секции
          const visibleTop = Math.max(sectionRect.top, 0);
          const visibleBottom = Math.min(sectionRect.bottom, viewportHeight);
          const visibleHeight = visibleBottom - visibleTop;

          let initialY;

          if (sectionRect.bottom > 0 && sectionRect.top < viewportHeight) {
            // Секция полностью или частично видна
            const panelHeight = panel.offsetHeight;
            // Если секция видна только частично снизу или сверху
            if (sectionRect.top < 0 || sectionRect.bottom > viewportHeight) {
              initialY =
                visibleTop +
                (visibleHeight - panelHeight) / 2 -
                Math.max(sectionRect.top, 0);
            } else {
              // Если секция полностью видна
              initialY = (sectionRect.height - panelHeight) / 2;
            }
          } else {
            // Секция не видна (расположена полностью ниже видимой области экрана)
            initialY = 20;
          }

          gsap.set(panel, { y: initialY });
        }
      });
    }
  }, [refreshToken, currentItems]);

  const calculateY = (section: HTMLDivElement, panel: HTMLDivElement) => {
    const sectionRect = section.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Вычисляем видимую высоту секции
    const visibleTop = Math.max(sectionRect.top, 0); // Верхняя граница видимой части секции
    const visibleBottom = Math.min(sectionRect.bottom, viewportHeight); // Нижняя граница видимой части секции
    const visibleHeight = visibleBottom - visibleTop; // Высота видимой части секции

    if (visibleHeight < 212) {
      gsap.set(panel, { y: 20 });
      return;
    }

    // Если секция не видна сразу, подождем, пока она не появится
    if (visibleHeight <= 0) return;

    // Центрируем панель относительно видимой части секции
    const panelHeight = panel.offsetHeight;
    const initialY =
      (visibleHeight - panelHeight) / 2 + visibleTop - sectionRect.top;

    gsap.set(panel, { y: initialY });
  };

  useEffect(() => {
    // После динамического удаления секций или любых других элементов которые взаимодействуют с ScrollTrigger нужно обновить ScrollTrigger
    if (Object.keys(sectionRefs.current).length > 0) {
      ScrollTrigger.refresh();
    }
  }, [currentItems, refreshToken]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (Object.keys(sectionRefs.current).length > 0) {
      Object.keys(sectionRefs.current).forEach((id, i) => {
        const section = sectionRefs.current[id];
        const panel = panelRefs.current[id];

        if (!section || !panel) return null;

        const sectionHeight = section.offsetHeight;

        ScrollTrigger.create({
          id: "top",
          trigger: section,
          start: "top 56px",
          end: `${sectionHeight - 172}px 56px`,
          scrub: true,
          markers: true,
          onUpdate: () => {
            calculateY(section, panel);
          },
        });

        ScrollTrigger.create({
          id: "bottom",
          trigger: section,
          start: `top bottom`,
          end: `bottom bottom`,
          scrub: true,
          markers: true,
          onUpdate: () => {
            calculateY(section, panel);
          },
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [currentItems]);

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
  };

  // ---------------------------------------------------------------------------

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
                        ref={(ref) => (panelRefs.current[item.id] = ref)}
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
