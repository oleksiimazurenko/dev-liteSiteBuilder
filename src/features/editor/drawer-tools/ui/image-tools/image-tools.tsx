"use client";

import { useDrawerToolsStore } from "@/shared/store/editable-group-store";
import { RemoveElement } from "../section-tools/tools/remove-element";
import { BGColorTools } from "../tools/bg-color-tools";
import { BorderRadiusTool } from "../tools/border-radius-tool";
import { FlexboxTool } from "../tools/flexbox-tool";
import { HeightTool } from "../tools/height-tool";
import { ChangeImage } from "./tools/change-image";
import { ImageSizeTool } from "./tools/image-size-tool";

type ImageToolsProps = {};

export function ImageTools({}: ImageToolsProps) {
  const { editableGroup } = useDrawerToolsStore();
  const { editableElement: editableElement, editableTrigger } = editableGroup;

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-quaternary text-sm">Box Model</h2>
        <div className="flex items-center justify-center">
          <ImageSizeTool
            editableElement={editableElement}
            locationStyles="inner"
          />
          <HeightTool
            editableElement={editableElement}
            locationStyles="outer"
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <h2 className="text-quaternary text-sm">Flexbox</h2>
        <div className="flex items-center justify-center">
          <FlexboxTool
            editableElement={editableElement}
            locationStyles="outer"
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <h2 className="text-quaternary text-sm">Interactive Actions</h2>
        <div className="flex items-center justify-center">
          <RemoveElement editableElement={editableElement} />
          <ChangeImage editableElement={editableElement} />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <h2 className="text-quaternary text-sm">Visual Styles</h2>
        <div className="flex items-center justify-center">
          <BorderRadiusTool
            editableElement={editableElement}
            locationStyles="inner"
            type="%"
          />
          <BGColorTools
            editableElement={editableElement}
            locationStyles="outer"
          />
        </div>
      </div>
    </>
  );
}
