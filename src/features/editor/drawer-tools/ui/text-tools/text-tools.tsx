"use client";

import { useDrawerToolsStore } from "@/shared/store/editable-group-store";
import { RemoveElement } from "../section-tools/tools/remove-element";
import { BGColorTools } from "../tools/bg-color-tools";
import { BorderRadiusTool } from "../tools/border-radius-tool";
import { PaddingTool } from "../tools/padding-tool";
import { HeightTool } from "../tools/height-tool";
import { ChangeText } from "./tools/change-text";
import { ColorTool } from "./tools/color-tool";
import { FontSizeTool } from "./tools/font-size-tool";
import { TextAlignTools } from "./tools/text-align-tools";
import { TextDecorationTools } from "./tools/text-decoration-tools";
import { TextStrokeTools } from "./tools/text-stroke-tools";

type ToolsTextProps = {};

export function TextTools({}: ToolsTextProps) {
  const { editableGroup } = useDrawerToolsStore();
  const { editableElement: currentElement, editableTrigger } = editableGroup;

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-quaternary text-sm">Box Model</h2>
        <div className="flex items-center justify-center">
          <PaddingTool currentElement={currentElement} />
          <HeightTool currentElement={currentElement} />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <h2 className="text-quaternary text-sm">Interactive Actions</h2>
        <div className="flex items-center justify-center">
          <ChangeText currentElement={currentElement} />
          <RemoveElement currentElement={currentElement} />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <h2 className="text-quaternary text-sm">Visual Styles</h2>
        <div className="flex items-center justify-center">
          <BorderRadiusTool currentElement={currentElement} />
          <BGColorTools currentElement={currentElement} />
          <TextDecorationTools currentElement={currentElement} />
          <TextAlignTools currentElement={currentElement} />
          <TextStrokeTools currentElement={currentElement} />
          <ColorTool currentElement={currentElement} />
          <FontSizeTool currentElement={currentElement} />
        </div>
      </div>
    </>
  );
}
