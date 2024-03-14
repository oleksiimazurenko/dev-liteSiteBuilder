"use client";

import { useDrawerToolsStore } from "@/shared/store/editable-group-store";
import { RemoveElement } from "../section-tools/tools/remove-element";
import { BGColorTools } from "../tools/bg-color-tools";
import { BorderRadiusTool } from "../tools/border-radius-tool";
import { MarginTool } from "../tools/margin-tool";
import { PaddingTool } from "../tools/padding-tool";
import { WidthHeightTool } from "../tools/width-height-tool";
import { ChangeText } from "./tools/change-text";
import { ColorTool } from "./tools/color-tool";
import { FontSizeTool } from "./tools/font-size-tool";
import { TextAlignTools } from "./tools/text-align-tools";
import { TextDecorationTools } from "./tools/text-decoration-tools";
import { TextStrokeTools } from "./tools/text-stroke-tools";

type ToolsTextProps = {};

export function TextTools({}: ToolsTextProps) {
  const { editableGroup } = useDrawerToolsStore();

  const { editableElement, editableTrigger } = editableGroup;

  const currentElement = editableElement as HTMLElement;

  return (
    <>
      <RemoveElement currentElement={currentElement} />

      <ChangeText currentElement={currentElement} />

      <TextDecorationTools currentElement={currentElement} />

      <TextAlignTools currentElement={currentElement} />

      <TextStrokeTools currentElement={currentElement} />

      <ColorTool currentElement={currentElement} />

      <FontSizeTool currentElement={currentElement} />

      <PaddingTool currentElement={currentElement} />

      <MarginTool currentElement={currentElement} />

      <WidthHeightTool currentElement={currentElement} />

      <BorderRadiusTool currentElement={currentElement} />

      <BGColorTools currentElement={currentElement} />
    </>
  );
}
