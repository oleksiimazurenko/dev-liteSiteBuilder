"use client";

import { useActiveDNDComponentStore } from "@/shared/store/dnd-store";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import cn from "classnames";

export function ToggleElementDND() {
  const { setIsActive, isActive } = useActiveDNDComponentStore();

  const stylesButton = {
    active: "bg-accent text-accent-foreground ring-primary ring-offset-2",
    inactive: "bg-muted text-muted-foreground bg-transparent",
    main: "w-10 h-10 p-[12px] cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors",
    hover: "hover:bg-muted hover:text-muted-foreground",
    focus:
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    disabled: "disabled:pointer-events-none disabled:opacity-50",
  };

  return (
    <button
      className={cn("", {
        [stylesButton.active]: isActive,
        [stylesButton.inactive]: !isActive,
        [stylesButton.main]: true,
        [stylesButton.hover]: true,
        [stylesButton.focus]: true,
        [stylesButton.disabled]: false,
      })}
      aria-label="Toogle DnD"
      onClick={() => setIsActive(!isActive)}
    >
      <DragHandleDots2Icon />
    </button>
  );
}
