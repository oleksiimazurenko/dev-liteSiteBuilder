"use client";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import cn from "classnames";

type UserSettingDesktopProps = {
  className?: string;
  children?: React.ReactNode;
};

export default function UserSettingDesktop({
  className,
  children,
}: UserSettingDesktopProps) {
  return (
    <ScrollArea
      className={cn("flex flex-col space-y-5", {
        [className as string]: className,
      })}
    >
      {children}
    </ScrollArea>
  );
}
