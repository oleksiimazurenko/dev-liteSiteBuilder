import { updateInlineStyles } from "@/shared/helpers/update-inline-styles";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Slider } from "@/shared/ui/slider";
import { Arrow } from "@radix-ui/react-popover";
import { usePathname } from "next/navigation";
import { useState } from "react";
import FontSizeIcon from "@/features/main/drawer-tools/svg/font-size-icon.svg";

type FontSizeToolProps = {
  currentElement: HTMLElement | Element | undefined | null;
};

export function FontSizeTool({ currentElement }: FontSizeToolProps) {
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
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="button-popover-trigger-in-drawer"
          aria-label="Font Size"
        >
          <FontSizeIcon className="svg-icon-fill" />
        </button>
      </PopoverTrigger>

      <PopoverContent
        className="relative h-[50px] w-80 rounded-[25px] border-none p-0"
        onBlur={() =>
          updateInlineStyles(
            currentElement as HTMLElement,
            pathName,
            "fontSize",
          )
        }
      >
        <Arrow width={10} height={5} />
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
