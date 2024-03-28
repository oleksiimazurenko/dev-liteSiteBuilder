"use client";

import RowSpacing from "@/features/editor/drawer-tools/svg/height-icon.svg";
import { identifyEditableStructure } from "@/shared/helpers/identify-editable-structure";
import { updateInlineStyles } from "@/shared/helpers/update-inline-styles";
import { useRefreshGsapToken } from "@/shared/store/refresh-gsap-status";
import { LocationStyles } from "@/shared/types/types";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Slider } from "@/shared/ui/slider";
import { Arrow } from "@radix-ui/react-popover";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type HeightToolProps = {
  editableElement: HTMLElement | null;
  locationStyles: LocationStyles;
};

export function HeightTool({
  editableElement,
  locationStyles,
}: HeightToolProps) {
  const { setRefreshGsapToken } = useRefreshGsapToken();
  const { type, outerElement, middleElement, innerElement } =
    identifyEditableStructure(editableElement);
  const pathName = usePathname();
  const minHeightSection = 230; // Определите константу для минимальной высоты

  // Вычисление минимального значения для слайдера
  const calculateMinHeight = () => {
    const heights = [innerElement, middleElement].map((el) =>
      el ? (el as HTMLDivElement).offsetHeight : 0,
    );
    const totalHeight = heights.reduce((a, b) => a + b, 0);
    return type === "section"
      ? Math.max(minHeightSection, totalHeight)
      : totalHeight;
  };

  const minPropertySlider = calculateMinHeight();

  // Получение текущей высоты
  const getCurrentHeight = (): number => {
    const heightStyle = outerElement
      ? window.getComputedStyle(outerElement).height
      : "0";
    return Number(heightStyle.replace("px", "")) || 0;
  };

  const [heightValue, setHeightValue] = useState<number>(getCurrentHeight);

  useEffect(() => {
    setHeightValue(getCurrentHeight);
  }, [outerElement]);

  const onSetHeight = (value: number[]) => {
    setHeightValue(value[0]);
    if (outerElement) {
      outerElement.style.height = `${value[0]}px`;
    }
  };

  return (
    <Popover
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          updateInlineStyles(
            editableElement as HTMLDivElement,
            pathName,
            locationStyles,
          );
        }
      }}
    >
      <PopoverTrigger asChild>
        <button className="toggle-popover" aria-label="Height Tool">
          <RowSpacing className="svg-icon-fill" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="relative h-[50px] rounded-[25px] border-none p-0">
        <Arrow
          width={100}
          height={5}
          className="fill-neutral-200/50 dark:fill-neutral-800/50"
        />
        <div className="bg-glass absolute top-0 z-20 w-[300px] rounded-full">
          <span className="text-black-stroke-thin pointer-events-none absolute top-1/2 z-30 w-full -translate-y-1/2 transform text-center text-slate-50">
            Height - <span>{heightValue}px</span>
          </span>
          <Slider
            onValueChange={onSetHeight}
            defaultValue={[heightValue]}
            min={minPropertySlider}
            max={2000}
            step={1}
            className="[&>span:first-child]:h-[50px] [&>span:nth-child(2)>span]:h-[50px] [&>span:nth-child(2)>span]:w-[50px]"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
