"use client";

import { useDrawerToolsStore } from "@/shared/store/editable-group-store";
import { RemoveElement } from "../section-tools/tools/remove-element";
import { HeightTool } from "../tools/height-tool";
import { ChangeText } from "./tools/change-text";
import { ColorTool } from "./tools/color-tool";
import { FontSizeTool } from "./tools/font-size-tool";
import { TextAlignTools } from "./tools/text-align-tools";
import { TextDecorationTools } from "./tools/text-decoration-tools";
import { TextStrokeTools } from "./tools/text-stroke-tools";
import { SpaceYComp } from '../tools/space-y-comp'

type ToolsTextProps = {};

export function TextTools({}: ToolsTextProps) {
  const { editableGroup } = useDrawerToolsStore();
  const { editableElement, editableTrigger } = editableGroup;

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-quaternary text-sm">Box Model</h2>
        <div className="flex items-center justify-center">
          <SpaceYComp editableElement={editableElement} locationStyles='outer'/>
          <HeightTool
            editableElement={editableElement}
            locationStyles="outer"
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <h2 className="text-quaternary text-sm">Interactive Actions</h2>
        <div className="flex items-center justify-center">
          <ChangeText editableElement={editableElement} />
          <RemoveElement editableElement={editableElement} />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <h2 className="text-quaternary text-sm">Visual Styles</h2>
        <div className="flex items-center justify-center">
          <TextDecorationTools
            editableElement={editableElement}
            locationStyles="inner"
          />
          <TextAlignTools
            editableElement={editableElement}
            locationStyles="outer"
          />
          <TextStrokeTools
            editableElement={editableElement}
            locationStyles="inner"
          />
          <ColorTool editableElement={editableElement} locationStyles="inner" />
          <FontSizeTool
            editableElement={editableElement}
            locationStyles="inner"
          />
        </div>
      </div>
    </>
  );
}
