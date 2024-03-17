"use client";

import { logout } from "@/shared/lib/auth/actions/set/logout";
import { LogOutProps } from "@/shared/types/props";
import { Button } from "@/shared/ui/button";
import cn from "classnames";
import { LogOut as LogOutIcon } from "lucide-react";

export function LogOut({ className }: LogOutProps) {
  return (
    <Button
      className={cn(
        "bottom-0 left-0 flex items-center justify-center p-0 shadow-2xl backdrop-blur-[0.5rem] transition-all hover:scale-[1.07] hover:bg-neutral-400 active:scale-105",
        {
          [className as string]: className,
        },
      )}
      onClick={() => logout()}
    >
      <LogOutIcon
        size={15}
        className="stroke-neutral-500 dark:stroke-neutral-800"
      />
    </Button>
  );
}
