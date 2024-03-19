"use client";

import { updateTextContent } from "@/shared/helpers/update-text-content";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Textarea } from "@/shared/ui/textarea";
import { Arrow } from "@radix-ui/react-popover";
import { TextCursor } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

type ChangeTextProps = {
  currentElement: HTMLElement | Element | undefined | null;
};

export function ChangeText({ currentElement }: ChangeTextProps) {
  const [textareaValue, setTextareaValue] = useState<string>("");

  const pathName = usePathname();

  return (
    <Popover
      onOpenChange={(isOpen) =>
        isOpen && setTextareaValue(currentElement?.textContent as string)
      }
    >
      <PopoverTrigger asChild>
        <button
          className="button-popover-trigger-in-drawer"
          aria-label="Change text"
        >
          <TextCursor className="svg-icon-stroke" size={15} strokeWidth={1.3} />
        </button>
      </PopoverTrigger>

      <PopoverContent
        className="w-80 p-2"
        onBlur={() =>
          updateTextContent(
            currentElement as HTMLElement,
            pathName,
            "textContent",
          )
        }
      >
        <Arrow width={10} height={5} />
        <Textarea
          className="resize-none"
          defaultValue={textareaValue}
          onChange={(e) => {
            if (currentElement) {
              (currentElement as HTMLElement).textContent = e.target.value;

              if (
                currentElement.textContent?.length === 0 ||
                currentElement.textContent?.trim().length === 0
              ) {
                (currentElement as HTMLElement).textContent =
                  "Default text element";
              }
            }
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
