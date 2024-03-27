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
import { useRefreshGsapToken } from "@/shared/store/refresh-gsap-status";

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

  // Например, вы можете заставить панель плавно следовать за скроллом в пределах своей секции, создавая эффект плавающего элемента, который всегда остаётся в поле зрения пользователя в рамках этой секции.

  const sectionRefs: MutableRefObject<SectionRefs> = useRef<SectionRefs>({});
  const panelRefs: MutableRefObject<PanelRefs> = useRef<PanelRefs>({});

  useEffect(() => {
    
    // После динамического удаления секций или любых других элементов которые взаимодействуют с ScrollTrigger нужно обновить ScrollTrigger
    if (Object.keys(sectionRefs.current).length > 0) {
      ScrollTrigger.refresh(true);
      console.log("ScrollTrigger.refresh(true)");
    }
  }, [currentItems, refreshToken]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (Object.keys(sectionRefs.current).length > 0) {
      
      Object.keys(sectionRefs.current).forEach((id, i) => {
        const section = sectionRefs.current[id];
        const panel = panelRefs.current[id];

        if (!section || !panel) return null;

        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          markers: true,
          onUpdate: (self) => {
            const progress = self.progress.toFixed(2); // Прогресс скролла от 0 до 1
            console.log(progress);
            // const sectionHeight = section.offsetHeight;
            // const panelHeight = panel.offsetHeight;
            // const viewportHeight = window.innerHeight;
            // const dynamicY = (sectionHeight - viewportHeight) * progress;

            // // Если видимая часть секции меньше высоты панели,
            // // панель будет двигаться вместе с секцией
            // if (viewportHeight < panelHeight) {
            //   gsap.to(panel, {y: dynamicY, immediateRender: false});
            // } else {
            //   // Панель остается в середине видимой части секции
            //   const maxScroll = sectionHeight - viewportHeight;
            //   const midPoint = Math.min(dynamicY, maxScroll / 2);
            //   gsap.to(panel, {y: midPoint, immediateRender: false});
            // }
          }
        });

        // gsap.to(panel, {
        //   scrollTrigger: {
        //     trigger: section,
        //     start: "top top",
        //     end: "bottom bottom",
        //     scrub: 3,
        //     markers: true,
        //   },
        //   y: section.offsetHeight - 212,
        //   ease: "none",
        //   duration: 5,
        // });
      });
    }

    // return () => {
    //   // Очищаем ScrollTriggers при размонтировании компонента
    //   ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    // };
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

    // -----------------------------
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
