"use client";

import PaddingIcon from "@/features/editor/drawer-tools/svg/padding-icon.svg"
import { updateInlineStyles } from "@/shared/helpers/update-inline-styles"
import { LocationStyles } from '@/shared/types/types'
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover"
import { Slider } from "@/shared/ui/slider"
import { Arrow } from "@radix-ui/react-popover"
import cn from "classnames"
import { Tally4 } from "lucide-react"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

type PaddingToolProps = {
  currentElement: HTMLElement | Element | undefined | null;
  locationStyles: LocationStyles;
};

export function PaddingTool({ currentElement, locationStyles }: PaddingToolProps) {
  const pathName = usePathname();
  
  const outerElement = currentElement?.parentElement?.parentElement;
  const middleElement = currentElement?.parentElement;

  const outerHeight = currentElement
    ? (outerElement as HTMLDivElement).offsetHeight
    : 0;
  const middleHeight = middleElement
    ? (middleElement as HTMLDivElement).offsetHeight
    : 0;

  const getCurrentPaddingNumbers = (): number[] | undefined => {
    if (currentElement) {
      const style = window.getComputedStyle((locationStyles === 'middle' ? middleElement : currentElement) as HTMLElement);
      const paddingTop = parseFloat(style.paddingTop);
      const paddingRight = parseFloat(style.paddingRight);
      const paddingBottom = parseFloat(style.paddingBottom);
      const paddingLeft = parseFloat(style.paddingLeft);

      // Возвращаем массив значений padding
      return [paddingTop, paddingRight, paddingBottom, paddingLeft];
    }
    return undefined;
  };

  const [uniformPadding, setUniformPadding] = useState(0);
  const [paddingValues, setPaddingValues] = useState<number[]>(() => {
    const initialPadding = getCurrentPaddingNumbers();
    return initialPadding || [0, 0, 0, 0];
  });

  const setUniformPaddingAllSides = (value: number) => {
    setUniformPadding(value); // Обновляем состояние равномерного padding
    setPaddingValues([value, value, value, value]); // Обновляем состояние padding (все стороны равны

    // Применяем равномерный padding ко всем сторонам элемента
    if (currentElement) {
      ((locationStyles === 'middle' ? middleElement : currentElement) as HTMLElement).style.padding = `${value}px`;
      if (middleHeight > outerHeight) {
        (outerElement as HTMLDivElement).style.height = middleHeight + "px";
      }
    }
  };

  useEffect(() => {
    setPaddingValues(() => {
      const initialPadding = getCurrentPaddingNumbers();
      return initialPadding || [0, 0, 0, 0];
    });
  }, [currentElement]);

  const onSetPadding = (v: number[], index: number) => {
    const value = v[0];

    // Обновляем состояние с новыми значениями padding
    setPaddingValues((prev) => {
      const updatedValues = [...prev];
      updatedValues[index] = value;
      return updatedValues;
    });

    // Применяем значения padding к текущему элементу
    if (currentElement) {
      const paddingStyles: (keyof CSSStyleDeclaration)[] = [
        "paddingTop",
        "paddingRight",
        "paddingBottom",
        "paddingLeft",
      ];
      (middleElement as HTMLElement).style[paddingStyles[index] as any] =
        `${value}px`;

      if (middleHeight > outerHeight) {
        
        (outerElement as HTMLDivElement).style.height = middleHeight + "px";
      }
    }
  };

  const isUniformPadding = () => {
    return (
      paddingValues[0] === paddingValues[1] &&
      paddingValues[0] === paddingValues[2] &&
      paddingValues[0] === paddingValues[3]
    );
  };

  const getDefaultValue = (n: number) => {
    const a = getCurrentPaddingNumbers();
    if (!a) return [0];

    return [a[n]];
  };

  return (
    <Popover
      onOpenChange={(isOpen) => {
        !isOpen &&
          updateInlineStyles(
            currentElement as HTMLElement,
            pathName,
            locationStyles
          );
        !isOpen &&
          updateInlineStyles(currentElement as HTMLElement, pathName, "height");
      }}
    >
      <PopoverTrigger asChild>
        <button className="toggle-popover" aria-label="Padding">
          <PaddingIcon className="svg-icon-fill" />
        </button>
      </PopoverTrigger>

      <PopoverContent className="text-primary bg-glass flex flex-col items-center justify-around border-none">
        <Arrow
          width={100}
          height={5}
          className="fill-neutral-200/50 dark:fill-neutral-800/50"
        />

        <span>PADDING</span>

        <div className="mt-[10px] flex w-[100%] items-center justify-around">
          <div
            className={cn(
              "flex h-[200px] w-[50px] flex-col items-center justify-center",
            )}
          >
            <span>T</span>
            <Slider
              max={120}
              step={1}
              onValueChange={(n) => onSetPadding(n, 0)}
              defaultValue={getDefaultValue(0)}
              value={isUniformPadding() ? [uniformPadding] : [paddingValues[0]]}
              className="input-slider h-[200px] w-[5px] rounded-md [&>span:first-child]:h-[100%] [&>span:first-child]:w-[5px] [&>span:nth-child(2)]:left-[-7.5px]"
              orientation="vertical"
            />
            <span>{paddingValues[0]}px</span>
          </div>
          <div className="flex h-[200px] w-[50px] flex-col items-center justify-center">
            <span>R</span>
            <Slider
              max={120}
              step={1}
              onValueChange={(n) => onSetPadding(n, 1)}
              defaultValue={getDefaultValue(1)}
              value={isUniformPadding() ? [uniformPadding] : [paddingValues[1]]}
              className="input-slider h-[200px] w-[5px] rounded-md [&>span:first-child]:h-[100%] [&>span:first-child]:w-[5px] [&>span:nth-child(2)]:left-[-7.5px]"
              orientation="vertical"
            />
            <span>{paddingValues[1]}px</span>
          </div>
          <div className="flex h-[200px] w-[50px] flex-col items-center justify-center">
            <span>B</span>
            <Slider
              max={120}
              step={1}
              onValueChange={(n) => onSetPadding(n, 2)}
              defaultValue={getDefaultValue(2)}
              value={isUniformPadding() ? [uniformPadding] : [paddingValues[2]]}
              className="input-slider h-[200px] w-[5px] rounded-md [&>span:first-child]:h-[100%] [&>span:first-child]:w-[5px] [&>span:nth-child(2)]:left-[-7.5px]"
              orientation="vertical"
            />
            <span>{paddingValues[2]}px</span>
          </div>

          <div className="flex h-[200px] w-[50px] flex-col items-center justify-center">
            <span>L</span>
            <Slider
              max={120}
              step={1}
              onValueChange={(n) => onSetPadding(n, 3)}
              defaultValue={getDefaultValue(3)}
              value={isUniformPadding() ? [uniformPadding] : [paddingValues[3]]}
              className="input-slider h-[200px] w-[5px] rounded-md [&>span:first-child]:h-[100%] [&>span:first-child]:w-[5px] [&>span:nth-child(2)]:left-[-7.5px]"
              orientation="vertical"
            />
            <span>{paddingValues[3]}px</span>
          </div>

          <div className="flex flex-col items-center justify-center">
            <Tally4 strokeWidth={0.75} />
            <Slider
              max={120}
              step={1}
              onValueChange={(n) => setUniformPaddingAllSides(n[0])}
              defaultValue={[uniformPadding]}
              className="input-slider h-[200px] w-[5px] rounded-md [&>span:first-child]:h-[100%] [&>span:first-child]:w-[5px] [&>span:nth-child(2)]:left-[-7.5px]"
              orientation="vertical"
            />
            <span>{isUniformPadding() ? `${uniformPadding}px` : "mix"}</span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
