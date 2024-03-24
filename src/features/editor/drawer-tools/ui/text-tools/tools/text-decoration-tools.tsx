"use client";

import FontBoldIcon from "@/features/editor/drawer-tools/svg/font-bold-icon.svg";
import FontItalicIcon from "@/features/editor/drawer-tools/svg/font-italic-icon.svg";
import UnderlineIcon from "@/features/editor/drawer-tools/svg/underline-icon.svg";
import { updateInlineStyles } from "@/shared/helpers/update-inline-styles";
import { LocationStyles } from "@/shared/types/types";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/toggle-group";
import { Arrow } from "@radix-ui/react-popover";
import { Baseline } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type TextDecorationToolsProps = {
  currentElement: HTMLElement | Element | undefined | null;
  locationStyles: LocationStyles;
};

export function TextDecorationTools({
  currentElement,
  locationStyles,
}: TextDecorationToolsProps) {
  const [values, setValues] = useState<string[] | null>(null);

  const pathName = usePathname();

  useEffect(() => {
    if (currentElement) {
      const newValues = (
        ["fontWeight", "fontStyle", "textDecoration"] as Array<
          keyof CSSStyleDeclaration
        >
      )
        .map((style) => {
          const value = window.getComputedStyle(currentElement)[style];
          switch (style) {
            case "fontWeight":
              return value === "bold" || (value && +value > 500)
                ? "bold"
                : undefined;
            case "fontStyle":
              return value === "italic" ? "italic" : undefined;
            case "textDecoration":
              return value && value.toString().split(" ")[0] === "underline"
                ? "underline"
                : undefined;
          }
        })
        .filter(Boolean) as string[];
      setValues(newValues);
    }
  }, [currentElement]);

  const onHandleValueChange = (receivedValues: string[]) => {
    if (currentElement) {
      const findDifference = (
        prevArray: string[] | null,
        currArray: string[],
      ) => {
        if (!prevArray) return { added: currArray[0] };

        const newElement = currArray.find((x) => !prevArray.includes(x));
        const removedElement = prevArray.find((x) => !currArray.includes(x));

        return {
          added: newElement, // null, если не найдено
          removed: removedElement, // null, если не найдено
        };
      };

      const { added, removed } = findDifference(values, receivedValues);

      if (added) {
        added === "bold" &&
          ((currentElement as HTMLElement).style.fontWeight = "bold");
        added === "italic" &&
          ((currentElement as HTMLElement).style.fontStyle = "italic");
        added === "underline" &&
          ((currentElement as HTMLElement).style.textDecoration = "underline");
      }

      if (removed) {
        removed === "bold" &&
          ((currentElement as HTMLElement).style.fontWeight = "normal");
        removed === "italic" &&
          ((currentElement as HTMLElement).style.fontStyle = "normal");
        removed === "underline" &&
          ((currentElement as HTMLElement).style.textDecoration = "none");
      }
      setValues(receivedValues);
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
          <Baseline strokeWidth={1} className="svg-icon-stroke" />
        </button>
      </PopoverTrigger>

      <PopoverContent className="bg-glass relative w-80 border-none">
        <Arrow
          width={100}
          height={5}
          className="fill-neutral-200/50 dark:fill-neutral-800/50"
        />

        <ToggleGroup
          type="multiple"
          rovingFocus={false}
          className="flex-wrap"
          value={values ? values : undefined}
          onValueChange={onHandleValueChange}
        >
          <ToggleGroupItem
            value="bold"
            aria-label="Toggle bold"
            className="toggle-single"
          >
            <FontBoldIcon className="svg-icon-fill h-4 w-4" />
          </ToggleGroupItem>

          <ToggleGroupItem
            value="italic"
            aria-label="Toggle italic"
            className="toggle-single"
          >
            <FontItalicIcon className="svg-icon-fill h-4 w-4" />
          </ToggleGroupItem>

          <ToggleGroupItem
            value="underline"
            aria-label="Toggle underline"
            className="toggle-single"
          >
            <UnderlineIcon className="svg-icon-fill h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </PopoverContent>
    </Popover>
  );
}
