"use client";

import { logout } from "@/shared/lib/auth/actions/set/logout";
import { LogOutProps } from "@/shared/types/props";
import { Button } from "@/shared/ui/button";
import cn from "classnames";
import { LogOut as LogOutIcon } from "lucide-react";

export function LogOut({ className, svgClassName }: LogOutProps) {
  return (
    <Button
      className={cn(
        "flex items-center justify-center transition-all",
        {
          [className as string]: className,
        },
      )}
      onClick={() => logout()}
      variant="link"
    >
      <LogOutIcon
        size={15}
        className={cn("stroke-neutral-500 dark:stroke-neutral-800", {
          [svgClassName as string]: svgClassName,
        })}
        
      />
    </Button>
  );
}
