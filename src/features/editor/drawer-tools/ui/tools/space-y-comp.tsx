import MarginIcon from "@/features/editor/drawer-tools/svg/margin-icon.svg";
import { updateInlineStyles } from "@/shared/helpers/update-inline-styles";
import { LocationStyles } from "@/shared/types/types";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Slider } from "@/shared/ui/slider";
import { Arrow } from "@radix-ui/react-popover";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type SpaceYCompProps = {
  editableElement: HTMLElement | Element | undefined | null;
  locationStyles: LocationStyles;
};

export function SpaceYComp({
  editableElement,
  locationStyles,
}: SpaceYCompProps) {
  const outerElement = editableElement?.closest("[data-outer]");
  const isLastElement = !!outerElement?.nextElementSibling;
  const pathName = usePathname();

  const getCurrentMarginY = (): number[] | undefined => {
    if (outerElement) {
      const style = window.getComputedStyle(outerElement as HTMLElement);
      const marginTop = parseFloat(style.marginTop);
      const marginBottom = parseFloat(style.marginBottom);

      // Возвращаем массив значений margin
      return [marginTop, marginBottom];
    }
    return undefined;
  };

  const [marginY, setMarginY] = useState<number[]>(() => {
    const initialMargin = getCurrentMarginY();
    return initialMargin || [0, 0];
  });

  useEffect(() => {
    setMarginY(() => {
      const initialMargin = getCurrentMarginY();
      return initialMargin || [0, 0];
    });
  }, [outerElement]);

  const onSetMarginY = (v: number[], index: number) => {
    const value = v[0];

    // Обновляем состояние с новыми значениями margin
    setMarginY((prev) => {
      const updatedValues = [...prev];
      updatedValues[index] = value;
      return updatedValues;
    });

    // Применяем значения margin к текущему элементу
    if (outerElement) {
      const marginStyles: (keyof CSSStyleDeclaration)[] = [
        "marginTop",
        "marginBottom",
      ];
      (outerElement as HTMLElement).style[marginStyles[index] as any] =
        `${value}px`;
    }
  };

  const getDefaultValue = (n: number) => {
    const a = getCurrentMarginY();
    if (!a) return [0];

    return [a[n]];
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
        <button className="toggle-popover" aria-label="Margin">
          <MarginIcon className="svg-icon-fill" />
        </button>
      </PopoverTrigger>

      <PopoverContent className="bg-glass text-primary flex flex-col items-center justify-around border-none">
        <Arrow
          width={100}
          height={5}
          className="fill-neutral-200/50 dark:fill-neutral-800/50"
        />

        <span>Margin Y</span>

        <div className="mt-[10px] flex w-[100%] items-center justify-around">
          <div className="flex h-[200px] w-[50px] flex-col items-center justify-center">
            <span>T</span>
            <Slider
              max={120}
              step={1}
              onValueChange={(n) => onSetMarginY(n, 0)}
              defaultValue={getDefaultValue(0)}
              className="input-slider h-[200px] w-[5px] [&>span:first-child]:h-[100%] [&>span:first-child]:w-[5px] [&>span:nth-child(2)]:left-[-7.5px]"
              orientation="vertical"
            />
            <span>{marginY[0]}px</span>
          </div>
          {!isLastElement && (
            <div className="flex h-[200px] w-[50px] flex-col items-center justify-center">
              <span>B</span>
              <Slider
                max={120}
                step={1}
                onValueChange={(n) => onSetMarginY(n, 1)}
                defaultValue={getDefaultValue(1)}
                className="input-slider h-[200px] w-[5px] [&>span:first-child]:h-[100%] [&>span:first-child]:w-[5px] [&>span:nth-child(2)]:left-[-7.5px]"
                orientation="vertical"
              />
              <span>{marginY[1]}px</span>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
