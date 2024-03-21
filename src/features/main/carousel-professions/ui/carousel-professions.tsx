"use client";

import {
  Dictionary,
  useDictionaryStore,
} from "@/shared/dictionary/store/dictionary-store";
import { useCurrentProfessionStore } from "@/shared/store/current-profession";
import { ProfessionObject } from "@/shared/types/dectionary";
import { Carousel, CarouselContent, CarouselItem } from "@/shared/ui/carousel";
import { isProfessionObjectArray } from "@/shared/utils/is-profession-object-array";
import { splitProfessions } from "@/shared/utils/split-professions";

import cn from "classnames";
import AutoScroll from "embla-carousel-auto-scroll";
import Image from "next/image";

type CarouselProfessionsProps = {
  type: "general-preview" | "home";
  professionsList: ProfessionObject[];
};

export function CarouselProfessions({
  type,
  professionsList,
}: CarouselProfessionsProps) {
  const { currentProfession, setCurrentProfession } =
    useCurrentProfessionStore();

  // Получаем professionsList из store, при этом убедимся, что он соответствует ожидаемому типу
  const dictionaryProfessionsList = (
    useDictionaryStore()?.dictionary?.main_page as Dictionary
  )?.professions_list as unknown as ProfessionObject[];
  // Если professionsList из store соответствует ожидаемому типу, то используем его, иначе используем professionsList из props
  const storeProfessionsList = isProfessionObjectArray(
    dictionaryProfessionsList,
  )
    ? dictionaryProfessionsList
    : undefined;

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
        className={cn("hidden md:block [&>div]:h-full", {
          ["horizontal-mask"]: type === "general-preview",
        })}
      >
        <CarouselContent
          className={cn("flex", {
            ["h-[calc(100svh-56px)] flex-col"]: type === "home",
          })}
        >
          {professions.map(({ profession, imagePreview }, i) => (
            <CarouselItem
              key={profession}
              className={cn(
                "relative flex-shrink flex-grow basis-auto cursor-pointer !bg-transparent text-center text-primary",
                {
                  ["!text-yellow-700/50"]: profession === currentProfession,
                  ["p-0"]: type === "home",
                },
              )}
              onClick={() => setCurrentProfession(profession)}
            >
              {type === "general-preview" ? (
                profession
              ) : (
                <>
                  <Image
                    src={imagePreview}
                    alt={profession}
                    className="!relative aspect-[3/4]"
                    fill={true}
                    objectFit="cover"
                  />
                  <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 -transform text-[20px]">
                    {profession}
                  </div>
                </>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    );
  });
}
