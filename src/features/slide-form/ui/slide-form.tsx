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
import { useCurrentProfessionStore } from "@/shared/store/current-profession";
import { ProfessionObject } from "@/shared/types/dectionary";
import { isProfessionObjectArray } from "@/shared/utils/is-profession-object-array";
import Image from "next/image";
import { z } from "zod";
import { FirstSchema } from "../model/schema";
import { First } from "./first";
import { Second } from "./second";
import { useWindowSize } from "@/shared/hooks/use-window-size";

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
    <>
      <Carousel
        setApi={setEmbla}
        opts={{
          watchDrag: false,
        }}
        className="bcw2 dark:bcd2 overflow-hidden rounded-2xl shadow-xl"
      >
        <CarouselContent className="!ml-0 max-w-[400px] space-x-3">
          <CarouselItem className="flex flex-col items-center justify-center space-y-2 p-0">
            <h2>Створення нового сайту</h2>

            <First embla={embla} setFirstValues={setFirstValues} />

            <Button variant="link">
              <Link href="/app/list-sites">Відміна</Link>
            </Button>
          </CarouselItem>

          <CarouselItem className="flex flex-col items-center justify-center space-y-2 p-0">
            <Carousel className="!overflow-hidden">
              <CarouselContent className="!ml-0 max-h-[460px] max-w-[450px]">
                <CarouselItem className="flex flex-col items-center justify-center space-y-2 p-0">
                  <h2>Оберіть шаблон для сайту</h2>
                  <Second
                    embla={embla}
                    setEmbla={setEmbla}
                    firstValues={firstValues}
                  />
                </CarouselItem>
                {currentProfessionsList.map((profession, index) => (
                  <CarouselItem
                    key={index}
                    className="flex items-center justify-center p-0"
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
    </>
  );
}
