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

type DrawerToolsProps = {};

export function DrawerTools({}: DrawerToolsProps) {
  const contentDrawerDivRef = useRef<HTMLDivElement | null>(null);

  const { typeOpen, isOpenDrawerTools, editableGroup, setIsOpenDrawerTools } =
    useDrawerToolsStore();

  const { editableElement, editableTrigger } = editableGroup;

  useEffect(() => contentDrawerDivRef.current?.focus(), [editableGroup]);

  useEffect(() => {
    if (isOpenDrawerTools) {
      if (editableElement && (typeOpen === "text" || typeOpen === "section")) {
        editableElement.style.setProperty("outline", "auto 2px #4A90E2");
      }
    }
  }, [editableTrigger, isOpenDrawerTools]);

  useOutsideClick(
    contentDrawerDivRef,
    () => {
      (editableElement as HTMLElement)?.style.setProperty("outline", "none");
      setIsOpenDrawerTools(false);
    },
    "[data-radix-popper-content-wrapper]",
    "data-trigger-tools",
  );

  return (
    <Drawer open={isOpenDrawerTools}>
      <DrawerTrigger
        asChild
        className="fixed bottom-[-48px] left-1/2 -translate-x-1/2 transform"
      >
        <Button variant="outline" className="opacity-50">
          Open Drawer
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="flex flex-wrap items-center justify-center p-10">
          {typeOpen === "text" && <TextTools />}

          {typeOpen === "section" && <SectionTools />}

          {typeOpen === "delete-page" && <DeletePage />}

          {typeOpen === "delete-product" && <DeleteProduct />}

          {typeOpen === "create-page" && <CreatePage />}

          {typeOpen === "create-product" && <CreateProduct />}

          {typeOpen === "create-element" && <CreateElementTools />}

          {typeOpen === "create-section" && <CreateSection />}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
