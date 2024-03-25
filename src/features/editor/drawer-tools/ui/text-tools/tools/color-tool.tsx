import { rgbToHex } from "@/shared/helpers/color/rgb-to-hex";
import { updateInlineStyles } from "@/shared/helpers/update-inline-styles";
import { LocationStyles } from "@/shared/types/types";
import { Input } from "@/shared/ui/input";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";

type ColorToolProps = {
  editableElement: HTMLElement | Element | undefined | null;
  locationStyles: LocationStyles;
};

export function ColorTool({ editableElement, locationStyles }: ColorToolProps) {
  const inputSingleColorRef = useRef<HTMLInputElement>(null);

  const pathName = usePathname();

  const [color, setColor] = useState<string>(
    editableElement
      ? rgbToHex(window.getComputedStyle(editableElement as HTMLElement).color)
      : "#ffffff",
  );

  // Функция для изменения цвета
  const onChangeColor = (color: string) => {
    if (editableElement) {
      setColor(color);
      (editableElement as HTMLElement).style.setProperty("color", color);
    }
  };

  return (
    <button className="toggle-popover !p-0" aria-label="Color">
      <Input
        onChange={(e) => onChangeColor(e.target.value)}
        type="color"
        value={color}
        onBlur={() =>
          updateInlineStyles(
            editableElement as HTMLElement,
            pathName,
            locationStyles,
          )
        }
        className="h-6 w-5 cursor-pointer border-none bg-transparent p-0"
        tabIndex={-1}
        ref={inputSingleColorRef}
      />
    </button>
  );
}
