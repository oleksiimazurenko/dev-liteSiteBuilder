"use client";

import { getPageByUrl } from "@/shared/actions/page/get/get-page-by-url";
import { useDrawerToolsStore } from "@/shared/store/editable-group-store";
import { Button } from "@/shared/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Arrow } from "@radix-ui/react-popover";
import { Trash2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { deleteSection } from "../../../../../../shared/actions/section/set/delete-section";

type RemoveSectionProps = {
  currentElement: HTMLElement | Element | undefined | null;
};

export function DeleteSection({ currentElement }: RemoveSectionProps) {
  const { setIsOpenDrawerTools } = useDrawerToolsStore();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const pathName = usePathname();

  useEffect(() => {
    (async () => {
      const { data } = await getPageByUrl(pathName);
      if (data?.sections.length === 1) {
        buttonRef.current?.setAttribute("disabled", "true");
      }
    })();
  }, []);

  const onRemoveSection = () => {
    setIsOpenDrawerTools(false);

    const id = currentElement?.getAttribute("data-id");

    id && deleteSection(id, pathName);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="button-popover-trigger-in-drawer"
          aria-label="Trash"
          ref={buttonRef}
        >
          <Trash2 strokeWidth={0.9} />
        </button>
      </PopoverTrigger>

      <PopoverContent>
        <Arrow width={10} height={5} />
        <div className="flex flex-col items-center justify-center">
          <div className="text-center">
            Are you sure you want to delete the section?
          </div>

          <Button
            className="mt-2 bg-red-400 hover:bg-red-500"
            onClick={onRemoveSection}
          >
            Delete
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
