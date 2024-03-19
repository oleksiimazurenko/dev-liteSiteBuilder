"use client";

import { ScrollArea } from "@/shared/ui/scroll-area";
import cn from "classnames";
import Link from "next/link";
import { SideBarItems } from "..";
import { usePathname } from "next/navigation";

type SidePanelDesktopProps = {
  className?: string;
  menuItems: SideBarItems[];
  titleMenu: string;
};

export default function SidePanelDesktop({
  className,
  menuItems,
  titleMenu
}: SidePanelDesktopProps) {
  const pathname = usePathname();

  return (
    <ScrollArea
      className={cn("hidden h-full w-full py-6 pr-6 md:flex lg:py-8", {
        [className as string]: className,
      })}
    >
      <div className="w-full space-y-3">
        <h3 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold text-black dark:text-white/70">
          {titleMenu}
        </h3>
        <div className="grid grid-flow-row auto-rows-max text-sm">
          {menuItems.map(({ name, url }) => (
            <Link
              key={url}
              href={url}
              className={cn(
                "group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-sm font-[200] text-neutral-500 transition-all hover:!text-neutral-600 hover:underline dark:text-neutral-400 dark:hover:!text-neutral-300",
                {
                  ["font-medium text-black/90 dark:text-white/90"]: pathname.endsWith(url),
                },
              )}
            >
              {name}
            </Link>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}
