"use client";
import { updateInlineStyles } from "@/shared/helpers/update-inline-styles";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Slider } from "@/shared/ui/slider";
import { CornersIcon } from "@radix-ui/react-icons";
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
      const a = borderRadius.match(/\d+(\.\d+)?(?=px)/);
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
        `${value[0].toString()}px`;
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-transparent p-[12px] text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
          aria-label="Font Size"
        >
          <CornersIcon strokeWidth={0.9} />
        </button>
      </PopoverTrigger>

      <PopoverContent
        className="relative h-[50px] w-80 rounded-[25px] border-none p-0"
        onBlur={() =>
          updateInlineStyles(currentElement as HTMLElement, pathName, "rounded")
        }
      >
        <Arrow width={10} height={5} />

        <div className="absolute top-0 z-20 w-[320px]">
          <span className="text-black-stroke-thin pointer-events-none absolute top-1/2 z-30 w-full -translate-y-1/2 transform text-center text-slate-50">
            {" "}
            Text Border Radius - <span>{text}px</span>
          </span>
          <Slider
            onValueChange={(n) => onSetBorderRadius(n)}
            defaultValue={getCurrentNumberFromBorderRadius()}
            min={0}
            max={30}
            step={1}
            className="[&>span:first-child]:h-[50px] [&>span:nth-child(2)>span]:h-[50px] [&>span:nth-child(2)>span]:h-[50px] [&>span:nth-child(2)>span]:w-[50px]"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
