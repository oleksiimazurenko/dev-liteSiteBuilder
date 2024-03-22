"use client";

import PaddingIcon from "@/features/main/drawer-tools/svg/padding-icon.svg";
import { getIdFirstSection } from "@/shared/actions/section/get/get-id-first-section";
import { updateInlineStyles } from "@/shared/helpers/update-inline-styles";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Slider } from "@/shared/ui/slider";
import { Arrow } from "@radix-ui/react-popover";
import cn from "classnames";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type PaddingToolProps = {
  currentElement: HTMLElement | Element | undefined | null;
};

export function PaddingTool({ currentElement }: PaddingToolProps) {
  const pathName = usePathname();
  const [isDisabled, setIsDisabled] = useState(false);

  // Блокируем кнопку, если текущий элемент является первым элементом в секции
  useEffect(() => {
    (async () => {
      const { data: idFirstSection } = await getIdFirstSection(pathName);
      if (!idFirstSection) return;

      if (currentElement?.getAttribute("data-id") === idFirstSection) {
        setIsDisabled(true);
      }
    })();
  }, []);

  const getCurrentPaddingNumbers = (): number[] | undefined => {
    if (currentElement) {
      const style = window.getComputedStyle(currentElement as HTMLElement);
      const paddingTop = parseFloat(style.paddingTop);
      const paddingRight = parseFloat(style.paddingRight);
      const paddingBottom = parseFloat(style.paddingBottom);
      const paddingLeft = parseFloat(style.paddingLeft);

      // Возвращаем массив значений padding
      return [paddingTop, paddingRight, paddingBottom, paddingLeft];
    }
    return undefined;
  };

  const [paddingValues, setPaddingValues] = useState<number[]>(() => {
    const initialPadding = getCurrentPaddingNumbers();
    return initialPadding || [0, 0, 0, 0];
  });

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
      (currentElement as HTMLElement).style[paddingStyles[index] as any] =
        `${value}px`;
    }
  };

  const getDefaultValue = (n: number) => {
    const a = getCurrentPaddingNumbers();
    if (!a) return [0];

    return [a[n]];
  };

  return (
    <Popover
      onOpenChange={(isOpen) =>
        !isOpen &&
        updateInlineStyles(currentElement as HTMLElement, pathName, "padding")
      }
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
              {
                ["opacity-[0.4]"]: isDisabled,
              },
            )}
          >
            <span>T</span>
            <Slider
              max={120}
              step={1}
              disabled={isDisabled}
              onValueChange={(n) => onSetPadding(n, 0)}
              defaultValue={getDefaultValue(0)}
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
              className="input-slider h-[200px] w-[5px] rounded-md [&>span:first-child]:h-[100%] [&>span:first-child]:w-[5px] [&>span:nth-child(2)]:left-[-7.5px]"
              orientation="vertical"
            />
            <span>{paddingValues[3]}px</span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
