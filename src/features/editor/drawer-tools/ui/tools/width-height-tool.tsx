import DimensionsIcon from "@/features/editor/drawer-tools/svg/dimensions-icon.svg";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Slider } from "@/shared/ui/slider";
import { Arrow } from "@radix-ui/react-popover";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { updateInlineStyles } from "../../../../../shared/helpers/update-inline-styles";

type WidthHeightToolProps = {
  currentElement: HTMLElement | Element | undefined | null;
};

export function WidthHeightTool({ currentElement }: WidthHeightToolProps) {
  const parentElement = currentElement?.parentElement;
  const pathName = usePathname();

  const getCurrentWHNumbers = (): number[] | undefined => {
    if (parentElement) {
      const style = window.getComputedStyle(parentElement as HTMLElement);
      const width = parseFloat(style.width);
      const height = parseFloat(style.height);

      // Возвращаем массив значений
      return [width, height];
    }
    return undefined;
  };

  const [whValues, setWHValues] = useState<number[]>(() => {
    const initialWH = getCurrentWHNumbers();
    return initialWH || [0, 0];
  });

  useEffect(() => {
    setWHValues(() => {
      const initialPadding = getCurrentWHNumbers();
      return initialPadding || [0, 0];
    });
  }, [parentElement]);

  const onSetWH = (v: number[], index: number) => {
    const value = v[0];

    // Обновляем состояние с новыми значениями
    setWHValues((prev) => {
      const updatedValues = [...prev];
      updatedValues[index] = value;
      return updatedValues;
    });

    // Применяем значения к текущему элементу
    if (parentElement) {
      const paddingStyles: (keyof CSSStyleDeclaration)[] = ["width", "height"];
      (parentElement as HTMLElement).style[paddingStyles[index] as any] =
        `${value}px`;
    }
  };

  const getDefaultValue = (n: number) => {
    const a = getCurrentWHNumbers();
    if (!a) return [0];

    return [a[n]];
  };

  return (
    <Popover
      onOpenChange={(isOpen) =>
        !isOpen &&
        updateInlineStyles(
          currentElement as HTMLElement,
          pathName,
          "widthAndHeight",
        )
      }
    >
      <PopoverTrigger asChild>
        <button className="toggle-popover" aria-label="Width">
          <DimensionsIcon className="svg-icon-fill" />
        </button>
      </PopoverTrigger>

      <PopoverContent className="text-primary bg-glass flex flex-col items-center justify-around border-none">
        <Arrow
          width={100}
          height={5}
          className="fill-neutral-200/50 dark:fill-neutral-800/50"
        />
        WIDTH & HEIGHT
        <div className="mt-[10px] flex w-[100%] items-center justify-around">
          <div className="flex h-[200px] w-[50px] flex-col items-center justify-center">
            <span>W</span>
            <Slider
              max={2500}
              min={50}
              step={1}
              onValueChange={(n) => onSetWH(n, 0)}
              defaultValue={getDefaultValue(0)}
              className="input-slider h-[200px] w-[5px] [&>span:first-child]:h-[100%] [&>span:first-child]:w-[5px] [&>span:nth-child(2)]:left-[-7.5px]"
              orientation="vertical"
            />
            <span>{whValues[0]}px</span>
          </div>
          <div className="flex h-[200px] w-[50px] flex-col items-center justify-center">
            <span>H</span>
            <Slider
              max={2500}
              min={20}
              step={1}
              onValueChange={(n) => onSetWH(n, 1)}
              defaultValue={getDefaultValue(1)}
              className="input-slider h-[200px] w-[5px] [&>span:first-child]:h-[100%] [&>span:first-child]:w-[5px] [&>span:nth-child(2)]:left-[-7.5px]"
              orientation="vertical"
            />
            <span>{whValues[1]}px</span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
