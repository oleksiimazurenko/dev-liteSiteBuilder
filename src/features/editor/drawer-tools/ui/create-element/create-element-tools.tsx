"use client";

import { useDrawerToolsStore } from "@/shared/store/editable-group-store";
import { toast } from "sonner";
import { ImageModel } from "./model-elements/image-model";
import { TextModel } from "./model-elements/text-model";

export function CreateElementTools() {
  const { editableGroup } = useDrawerToolsStore();
  const { editableElement } = editableGroup;

  const id = editableElement?.getAttribute("data-id");

  if (!id) {
    toast.error(
      "Element ID not found, problem found in file create-element-tools.tsx",
    );
    return null;
  }

  return (
    <div className="flex flex-wrap">
      <TextModel id={id} />
      <ImageModel id={id} />
    </div>
  );
}
