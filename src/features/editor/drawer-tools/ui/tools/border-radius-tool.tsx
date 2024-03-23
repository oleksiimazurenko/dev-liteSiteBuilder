"use client";
import CornersIcon from "@/features/editor/drawer-tools/svg/corners-icon.svg";
import { updateInlineStyles } from "@/shared/helpers/update-inline-styles";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Slider } from "@/shared/ui/slider";
import { Arrow } from "@radix-ui/react-popover";
import { usePathname } from "next/navigation";
import { useState } from "react";

type BorderRadiusToolProps = {
  currentElement: HTMLElement | Element | undefined | null;
};

export function BorderRadiusTool({ currentElement }: BorderRadiusToolProps) {
  // Получаем текущее значение border radius
  const getCurrentNumberFromBorderRadius = (): number[] | undefined => {
    if (currentElement) {
      const borderRadius = window.getComputedStyle(
        currentElement as HTMLElement,
      ).borderRadius;
      const a = borderRadius.match(/\d+(\.\d+)?(?=%)/);
      const b = a ? a[0] : undefined;
      return b ? [+b] : undefined;
    }
    return undefined;
  };

  const pathName = usePathname();

  const [text, setText] = useState<string>(
    getCurrentNumberFromBorderRadius()?.toString() || "0",
  );

  // Функция для изменения border radius
  const onSetBorderRadius = (value: number[]) => {
    setText(value.toString());

    if (currentElement) {
      (currentElement as HTMLElement).style.borderRadius =
        `${value[0].toString()}%`;
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="toggle-popover" aria-label="Border Radius">
          <CornersIcon className="svg-icon-fill" />
        </button>
      </PopoverTrigger>

      <PopoverContent
        className="relative h-[50px] rounded-[25px] border-none p-0"
        onBlur={() =>
          updateInlineStyles(currentElement as HTMLElement, pathName, "rounded")
        }
      >
        <Arrow
          width={100}
          height={5}
          className="fill-neutral-200/50 dark:fill-neutral-800/50"
        />

        <div className="bg-glass absolute top-0 z-20 w-[300px] rounded-full">
          <span className="text-black-stroke-thin pointer-events-none absolute top-1/2 z-30 w-full -translate-y-1/2 transform text-center text-slate-50">
            Text Border Radius - <span>{text}%</span>
          </span>
          <Slider
            onValueChange={(n) => onSetBorderRadius(n)}
            defaultValue={getCurrentNumberFromBorderRadius()}
            min={0}
            max={50}
            step={0.2}
            className="[&>span:first-child]:h-[50px] [&>span:nth-child(2)>span]:h-[50px] [&>span:nth-child(2)>span]:w-[50px]"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
