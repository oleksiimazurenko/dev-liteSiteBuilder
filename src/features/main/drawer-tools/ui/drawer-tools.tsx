"use client";
import { useEffect, useRef } from "react";

import { TextTools } from "./text-tools/text-tools";

import { useOutsideClick } from "@/shared/hooks/use-outside-click";
import { useDrawerToolsStore } from "@/shared/store/editable-group-store";
import { CreateElementTools } from "./create-element/create-element-tools";
import { CreatePage } from "./page-tools/modal/create-page";
import { DeletePage } from "./page-tools/modal/delete-page";
import { CreateProduct } from "./product-tools/modal/create-product";
import { DeleteProduct } from "./product-tools/modal/delete-product";
import { CreateSection } from "./section-tools/modal/create-section";
import { SectionTools } from "./section-tools/section-tools";

import { Button } from "@/shared/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/shared/ui/drawer";
import { useDrawerHelper } from "../hooks/use-drawer-helper";

type DrawerToolsProps = {};

export function DrawerTools({}: DrawerToolsProps) {
  const contentDrawerDivRef = useRef<HTMLDivElement | null>(null);

  const { typeOpen, isOpenDrawerTools, editableGroup, setIsOpenDrawerTools } =
    useDrawerToolsStore();

  const { editableElement, editableTrigger } = editableGroup;

  // useEffect(() => contentDrawerDivRef.current?.focus(), [editableGroup]);

  useEffect(() => {
    if (isOpenDrawerTools) {
      if (editableElement && (typeOpen === "text" || typeOpen === "section")) {
        editableElement.style.setProperty("outline", "auto 2px #4A90E2");
      }
    }
  }, [editableTrigger, isOpenDrawerTools]);

  useOutsideClick(
    isOpenDrawerTools,
    () => {
      (editableElement as HTMLElement)?.style.setProperty("outline", "none");
      setIsOpenDrawerTools(false);
    },
    ["[vaul-drawer]", "[data-radix-popper-content-wrapper]"],
  );

  useDrawerHelper(isOpenDrawerTools, () => {
    (editableElement as HTMLElement)?.style.setProperty("outline", "none");
  });

  return (
    <Drawer open={isOpenDrawerTools}>
      <DrawerTrigger
        asChild
        className="fixed bottom-[-48px] left-1/2 -translate-x-1/2 transform "
      >
        <Button variant="outline" className="opacity-50">
          Open Drawer
        </Button>
      </DrawerTrigger>
      <DrawerContent
        ref={contentDrawerDivRef}
        className="border-none backdrop-blur-[2px] dark:bg-neutral-50/20 dark:[&>div]:bg-neutral-200/10"
      >
        <span className="flex flex-wrap items-center justify-center p-10">
          {typeOpen === "text" && <TextTools />}

          {typeOpen === "section" && <SectionTools />}

          {typeOpen === "delete-page" && <DeletePage />}

          {typeOpen === "delete-product" && <DeleteProduct />}

          {typeOpen === "create-page" && <CreatePage />}

          {typeOpen === "create-product" && <CreateProduct />}

          {typeOpen === "create-element" && <CreateElementTools />}

          {typeOpen === "create-section" && <CreateSection />}
        </span>
      </DrawerContent>
    </Drawer>
  );
}
