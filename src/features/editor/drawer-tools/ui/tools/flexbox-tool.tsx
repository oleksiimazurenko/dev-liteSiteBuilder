"use client";
import { updateInlineStyles } from "@/shared/helpers/update-inline-styles";
import { LocationStyles } from "@/shared/types/types";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/toggle-group";
import { Arrow } from "@radix-ui/react-popover";
import {
  AlignCenterVertical,
  AlignEndVertical,
  AlignStartVertical,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
type FlexboxToolProps = {
  currentElement: HTMLElement | Element | undefined | null;
  locationStyles: LocationStyles;
};

export function FlexboxTool({
  currentElement,
  locationStyles,
}: FlexboxToolProps) {
  const parentElement = currentElement?.parentElement;
  const [value, setValue] = useState<string | null>(null);
  const pathName = usePathname();

  useEffect(() => {
    if (parentElement) {
      setValue(window.getComputedStyle(parentElement).alignItems);
    }
  }, [parentElement]);

  return (
    <Popover
      onOpenChange={(isOpen) => {
        !isOpen &&
          updateInlineStyles(
            currentElement as HTMLElement,
            pathName,
            locationStyles,
          );
      }}
    >
      <PopoverTrigger asChild>
        <button className="toggle-popover" aria-label="Text Align">
          <AlignEndVertical
            strokeWidth={0.75}
            className="svg-icon-fill h-4 w-4"
          />
        </button>
      </PopoverTrigger>

      <PopoverContent className="bg-glass relative w-80 border-none">
        <Arrow
          width={100}
          height={5}
          className="fill-neutral-200/50 dark:fill-neutral-800/50"
        />

        <ToggleGroup
          type="single"
          rovingFocus={false}
          className="flex-wrap"
          value={value ? value : undefined}
          onValueChange={(value) => {
            if (parentElement) {
              (parentElement as HTMLElement).style.alignItems = value;
              setValue(value);
            }
          }}
        >
          <ToggleGroupItem
            value="start"
            aria-label="AlignStartVertical"
            className="toggle-single"
          >
            <AlignStartVertical
              strokeWidth={0.75}
              className="svg-icon-fill h-4 w-4"
            />
          </ToggleGroupItem>

          <ToggleGroupItem
            value="center"
            aria-label="AlignCenterVertical"
            className="toggle-single"
          >
            <AlignCenterVertical
              strokeWidth={0.75}
              className="svg-icon-fill h-4 w-4"
            />
          </ToggleGroupItem>

          <ToggleGroupItem
            value="end"
            aria-label="AlignEndVertical"
            className="toggle-single"
          >
            <AlignEndVertical
              strokeWidth={0.75}
              className="svg-icon-fill h-4 w-4"
            />
          </ToggleGroupItem>
        </ToggleGroup>
      </PopoverContent>
    </Popover>
  );
}
