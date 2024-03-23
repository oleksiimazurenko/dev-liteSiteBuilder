"use client";

import { deleteElement } from "@/shared/actions/element/set/delete-element";
import { useDrawerToolsStore } from "@/shared/store/editable-group-store";
import { Button } from "@/shared/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Arrow } from "@radix-ui/react-popover";
import { Trash2 } from "lucide-react";

type RemoveElementProps = {
  currentElement: HTMLElement | Element | undefined | null;
};

export function RemoveElement({ currentElement }: RemoveElementProps) {
  const { setIsOpenDrawerTools } = useDrawerToolsStore();

  const parentElement = currentElement?.parentElement;

  const onRemoveElement = () => {
    setIsOpenDrawerTools(false);

    const id = currentElement?.getAttribute("data-id");

    id && deleteElement({ id, rPath: "/" });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="toggle-popover" aria-label="Trash">
          <Trash2 strokeWidth={0.9} className="svg-icon-stroke" />
        </button>
      </PopoverTrigger>

      <PopoverContent className="bg-glass border-none">
        <Arrow
          width={100}
          height={5}
          className="fill-neutral-200/50 dark:fill-neutral-800/50"
        />
        <div className="flex flex-col items-center justify-center">
          <div className="text-tertiary text-center">
            Are you sure you want to delete the element?
          </div>

          <Button
            className="mt-3 bg-red-400 font-[200] text-neutral-800 hover:bg-red-500"
            onClick={onRemoveElement}
          >
            Delete
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
