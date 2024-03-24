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
      onOpenChange={(isOpen) => {
        isOpen && setTextareaValue(currentElement?.textContent as string);

        !isOpen &&
          updateTextContent(
            currentElement as HTMLElement,
            pathName,
            "textContent",
          );
      }}
    >
      <PopoverTrigger asChild>
        <button className="toggle-popover" aria-label="Change text">
          <TextCursor className="svg-icon-stroke" size={15} strokeWidth={1.3} />
        </button>
      </PopoverTrigger>

      <PopoverContent className="bg-glass w-80 rounded-lg p-0">
        <Arrow
          width={100}
          height={5}
          className="fill-neutral-200/50 dark:fill-neutral-800/50"
        />
        <Textarea
          className="text-tertiary resize-none border-none bg-transparent"
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
