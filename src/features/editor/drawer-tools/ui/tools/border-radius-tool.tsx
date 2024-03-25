"use client";
import CornersIcon from "@/features/editor/drawer-tools/svg/corners-icon.svg";
import { updateInlineStyles } from "@/shared/helpers/update-inline-styles";
import { LocationStyles } from "@/shared/types/types";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Slider } from "@/shared/ui/slider";
import { Arrow } from "@radix-ui/react-popover";
import { usePathname } from "next/navigation";
import { useState } from "react";

type BorderRadiusToolProps = {
  editableElement: HTMLElement | Element | undefined | null;
  locationStyles: LocationStyles;
  type: "px" | "%";
};

export function BorderRadiusTool({
  editableElement,
  locationStyles,
  type,
}: BorderRadiusToolProps) {
  // Получаем текущее значение border radius
  const getCurrentNumberFromBorderRadius = (): number[] | undefined => {
    if (editableElement) {
      const style = window.getComputedStyle(editableElement as HTMLElement);
      const borderRadius = style.borderRadius;
      const regex = new RegExp(`\\d+(\\.\\d+)?(?=${type})`, "g");

      // Используем метод match и передаем ему регулярное выражение
      const matches = borderRadius.match(regex);
      const numbers = matches ? matches.map(Number) : undefined; // Преобразуем найденные строки в числа
      return numbers;
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

    if (editableElement) {
      (editableElement as HTMLElement).style.borderRadius =
        `${value[0].toString()}${type}`;
    }
  };

  return (
    <Popover
      onOpenChange={(isOpen) =>
        !isOpen &&
        updateInlineStyles(
          editableElement as HTMLElement,
          pathName,
          locationStyles,
        )
      }
    >
      <PopoverTrigger asChild>
        <button className="toggle-popover" aria-label="Border Radius">
          <CornersIcon className="svg-icon-fill" />
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
            Text Border Radius -{" "}
            <span>
              {text}
              {type}
            </span>
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
