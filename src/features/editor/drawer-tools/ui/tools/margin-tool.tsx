import MarginIcon from "@/features/editor/drawer-tools/svg/margin-icon.svg";
import { updateInlineStyles } from "@/shared/helpers/update-inline-styles";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Slider } from "@/shared/ui/slider";
import { Arrow } from "@radix-ui/react-popover";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type MarginToolProps = {
  currentElement: HTMLElement | Element | undefined | null;
};

export function MarginTool({ currentElement }: MarginToolProps) {
  const parentElement = currentElement?.parentElement;
  const pathName = usePathname();

  const getCurrentMarginNumbers = (): number[] | undefined => {
    if (parentElement) {
      const style = window.getComputedStyle(parentElement as HTMLElement);
      const marginTop = parseFloat(style.marginTop);
      const marginRight = parseFloat(style.marginRight);
      const marginBottom = parseFloat(style.marginBottom);
      const marginLeft = parseFloat(style.marginLeft);

      // Возвращаем массив значений margin
      return [marginTop, marginRight, marginBottom, marginLeft];
    }
    return undefined;
  };

  const [marginValues, setMarginValues] = useState<number[]>(() => {
    const initialMargin = getCurrentMarginNumbers();

    return initialMargin || [0, 0, 0, 0];
  });

  useEffect(() => {
    setMarginValues(() => {
      const initialMargin = getCurrentMarginNumbers();
      return initialMargin || [0, 0, 0, 0];
    });
  }, [parentElement]);

  const onSetMargin = (v: number[], index: number) => {
    const value = v[0];

    // Обновляем состояние с новыми значениями margin
    setMarginValues((prev) => {
      const updatedValues = [...prev];
      updatedValues[index] = value;
      return updatedValues;
    });

    // Применяем значения margin к текущему элементу
    if (parentElement) {
      const marginStyles: (keyof CSSStyleDeclaration)[] = [
        "marginTop",
        "marginRight",
        "marginBottom",
        "marginLeft",
      ];
      (parentElement as HTMLElement).style[marginStyles[index] as any] =
        `${value}px`;
    }
  };

  const getDefaultValue = (n: number) => {
    const a = getCurrentMarginNumbers();
    if (!a) return [0];

    return [a[n]];
  };

  return (
    <Popover
      onOpenChange={(isOpen) =>
        !isOpen &&
        updateInlineStyles(currentElement as HTMLElement, pathName, "margin")
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

        <span>MARGIN</span>

        <div className="mt-[10px] flex w-[100%] items-center justify-around">
          <div className="flex h-[200px] w-[50px] flex-col items-center justify-center">
            <span>T</span>
            <Slider
              max={120}
              step={1}
              onValueChange={(n) => onSetMargin(n, 0)}
              defaultValue={getDefaultValue(0)}
              className="input-slider h-[200px] w-[5px] [&>span:first-child]:h-[100%] [&>span:first-child]:w-[5px] [&>span:nth-child(2)]:left-[-7.5px]"
              orientation="vertical"
            />
            <span>{marginValues[0]}px</span>
          </div>
          <div className="flex h-[200px] w-[50px] flex-col items-center justify-center">
            <span>R</span>
            <Slider
              max={120}
              step={1}
              onValueChange={(n) => onSetMargin(n, 1)}
              defaultValue={getDefaultValue(1)}
              className="input-slider h-[200px] w-[5px] [&>span:first-child]:h-[100%] [&>span:first-child]:w-[5px] [&>span:nth-child(2)]:left-[-7.5px]"
              orientation="vertical"
            />
            <span>{marginValues[1]}px</span>
          </div>
          <div className="flex h-[200px] w-[50px] flex-col items-center justify-center">
            <span>B</span>
            <Slider
              max={120}
              step={1}
              onValueChange={(n) => onSetMargin(n, 2)}
              defaultValue={getDefaultValue(2)}
              className="input-slider h-[200px] w-[5px] [&>span:first-child]:h-[100%] [&>span:first-child]:w-[5px] [&>span:nth-child(2)]:left-[-7.5px]"
              orientation="vertical"
            />
            <span>{marginValues[2]}px</span>
          </div>
          <div className="flex h-[200px] w-[50px] flex-col items-center justify-center">
            <span>L</span>
            <Slider
              max={120}
              step={1}
              onValueChange={(n) => onSetMargin(n, 3)}
              defaultValue={getDefaultValue(3)}
              className="input-slider h-[200px] w-[5px] [&>span:first-child]:h-[100%] [&>span:first-child]:w-[5px] [&>span:nth-child(2)]:left-[-7.5px]"
              orientation="vertical"
            />
            <span>{marginValues[3]}px</span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
