import Dimensions from "@/features/editor/drawer-tools/svg/dimensions-icon.svg";
import { updateInlineStyles } from "@/shared/helpers/update-inline-styles";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Slider } from "@/shared/ui/slider";
import { Arrow } from "@radix-ui/react-popover";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type ImageSizeToolProps = {
  currentElement: HTMLElement | Element | undefined | null;
};

export function ImageSizeTool({ currentElement }: ImageSizeToolProps) {
  const parentElement = currentElement?.parentElement;
  const pathName = usePathname();
  const parentHeight = currentElement
    ? (parentElement as HTMLDivElement).offsetHeight
    : 0;

  const getCurrentParentHeight = (): number[] | undefined => {
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

  const getCurrentHeight = (): number[] | undefined => {
    if (parentElement) {
      const styles = window.getComputedStyle(currentElement as HTMLElement);
      const height = styles.getPropertyValue("height");
      const matchResult = height.match(/\d+\.?\d*?(?=px)/);
      if (matchResult) {
        return [Number(matchResult[0])];
      }
    }
    return undefined;
  };

  const getCurrentWidth = (): number[] | undefined => {
    if (parentElement) {
      const styles = window.getComputedStyle(currentElement as HTMLElement);
      const height = styles.getPropertyValue("width");
      const matchResult = height.match(/\d+\.?\d*?(?=px)/);
      if (matchResult) {
        return [Number(matchResult[0])];
      }
    }
    return undefined;
  };

  const [sizeValue, setSizeValue] = useState<number>(
    getCurrentHeight()?.[0] || 0,
  );

  useEffect(() => {
    setSizeValue(getCurrentHeight()?.[0] || 0);
  }, [parentElement]);

  const onSetSize = (value: number[]) => {
    // Обновляем состояние с новыми значениями
    setSizeValue(value[0]);

    if (
      parentHeight === value[0] ||
      (value[0] < parentHeight && parentElement)
    ) {
      (parentElement as HTMLDivElement).style.height = "auto";
    }

    // Применяем значения к текущему элементу
    if (currentElement) {
      (currentElement as HTMLElement).style.height = `${value}px`;
      (currentElement as HTMLElement).style.width = `${value}px`;
    }
  };

  return (
    <Popover
      onOpenChange={(isOpen) => {
        !isOpen &&
          updateInlineStyles(
            currentElement as HTMLElement,
            pathName,
            "imageSize",
          );
        !isOpen &&
          updateInlineStyles(currentElement as HTMLElement, pathName, "height");
      }}
    >
      <PopoverTrigger asChild>
        <button className="toggle-popover" aria-label="Height Tool">
          <Dimensions className="svg-icon-fill" />
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
            Size - <span>{sizeValue}px</span>
          </span>
          <Slider
            onValueChange={(n) => onSetSize(n)}
            defaultValue={getCurrentHeight()}
            min={50}
            max={1000}
            step={1}
            className="[&>span:first-child]:h-[50px] [&>span:nth-child(2)>span]:h-[50px] [&>span:nth-child(2)>span]:w-[50px]"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
