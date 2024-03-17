"use client";

import { ScrollArea } from "@/shared/ui/scroll-area";
import cn from "classnames";
import Link from "next/link";
import { SideBarItems } from "..";

type DesktopProps = {
  className?: string;
  menuItems: SideBarItems[];
};

export default function Desktop({ className, menuItems }: DesktopProps) {
  return (
    <ScrollArea
      className={cn("hidden h-full w-full py-6 pr-6 md:flex lg:py-8", {
        [className as string]: className,
      })}
    >
      <div className="w-full space-y-3">
        <h3 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
          Test
        </h3>
        <div className="grid grid-flow-row auto-rows-max text-sm">
          {menuItems.map(({ name, url }) => (
            <Link
              key={url}
              href={url}
              className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-sm font-[200] text-muted-foreground hover:underline"
            >
              {name}
            </Link>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}
