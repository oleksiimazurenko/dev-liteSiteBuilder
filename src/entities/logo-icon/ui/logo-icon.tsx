"use client";

import cn from "classnames";

type LogoIconProps = {
  className?: string;
};

export function LogoIcon({ className }: LogoIconProps) {
  return (
    <div
      className={cn("!hidden text-[13px] lg:!block tcw2 dark:tcd2", {
        [className as string]: className,
        // [jetBrainsMono.className]: jetBrainsMono,
      })}
    >
      Landee
    </div>
  );
}
