"use client";

import { useDrawerToolsStore } from "@/shared/store/editable-group-store";
import { Button } from "@/shared/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Arrow } from "@radix-ui/react-popover";
import { Trash2 } from "lucide-react";
import { deleteElement } from "../../../../../shared/actions/element/set/delete-element";

type RemoveElementProps = {
  currentElement: HTMLElement | Element | undefined | null;
};

export function RemoveElement({ currentElement }: RemoveElementProps) {
  const { setIsOpenDrawerTools } = useDrawerToolsStore();

  const parrentElement = currentElement?.parentElement;

  const onRemoveElement = () => {
    setIsOpenDrawerTools(false);

    const id = currentElement?.getAttribute("data-id");

    id && deleteElement({ id, rPath: "/" });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-transparent p-[12px] text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
          aria-label="Trash"
        >
          <Trash2 strokeWidth={0.9} />
        </button>
      </PopoverTrigger>

      <PopoverContent>
        <Arrow width={10} height={5} />
        <div className="flex flex-col items-center justify-center">
          <div className="text-center">
            Are you sure you want to delete the element?
          </div>

          <Button
            className="mt-2 bg-red-400 hover:bg-red-500"
            onClick={onRemoveElement}
          >
            Delete
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
