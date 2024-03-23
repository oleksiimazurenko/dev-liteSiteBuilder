"use client";

import { useDrawerToolsStore } from "@/shared/store/editable-group-store";
import { RemoveElement } from "../section-tools/tools/remove-element";
import { BGColorTools } from "../tools/bg-color-tools";
import { BorderRadiusTool } from "../tools/border-radius-tool";
import { PaddingTool } from "../tools/padding-tool";
import { HeightTool } from "../tools/height-tool";
import { ChangeImage } from "./tools/change-image";

type ImageToolsProps = {};

export function ImageTools({}: ImageToolsProps) {
  const { editableGroup } = useDrawerToolsStore();
  const { editableElement: currentElement, editableTrigger } = editableGroup;

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-quaternary text-sm">Box Model</h2>
        <div className="flex items-center justify-center">
          <PaddingTool currentElement={currentElement} />
          {/* <MarginTool currentElement={currentElement} /> */}
          <HeightTool currentElement={currentElement} />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <h2 className="text-quaternary text-sm">Interactive Actions</h2>
        <div className="flex items-center justify-center">
          <RemoveElement currentElement={currentElement} />
          <ChangeImage currentElement={currentElement} />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <h2 className="text-quaternary text-sm">Visual Styles</h2>
        <div className="flex items-center justify-center">
          <BorderRadiusTool currentElement={currentElement} />
          <BGColorTools currentElement={currentElement} />
        </div>
      </div>
    </>
  );
}
