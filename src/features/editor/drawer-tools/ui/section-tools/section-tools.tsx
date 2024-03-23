"use client";

import { useDrawerToolsStore } from "@/shared/store/editable-group-store";
import { ToggleGroup } from "@/shared/ui/toggle-group";
import { BGColorTools } from "../tools/bg-color-tools";
import { BorderRadiusTool } from "../tools/border-radius-tool";
import { ChangeBackgroundImage } from "../tools/change-background-image";
import { PaddingTool } from "../tools/padding-tool";
import { DeleteSection } from "./modal/delete-section";
import { ToggleElementDND } from "./tools/toggle-element-dnd";

type SectionToolsProps = {};

export function SectionTools({}: SectionToolsProps) {
  const { editableGroup } = useDrawerToolsStore();
  const { editableElement: currentElement, editableTrigger } = editableGroup;

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-quaternary text-sm">Box Model</h2>
        <div className="flex items-center justify-center">
          <PaddingTool currentElement={currentElement} />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <h2 className="text-quaternary text-sm">Layout Management</h2>
        <div className="flex items-center justify-center">
          <ToggleElementDND />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <h2 className="text-quaternary text-sm">Interactive Actions</h2>
        <div className="flex items-center justify-center">
          <DeleteSection currentElement={currentElement} />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <h2 className="text-quaternary text-sm">Visual Styles</h2>
        <div className="flex items-center justify-center">
          <ChangeBackgroundImage currentElement={currentElement} />
          <BGColorTools currentElement={currentElement} />
          <BorderRadiusTool currentElement={currentElement} />
        </div>
      </div>
    </>
  );
}
