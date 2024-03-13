"use client";

import { Button } from "@/shared/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/shared/ui/carousel";

import { useState } from "react";

import { type CarouselApi } from "@/shared/ui/carousel";
import Link from "next/link";

import {
  Dictionary,
  useDictionaryStore,
} from "@/shared/dictionary/store/dictionary-store";
import { useWindowSize } from "@/shared/hooks/use-window-size";
import { useCurrentProfessionStore } from "@/shared/store/current-profession";
import { ProfessionObject } from "@/shared/types/dectionary";
import { isProfessionObjectArray } from "@/shared/utils/is-profession-object-array";
import Image from "next/image";
import { z } from "zod";
import { FirstSchema } from "../model/schema";
import { First } from "./first";
import { Second } from "./second";

type SlideFormProps = {
  professionsList: ProfessionObject[];
};

export function SlideForm({ professionsList }: SlideFormProps) {
  const [embla, setEmbla] = useState<CarouselApi>();
  const [firstValues, setFirstValues] = useState<z.infer<
    typeof FirstSchema
  > | null>(null);

  const { width } = useWindowSize();

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

  return (
    <Carousel
      setApi={setEmbla}
      opts={{
        watchDrag: false,
      }}
      className="bcw2 dark:bcd2 overflow-hidden rounded-2xl shadow-xl"
    >
      <CarouselContent className="!ml-0 max-w-[450px] space-x-0">
        <CarouselItem className="flex flex-col items-center justify-center space-y-5 p-0">
          <h2 className="text-neutral-500">Створення нового сайту</h2>

          <First embla={embla} setFirstValues={setFirstValues} />

          <Button variant="link" className="!mt-2 p-0">
            <Link href="/app/list-sites" className="text-neutral-500">
              Відміна
            </Link>
          </Button>
        </CarouselItem>

        <CarouselItem className="flex flex-col items-center justify-center space-y-2 p-0 ">
          <Carousel className="!overflow-hidden">
            <CarouselContent className="!ml-0 max-h-[650px] max-w-[450px]">
              <CarouselItem className="relative flex w-[400px] flex-col items-center justify-center space-y-2 p-0 md:p-4">
                <h2 className="text-neutral-500">Оберіть шаблон для сайту</h2>
                <Second
                  embla={embla}
                  setEmbla={setEmbla}
                  firstValues={firstValues}
                />
                <div className="absolute right-0 top-[-8px] block h-full w-[15px] cursor-grab rounded-bl-xl rounded-tl-xl bg-neutral-700/20 shadow-2xl md:hidden">
                  <span className="absolute left-1/2 top-1/2 h-[70%] w-[0.5px] -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-black/20"></span>
                  <span className="absolute right-1/4 top-1/2 h-[70%] w-[0.5px] -translate-x-1/3 -translate-y-1/2 transform rounded-full bg-black/20"></span>
                  <span className="absolute left-1/4 top-1/2 h-[70%] w-[0.5px] -translate-x-1/4 -translate-y-1/2 transform rounded-full bg-black/20"></span>
                </div>
              </CarouselItem>
              {currentProfessionsList.map((profession, index) => (
                <CarouselItem
                  key={index}
                  className="flex items-center justify-center p-0 md:hidden"
                >
                  <div
                    onClick={() => {
                      setCurrentProfession(profession.profession);
                    }}
                    className="w-full"
                  >
                    <Image
                      src={profession.imagePreview}
                      alt={profession.profession}
                      objectFit="cover"
                      objectPosition="center"
                      fill={true}
                      className="!relative"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}
