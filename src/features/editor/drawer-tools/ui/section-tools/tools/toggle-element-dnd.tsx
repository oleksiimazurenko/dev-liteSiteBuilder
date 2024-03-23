"use client";

import DragHandleDots2Icon from "@/features/editor/drawer-tools/svg/drag-handle-icon.svg";
import { useActiveDNDComponentStore } from "@/shared/store/dnd-store";
import cn from "classnames";

export function ToggleElementDND() {
  const { setIsActive, isActive } = useActiveDNDComponentStore();

  return (
    <button
      className={cn("toggle-popover", {
        ["bg-neutral-600/20 dark:bg-neutral-950/20"]: isActive,
      })}
      aria-label="Toggle DnD"
      onClick={() => setIsActive(!isActive)}
    >
      <DragHandleDots2Icon className="svg-icon-fill" />
    </button>
  );
}
