import FontSizeIcon from "@/features/editor/drawer-tools/svg/font-size-icon.svg";
import { updateInlineStyles } from "@/shared/helpers/update-inline-styles";
import { LocationStyles } from "@/shared/types/types";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Slider } from "@/shared/ui/slider";
import { Arrow } from "@radix-ui/react-popover";
import { usePathname } from "next/navigation";
import { useState } from "react";

type FontSizeToolProps = {
  currentElement: HTMLElement | Element | undefined | null;
  locationStyles: LocationStyles;
};

export function FontSizeTool({
  currentElement,
  locationStyles,
}: FontSizeToolProps) {
  const pathName = usePathname();

  // Получаем текущее значение font size
  const getCurrentNumberFromFontSize = (): number[] | undefined => {
    if (currentElement) {
      const fontSize = window.getComputedStyle(
        currentElement as HTMLElement,
      ).fontSize;
      const a = fontSize.match(/\d+(?=px)/);
      const b = a ? a[0] : undefined;
      return b ? [+b] : undefined;
    }
    return undefined;
  };

  const [text, setText] = useState<string>(
    getCurrentNumberFromFontSize()?.toString() || "0",
  );

  // Функция для изменения font size
  const onSetFontSize = (value: number[]) => {
    setText(value.toString());
    if (currentElement) {
      (currentElement as HTMLElement).style.fontSize = `${value.toString()}px`;
    }
  };

  return (
    <Popover
      onOpenChange={(isOpen) =>
        !isOpen &&
        updateInlineStyles(
          currentElement as HTMLElement,
          pathName,
          locationStyles,
        )
      }
    >
      <PopoverTrigger asChild>
        <button className="toggle-popover" aria-label="Font Size">
          <FontSizeIcon className="svg-icon-fill" />
        </button>
      </PopoverTrigger>

      <PopoverContent className="bg-glass relative h-[50px] w-80 rounded-[25px] border-none p-0">
        <Arrow
          width={100}
          height={5}
          className="fill-neutral-200/50 dark:fill-neutral-800/50"
        />
        <div className="absolute top-0 z-20 w-[320px]">
          <span className="text-black-stroke-thin pointer-events-none absolute top-1/2 z-30 w-full -translate-y-1/2 transform text-center text-slate-50">
            {" "}
            Text Font Size - <span>{text}px</span>
          </span>
          <Slider
            onValueChange={(n) => onSetFontSize(n)}
            defaultValue={getCurrentNumberFromFontSize()}
            min={5}
            max={120}
            step={1}
            className="[&>span:first-child]:h-[50px] [&>span:nth-child(2)>span]:h-[50px] [&>span:nth-child(2)>span]:h-[50px] [&>span:nth-child(2)>span]:w-[50px]"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
