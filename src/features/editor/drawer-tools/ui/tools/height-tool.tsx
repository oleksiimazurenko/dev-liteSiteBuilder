import RowSpacing from "@/features/editor/drawer-tools/svg/height-icon.svg";
import { updateInlineStyles } from "@/shared/helpers/update-inline-styles";
import { LocationStyles } from '@/shared/types/types'
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Slider } from "@/shared/ui/slider";
import { Arrow } from "@radix-ui/react-popover";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type HeightToolProps = {
  currentElement: HTMLElement | Element | undefined | null;
  locationStyles: LocationStyles;
};

export function HeightTool({ currentElement, locationStyles }: HeightToolProps) {
  const parentElement = currentElement?.parentElement;
  const pathName = usePathname();
  const minSlider = currentElement ? (currentElement as HTMLDivElement).offsetHeight : 0;

  const getCurrentHeight = (): number[] | undefined => {
    if (parentElement) {
      const styles = window.getComputedStyle(parentElement as HTMLElement);
      const height = styles.getPropertyValue("height");
      const matchResult = height.match(/\d+\.?\d*?(?=px)/);
      if (matchResult) {
        return [Number(matchResult[0])];
      }
    }
    return undefined;
  };

  const [heightValue, setHeightValues] = useState<number>(
    getCurrentHeight()?.[0] || 0,
  );

  useEffect(() => {
    setHeightValues(getCurrentHeight()?.[0] || 0);
  }, [parentElement]);

  const onSetHeight = (value: number[]) => {
    // Обновляем состояние с новыми значениями
    setHeightValues(value[0]);

    // Применяем значения к текущему элементу
    if (parentElement) {
      (parentElement as HTMLElement).style.height = `${value}px`;
    }
  };

  return (
    <Popover
      onOpenChange={(isOpen) =>
        !isOpen &&
        updateInlineStyles(currentElement as HTMLElement, pathName, locationStyles)
      }
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
            onValueChange={(n) => onSetHeight(n)}
            defaultValue={getCurrentHeight()}
            min={minSlider}
            max={2000}
            step={1}
            className="[&>span:first-child]:h-[50px] [&>span:nth-child(2)>span]:h-[50px] [&>span:nth-child(2)>span]:w-[50px]"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
