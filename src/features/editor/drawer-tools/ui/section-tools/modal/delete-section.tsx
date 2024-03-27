"use client";

import { getPageByUrl } from "@/shared/actions/page/get/get-page-by-url";
import { useDrawerToolsStore } from "@/shared/store/editable-group-store";
import { Button } from "@/shared/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Arrow } from "@radix-ui/react-popover";
import { Trash2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { use, useEffect, useRef } from "react";
import { deleteSection } from "@/shared/actions/section/set/delete-section";

type RemoveSectionProps = {
  editableElement: HTMLElement | Element | undefined | null;
};

export function DeleteSection({ editableElement }: RemoveSectionProps) {
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

    const id = editableElement?.getAttribute("data-id");

    id && deleteSection(id, pathName);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="toggle-popover" aria-label="Trash" ref={buttonRef}>
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
            Are you sure you want to delete the section?
          </div>

          <Button
            className="mt-3 bg-red-400 font-[200] text-neutral-800 hover:bg-red-500"
            onClick={onRemoveSection}
          >
            Delete
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
