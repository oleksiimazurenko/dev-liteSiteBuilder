"use client";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { SlidersHorizontal } from "lucide-react";
import { useEffect, useRef } from "react";

import { Arrow } from "@radix-ui/react-popover";

import { TextTools } from "./text-tools/text-tools";

import { useOutsideClick } from "@/shared/hooks/use-outside-click";
import { CreateElementTools } from "./create-element/create-element-tools";
import { CreatePage } from "./page-tools/modal/create-page";
import { DeletePage } from "./page-tools/modal/delete-page";
import { CreateProduct } from "./product-tools/modal/create-product";
import { DeleteProduct } from "./product-tools/modal/delete-product";
import { CreateSection } from "./section-tools/modal/create-section";
import { SectionTools } from "./section-tools/section-tools";
import { usePopoverToolsStore } from '@/shared/store/editable-group-store'

type PopoverToolsProps = {};

export function PopoverTools({}: PopoverToolsProps) {
  const contentPopoverDivRef = useRef<HTMLDivElement | null>(null);

  const { typeOpen, isOpenPopoverTools, editableGroup, setIsOpenPopoverTools } =
    usePopoverToolsStore();

  const { editableElement, editableTrigger } = editableGroup;

  useEffect(() => contentPopoverDivRef.current?.focus(), [editableGroup]);

  useEffect(() => {
    if (isOpenPopoverTools) {
      if (editableElement && (typeOpen === "text" || typeOpen === "section")) {
        editableElement.style.setProperty("outline", "auto 2px #4A90E2");
      }
    }
  }, [editableTrigger, isOpenPopoverTools]);

  useOutsideClick(
    contentPopoverDivRef,
    () => {
      (editableElement as HTMLElement)?.style.setProperty("outline", "none");
      setIsOpenPopoverTools(false);
    },
    "[data-radix-popper-content-wrapper]",
    "data-trigger-tools",
  );

  return (
    <Popover open={isOpenPopoverTools}>
      <PopoverTrigger
        asChild
        className="fixed bottom-[-48px] left-1/2 -translate-x-1/2 transform"
      >
        <SlidersHorizontal size={48} strokeWidth={0.5} className="opacity-0" />
      </PopoverTrigger>

      <PopoverContent
        className="w-80 p-2"
        side="top"
        ref={contentPopoverDivRef}
      >
        <Arrow width={45} height={5} className="fill-slate-200 " />
        <div className="flex flex-wrap items-center justify-center gap-4">
          {typeOpen === "text" && <TextTools />}

          {typeOpen === "section" && <SectionTools />}

          {typeOpen === "delete-page" && <DeletePage />}

          {typeOpen === "delete-product" && <DeleteProduct />}

          {typeOpen === "create-page" && <CreatePage />}

          {typeOpen === "create-product" && <CreateProduct />}

          {typeOpen === "create-element" && <CreateElementTools />}

          {typeOpen === "create-section" && <CreateSection />}
        </div>
      </PopoverContent>
    </Popover>
  );
}
