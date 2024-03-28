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

import { useRefreshGsapToken } from "@/shared/store/refresh-gsap-status";
import { Button } from "@/shared/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/shared/ui/drawer";
import { useDrawerHelper } from "../hooks/use-drawer-helper";
import { ImageTools } from "./image-tools/image-tools";

type DrawerToolsProps = {};

export function DrawerTools({}: DrawerToolsProps) {
  const contentDrawerDivRef = useRef<HTMLDivElement | null>(null);

  const { typeOpen, isOpenDrawerTools, editableGroup, setIsOpenDrawerTools } =
    useDrawerToolsStore();

  const { editableElement, editableTrigger } = editableGroup;
  const { setRefreshGsapToken } = useRefreshGsapToken();

  // С этим возможно придется поработать, так как в некоторых случаях бывают проблемы с обновлением gsap
  useEffect(() => {
    if (!isOpenDrawerTools) {
      setTimeout(() => {
        setRefreshGsapToken(Math.random());
      }, 500);
    }
  }, [isOpenDrawerTools]);

  useEffect(() => {
    if (isOpenDrawerTools) {
      if (
        editableElement &&
        (typeOpen === "text" || typeOpen === "section" || typeOpen === "image")
      ) {
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
        className="fixed bottom-[-48px] left-1/2 hidden -translate-x-1/2 transform "
      >
        <Button variant="outline"></Button>
      </DrawerTrigger>
      <DrawerContent
        ref={contentDrawerDivRef}
        className="bg-glass border-none focus-visible:outline-none [&>div]:bg-neutral-50/30 dark:[&>div]:bg-neutral-950/30"
      >
        <span className="flex flex-wrap items-center justify-evenly p-10">
          {typeOpen === "text" && <TextTools />}

          {typeOpen === "image" && <ImageTools />}

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
function setRefreshGsapToken(arg0: number) {
  throw new Error("Function not implemented.");
}
