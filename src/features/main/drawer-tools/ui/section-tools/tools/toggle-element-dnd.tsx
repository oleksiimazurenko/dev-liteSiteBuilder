"use client";

import { useActiveDNDComponentStore } from "@/shared/store/dnd-store";
import DragHandleDots2Icon from "@/features/main/drawer-tools/svg/drag-handle-icon.svg";
import cn from "classnames";

export function ToggleElementDND() {
  const { setIsActive, isActive } = useActiveDNDComponentStore();

  return (
    <button
      className={cn("button-popover-trigger-in-drawer", {
        ['bg-neutral-400/20 dark:bg-neutral-950/20']: isActive,
      
      })}
      aria-label="Toogle DnD"
      onClick={() => setIsActive(!isActive)}
    >
      <DragHandleDots2Icon className="svg-icon-fill" />
    </button>
  );
}
