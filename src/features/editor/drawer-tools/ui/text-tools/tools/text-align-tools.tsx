"use client";

import TextAlignCenterIcon from "@/features/editor/drawer-tools/svg/text-align-center-icon.svg";
import TextAlignJustifyIcon from "@/features/editor/drawer-tools/svg/text-align-justify-icon.svg";
import TextAlignLeftIcon from "@/features/editor/drawer-tools/svg/text-align-left-icon.svg";
import TextAlignRightIcon from "@/features/editor/drawer-tools/svg/text-align-right-icon.svg";
import { updateInlineStyles } from "@/shared/helpers/update-inline-styles";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/toggle-group";
import { Arrow } from "@radix-ui/react-popover";
import { ArrowLeftRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type TextAlignToolsProps = {
  currentElement: HTMLElement | Element | undefined | null;
};

export function TextAlignTools({ currentElement }: TextAlignToolsProps) {
  const parentElement = currentElement?.parentElement;
  const [value, setValue] = useState<string | null>(null);
  const pathName = usePathname();

  useEffect(() => {
    if (parentElement) {
      setValue(window.getComputedStyle(parentElement).textAlign);
    }
  }, [parentElement]);

  return (
    <Popover
      onOpenChange={(isOpen) =>
        !isOpen &&
        updateInlineStyles(currentElement as HTMLElement, pathName, "textAlign")
      }
    >
      <PopoverTrigger asChild>
        <button className="toggle-popover" aria-label="Text Align">
          <ArrowLeftRight strokeWidth={1} className="svg-icon-stroke" />
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
              (parentElement as HTMLElement).style.textAlign = value;
              setValue(value);
            }
          }}
        >
          <ToggleGroupItem
            value="left"
            aria-label="Toggle textalignleft"
            className="toggle-single"
          >
            <TextAlignLeftIcon className="svg-icon-fill h-4 w-4" />
          </ToggleGroupItem>

          <ToggleGroupItem
            value="center"
            aria-label="Toggle textaligncenter"
            className="toggle-single"
          >
            <TextAlignCenterIcon className="svg-icon-fill h-4 w-4" />
          </ToggleGroupItem>

          <ToggleGroupItem
            value="justify"
            aria-label="Toggle textalignjustify"
            className="toggle-single"
          >
            <TextAlignJustifyIcon className="svg-icon-fill h-4 w-4" />
          </ToggleGroupItem>

          <ToggleGroupItem
            value="right"
            aria-label="Toggle textalignright"
            className="toggle-single"
          >
            <TextAlignRightIcon className="svg-icon-fill h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </PopoverContent>
    </Popover>
  );
}
