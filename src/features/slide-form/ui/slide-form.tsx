"use client";

import { Button } from "@/shared/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/shared/ui/carousel";

import { useState } from "react";

import { type CarouselApi } from "@/shared/ui/carousel";
import Link from "next/link";

import { AddImage } from "./add-image";
import { First } from './first'
import { Second } from '../model/second'

export function SlideForm() {

  const [embla, setEmbla] = useState<CarouselApi>();


  return (
    <>
      <Carousel
        setApi={setEmbla}
        opts={{
          watchDrag: false,
        }}
      >
        <CarouselContent>
          <CarouselItem>
            <h2>Створення нового сайту</h2>

            <First embla={embla}/>

            <Button variant="link">
              <Link href="/list-sites">Відміна</Link>
            </Button>
          </CarouselItem>

          <CarouselItem>
            <h2>Оберіть шаблон для сайту</h2>

            <Carousel>
              <CarouselContent>

                <CarouselItem>
                  <Second embla={embla} setEmbla={setEmbla}/>
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