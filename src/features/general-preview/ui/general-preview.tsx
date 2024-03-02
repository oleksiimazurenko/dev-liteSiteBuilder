"use client";

import { useDictionaryStore } from "@/shared/store/dictionary-store";
import { MainPageTranslations } from "@/shared/types/dectionary";
import { Carousel, CarouselContent, CarouselItem } from "@/shared/ui/carousel";

import { Skeleton } from "@/shared/ui/skeleton";
import cn from "classnames";
import AutoScroll from "embla-carousel-auto-scroll";
import { useState } from "react";

type GeneralPreviewProps = {
  className?: string;
};

export function GeneralPreview({ className }: GeneralPreviewProps) {
  const [previewProfession, setPreviewProfession] =
    useState<string>("Pattern Landee");

  const { dictionary, language } = useDictionaryStore();

  const { main_page } = dictionary as unknown as MainPageTranslations;

  return (
    <div className={`${className}`}>
      <div className="col-span-10 col-start-1 flex h-full min-h-[445px] flex-col justify-start overflow-hidden md:col-span-8 md:col-start-2 md:justify-center">
        <div className="vertical-mask h-[415px] w-full md:h-[545px]">
          <Skeleton
            className={cn(
              "flex h-full w-full items-center justify-center rounded-xl dark:bcd2 bcw2 shadow-xl transition-all sm:text-[35px] md:text-[15px] lg:text-[20px] xl:text-[35px] 2xl:text-[40px]",
            )}
          >
            {previewProfession}
          </Skeleton>
        </div>

        <div className="mt-[10px] space-y-1">
          {main_page?.professions_list.map((professions, index) => {
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
                className="slider-mask cursor-grab"
              >
                <CarouselContent className="flex">
                  {professions.map((profession) => (
                    <CarouselItem
                      key={profession}
                      className={cn(
                        "tcw2 dark:tcd2 flex-shrink flex-grow basis-auto cursor-pointer text-center",
                        {
                          ["text-slate-500"]: profession === previewProfession,
                        },
                      )}
                      onClick={() => setPreviewProfession(profession)}
                    >
                      {profession}
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            );
          })}
        </div>
      </div>
    </div>
  );
}
