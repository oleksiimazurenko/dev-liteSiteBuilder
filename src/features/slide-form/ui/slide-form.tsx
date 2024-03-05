"use client";

import { Button } from "@/shared/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/shared/ui/carousel";

import { useState } from "react";

import { type CarouselApi } from "@/shared/ui/carousel";
import Link from "next/link";

import { First } from "./first";
import { Second } from "./second";
import { FirstSchema } from '../model/schema'
import { z } from 'zod'

export function SlideForm() {
  const [embla, setEmbla] = useState<CarouselApi>();
  const [firstValues, setFirstValues] = useState<z.infer<
    typeof FirstSchema
  > | null>(null);

  return (
    <>
      <Carousel
        setApi={setEmbla}
        opts={{
          watchDrag: false,
        }}
      >
        <CarouselContent className="!ml-0 max-w-[450px] space-x-3">
          <CarouselItem className="flex flex-col items-center justify-center space-y-2 p-0">
            <h2>Створення нового сайту</h2>

            <First embla={embla} setFirstValues={setFirstValues}/>

            <Button variant="link">
              <Link href="/list-sites">Відміна</Link>
            </Button>
          </CarouselItem>

          <CarouselItem className="flex flex-col items-center justify-center space-y-2 p-0">
            <h2>Оберіть шаблон для сайту</h2>

            <Carousel>
              <CarouselContent className="!ml-0 max-w-[450px] space-x-3">
                <CarouselItem className="flex flex-col items-center justify-center space-y-2 p-0">
                  <Second embla={embla} setEmbla={setEmbla} firstValues={firstValues}/>
                </CarouselItem>

                <CarouselItem>Hi</CarouselItem>
                <CarouselItem>Hi</CarouselItem>
              </CarouselContent>
            </Carousel>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </>
  );
}
