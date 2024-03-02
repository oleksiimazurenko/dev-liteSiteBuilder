"use client";

import cn from "classnames";

type LogoIconProps = {
  className?: string;
};

export function LogoIcon({ className }: LogoIconProps) {
  return (
    <div
      className={cn("!hidden text-[13px] lg:!block tw2 dark:td2", {
        [className as string]: className,
        // [jetBrainsMono.className]: jetBrainsMono,
      })}
    >
      Landee
    </div>
  );
}
