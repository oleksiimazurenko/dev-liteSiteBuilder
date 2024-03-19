"use client";

import { rgbToHex } from "@/shared/helpers/color/rgb-to-hex";
import { Input } from "@/shared/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Slider } from "@/shared/ui/slider";
import { Arrow } from "@radix-ui/react-popover";
import { PenTool } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { updateInlineStyles } from "../../../../../../shared/helpers/update-inline-styles";

type TextStrokeToolsProps = {
  currentElement: HTMLElement | Element | undefined | null;
};

export function TextStrokeTools({ currentElement }: TextStrokeToolsProps) {
  const inputSingleColorRef = useRef<HTMLInputElement>(null);

  const pathName = usePathname();
  const getCurrentTextStrokeWidth = (): number[] | undefined => {
    if (currentElement) {
      const styles = window.getComputedStyle(currentElement as HTMLElement);
      const strokeWidth = styles.getPropertyValue("-webkit-text-stroke-width");
      const matchResult = strokeWidth.match(/\d+\.?\d*?(?=px)/);
      if (matchResult) {
        return [Number(matchResult[0])];
      }
    }
    return undefined;
  };

  const getCurrentTextStrokeColor = () => {
    if (currentElement) {
      const styles = window.getComputedStyle(currentElement as HTMLElement);
      const strokeColor = styles.getPropertyValue("-webkit-text-stroke-color");

      return rgbToHex(strokeColor);
    }

    return undefined;
  };

  const [text, setText] = useState<string>(
    getCurrentTextStrokeWidth()?.toString() || "0",
  );

  const currentVariableForTextStrokeRef = useRef<string[]>([]);

  if (currentElement) {
    currentVariableForTextStrokeRef.current[0] =
      getCurrentTextStrokeWidth()?.toString() || "0px";
    currentVariableForTextStrokeRef.current[1] =
      getCurrentTextStrokeColor()?.toString() || "black";
  } else {
    currentVariableForTextStrokeRef.current[0] = "0px";
    currentVariableForTextStrokeRef.current[1] = "black";
  }

  const [textStrokeColor, setTextStrokeColor] = useState<string>(
    currentVariableForTextStrokeRef.current[1],
  );

  const onSetTextStroke = (value: number[]) => {
    setText(value.toString());

    currentVariableForTextStrokeRef.current[0] = value[0].toString() + "px";

    if (currentElement) {
      (currentElement as HTMLElement).style.setProperty(
        "-webkit-text-stroke",
        `${currentVariableForTextStrokeRef.current[0]} ${currentVariableForTextStrokeRef.current[1]}`,
      );
    }
  };

  const onChangeTextStrokeColor = (color: string) => {
    if (currentElement) {
      setTextStrokeColor(color);

      currentVariableForTextStrokeRef.current[1] = color;
      (currentElement as HTMLElement).style.setProperty(
        "-webkit-text-stroke-color",
        color,
      );
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="button-popover-trigger-in-drawer"
          aria-label="Text Stroke"
        >
          <PenTool strokeWidth={1} className="svg-icon-stroke" />
        </button>
      </PopoverTrigger>

      <PopoverContent
        className="relative h-[50px] w-80 rounded-[25px] border-none p-0"
        onBlur={() =>
          updateInlineStyles(
            currentElement as HTMLElement,
            pathName,
            "textStroke",
          )
        }
      >
        <Arrow width={10} height={5} />

        <div className="absolute top-0 z-20 w-[300px]">
          <span className="text-black-stroke-thin pointer-events-none absolute top-1/2 z-30 w-full -translate-y-1/2 transform text-center text-slate-50">
            {" "}
            Text Stroke - <span>{text}px</span>
          </span>
          <Slider
            onValueChange={(n) => onSetTextStroke(n)}
            defaultValue={getCurrentTextStrokeWidth()}
            min={0}
            max={10}
            step={0.5}
            className="[&>span:first-child]:h-[50px] [&>span:nth-child(2)>span]:h-[50px] [&>span:nth-child(2)>span]:h-[50px] [&>span:nth-child(2)>span]:w-[50px]"
          />
        </div>

        <div className="absolute right-[-1px] top-0 z-10 h-[50px] w-[50px] cursor-pointer overflow-hidden rounded-br-[25px] rounded-tr-[25px] transition hover:scale-105">
          <div
            className="relative left-1/2 top-1/2 h-[50px] w-[50px] -translate-x-1/2 -translate-y-1/2 transform overflow-hidden rounded-md"
            onClick={() => inputSingleColorRef.current?.click()}
          >
            <Input
              onChange={(e) => onChangeTextStrokeColor(e.target.value)}
              value={textStrokeColor}
              type="color"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[70px] w-[70px] -translate-x-1/2 -translate-y-1/2 transform cursor-pointer rounded-none border-none p-0"
              tabIndex={-1}
              ref={inputSingleColorRef}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
