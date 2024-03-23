import { rgbToHex } from "@/shared/helpers/color/rgb-to-hex";
import { updateInlineStyles } from "@/shared/helpers/update-inline-styles";
import { Input } from "@/shared/ui/input";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";

type ColorToolProps = {
  currentElement: HTMLElement | Element | undefined | null;
};

export function ColorTool({ currentElement }: ColorToolProps) {
  const inputSingleColorRef = useRef<HTMLInputElement>(null);

  const pathName = usePathname();

  const [color, setColor] = useState<string>(
    currentElement
      ? rgbToHex(window.getComputedStyle(currentElement as HTMLElement).color)
      : "#ffffff",
  );

  // Функция для изменения цвета
  const onChangeColor = (color: string) => {
    if (currentElement) {
      setColor(color);
      (currentElement as HTMLElement).style.setProperty("color", color);
    }
  };

  return (
    <button className="toggle-popover !p-0" aria-label="Color">
      <Input
        onChange={(e) => onChangeColor(e.target.value)}
        type="color"
        value={color}
        onBlur={() =>
          updateInlineStyles(currentElement as HTMLElement, pathName, "color")
        }
        className="h-6 w-5 cursor-pointer border-none bg-transparent p-0"
        tabIndex={-1}
        ref={inputSingleColorRef}
      />
    </button>
  );
}
