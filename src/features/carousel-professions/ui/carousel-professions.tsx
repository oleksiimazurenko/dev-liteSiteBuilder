"use client";

import { useCurrentProfessionStore } from "@/shared/store/current-profession";
import { Dictionary, useDictionaryStore } from '@/shared/store/dictionary-store'
import { ProfessionObject } from "@/shared/types/dectionary";
import { Carousel, CarouselContent, CarouselItem } from "@/shared/ui/carousel";
import { splitProfessions } from "@/shared/utils/split-professions";

import cn from "classnames";
import AutoScroll from "embla-carousel-auto-scroll";
import Image from "next/image";

type CarouselProfessionsProps = {
  type: "general-preview" | "list-sites";
  professionsList: ProfessionObject[];
};

function isProfessionObjectArray(array: any): array is ProfessionObject[] {
  return Array.isArray(array) && array.every(item => 
    typeof item === 'object' && 'profession' in item && 'imagePreview' in item);
}

export function CarouselProfessions({
  type,
  professionsList,
}: CarouselProfessionsProps) {
  const { currentProfession, setCurrentProfession } = useCurrentProfessionStore();

  // Получаем professionsList из store, при этом убедимся, что он соответствует ожидаемому типу
  const dictionaryProfessionsList = (useDictionaryStore()?.dictionary?.main_page as Dictionary)?.professions_list as unknown as ProfessionObject[];
  const storeProfessionsList = isProfessionObjectArray(dictionaryProfessionsList) ? dictionaryProfessionsList : undefined;

  const currentProfessionsList = storeProfessionsList || professionsList;

  const line = type === "general-preview" ? 3 : 2;
  const resultProfessionList = splitProfessions(currentProfessionsList, line);

  return resultProfessionList.map((professions, index) => {
    return (
      <Carousel
        orientation={type === "general-preview" ? "horizontal" : "vertical"}
        key={index}
        opts={{
          loop: true,
          dragFree: true,
        }}
        plugins={[
          AutoScroll({
            speed: 0.2,
            direction: index === 1 ? "forward" : "left",
            stopOnInteraction: false,
          }),
        ]}
        className={cn("", {
          ["horizontal-mask"]: type === "general-preview",
        })}
      >
        <CarouselContent
          className={cn("flex", {
            ["h-[calc(100svh-72px)] flex-col"]: type === "list-sites",
          })}
        >
          {professions.map(({ profession, imagePreview }, i) => (
            <CarouselItem
              key={profession}
              className={cn(
                "tw2 dark:td2 flex-shrink flex-grow basis-auto cursor-pointer text-center",
                {
                  ["!text-slate-950"]: profession === currentProfession,
                },
              )}
              onClick={() => setCurrentProfession(profession)}
            >
              {type === "general-preview" ? (
                profession
              ) : (
                <Image
                  src={imagePreview}
                  alt={profession}
                  className="!relative aspect-[3/4] rounded-xl border border-white"
                  fill={true}
                  objectFit="cover"
                />
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    );
  });
}
