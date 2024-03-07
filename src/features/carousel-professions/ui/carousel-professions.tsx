"use client";

import { useCurrentProfessionStore } from "@/shared/store/current-profession";
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

export function CarouselProfessions({
  type,
  professionsList,
}: CarouselProfessionsProps) {
  const { currentProfession, setCurrentProfession } =
    useCurrentProfessionStore();

  const line = type === "general-preview" ? 3 : 2;

  const resultProfessionList = splitProfessions(professionsList, line);

  return resultProfessionList.map((professions, index) => {
    return (
      <Carousel
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
          ["slider-mask"]: type === "general-preview",
        })}
      >
        <CarouselContent className="flex">
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
                  className="!relative aspect-[3/4]"
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
