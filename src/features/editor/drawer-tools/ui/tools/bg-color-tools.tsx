"use client";

import { getGradientColor } from "@/shared/helpers/color/get-gradient-color";
import { rgbToHex } from "@/shared/helpers/color/rgb-to-hex";
import { updateInlineStyles } from "@/shared/helpers/update-inline-styles";
import { LocationStyles } from "@/shared/types/types";
import { Carousel, CarouselContent, CarouselItem } from "@/shared/ui/carousel";
import { Input } from "@/shared/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Arrow } from "@radix-ui/react-popover";
import { PaintBucket, RotateCcw } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";

type BGColorToolsProps = {
  currentElement: HTMLElement | Element | undefined | null;
  locationStyles: LocationStyles;
};

export function BGColorTools({
  currentElement,
  locationStyles,
}: BGColorToolsProps) {
  const inputSingleColorRef = useRef<HTMLInputElement>(null);
  const inputFirstColorRef = useRef<HTMLInputElement>(null);
  const inputSecondColorRef = useRef<HTMLInputElement>(null);

  const [backgroundColor, setBackgroundColor] = useState<string>(
    currentElement
      ? rgbToHex(window.getComputedStyle(currentElement).background)
      : "#ffffff",
  );

  const [backgroundGradient, setBackgroundGradient] = useState<string[]>(
    getGradientColor(currentElement),
  );

  const pathName = usePathname();

  // Функция для сброса цвета
  const onResetBackgroundColor = () => {
    setBackgroundColor("#ffffff");

    if (currentElement) {
      (currentElement as HTMLElement).style.setProperty("background", "none");
    }
  };

  // Функция для изменения цвета
  const onChangeColor = (color: string) => {
    if (currentElement) {
      setBackgroundColor(color);
      (currentElement as HTMLElement).style.setProperty("background", color);
    }
  };

  // Функция для изменения цвета background gradient
  const onChangeBackgroundColor = (color: string, type: "first" | "second") => {
    setBackgroundGradient((colors) => {
      const newColors = [...colors];
      newColors[type === "first" ? 0 : 1] = color;
      return newColors;
    });
    if (currentElement) {
      (currentElement as HTMLElement).style.setProperty(
        "background",
        `linear-gradient(to right, ${
          type === "first" ? color : backgroundGradient[0]
        }, ${type === "second" ? color : backgroundGradient[1]})`,
      );
    }
  };

  return (
    <Popover
      onOpenChange={(isOpen) =>
        !isOpen &&
        updateInlineStyles(
          currentElement as HTMLElement,
          pathName,
          locationStyles,
        )
      }
    >
      <PopoverTrigger asChild>
        <button className="toggle-popover" aria-label="Background color">
          <PaintBucket
            size={28}
            strokeWidth={0.9}
            className="svg-icon-stroke"
          />
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-80 overflow-hidden rounded-md p-0">
        <Arrow width={100} height={5} className="fill-slate-200 " />
        <Carousel className="w-full max-w-xs">
          <CarouselContent>
            <CarouselItem>
              <div className="relative h-[200px] w-full overflow-hidden">
                <button
                  className="toggle-popover"
                  aria-label="Change text"
                  onClick={onResetBackgroundColor}
                >
                  <RotateCcw size={15} strokeWidth={0.5} />
                </button>
                <span className="text-black-stroke-thin pointer-events-none absolute left-1/2 top-1/2 z-30 w-full -translate-x-1/2 -translate-y-1/2 transform text-center text-[25px] text-slate-50">
                  BACKGROUND MONOTONE
                </span>
                <div
                  className="absolute left-1/2 top-1/2 h-[230px] w-[340px] -translate-x-1/2 -translate-y-1/2 transform overflow-hidden rounded-md"
                  onClick={(e) => {
                    inputSingleColorRef.current?.click();
                  }}
                >
                  <Input
                    onChange={(e) => {
                      onChangeColor(e.target.value);
                    }}
                    value={backgroundColor}
                    type="color"
                    className="pointer-events-none h-[230px] w-[340px] cursor-pointer rounded-none border-none p-0"
                    data-special
                    ref={inputSingleColorRef}
                  />
                </div>
              </div>
            </CarouselItem>

            <CarouselItem>
              <div className="relative h-[200px] w-full overflow-hidden">
                <button
                  className="ring-offset-background hover:bg-muted hover:text-muted-foreground focus-visible:ring-ring data-[state=on]:bg-accent data-[state=on]:text-accent-foreground absolute right-0 top-0 z-30 inline-flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-bl-md bg-slate-100 p-[12px] text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  aria-label="Change text"
                  onClick={onResetBackgroundColor}
                  tabIndex={1}
                >
                  <RotateCcw size={15} strokeWidth={0.5} />
                </button>

                <span className="text-black-stroke-thin pointer-events-none absolute left-1/2 top-1/2 z-30 w-full -translate-x-1/2 -translate-y-1/2 transform text-center text-[25px] text-slate-50">
                  BACKGROUND GRADIENT
                </span>

                <div
                  className="absolute left-[-5px] top-1/2 h-[230px] w-[162px] -translate-y-1/2 transform overflow-hidden rounded-md"
                  onClick={(e) => {
                    inputFirstColorRef.current?.click();
                  }}
                >
                  <Input
                    onChange={(e) =>
                      onChangeBackgroundColor(e.target.value, "first")
                    }
                    type="color"
                    value={backgroundGradient[0]}
                    className="pointer-events-none h-[250px] w-[180px] cursor-pointer rounded-none border-none p-0"
                    tabIndex={-1}
                    ref={inputFirstColorRef}
                  />
                </div>

                <div
                  className="absolute right-0 top-1/2 h-[230px] w-[162px] -translate-y-1/2 transform overflow-hidden rounded-md"
                  onClick={(e) => {
                    inputSecondColorRef.current?.click();
                  }}
                >
                  <Input
                    onChange={(e) =>
                      onChangeBackgroundColor(e.target.value, "second")
                    }
                    type="color"
                    value={
                      backgroundGradient.length === 1
                        ? "#000000"
                        : backgroundGradient[1]
                    }
                    className="pointer-events-none h-[250px] w-[180px] cursor-pointer rounded-none border-none p-0"
                    tabIndex={-1}
                    ref={inputSecondColorRef}
                  />
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </PopoverContent>
    </Popover>
  );
}
