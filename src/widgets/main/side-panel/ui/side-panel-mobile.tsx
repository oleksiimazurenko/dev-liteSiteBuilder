"use client";

import { ScrollArea } from "@/shared/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/ui/sheet";
import cn from "classnames";
import Link from "next/link";
import { SideBarItems } from "../model/side-bar-data";

type SidePanelMobileProps = {
  className?: string;
  menuItems: SideBarItems[];
};

export default function SidePanelMobile({
  className,
  menuItems,
}: SidePanelMobileProps) {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden">Open</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Landee</SheetTitle>
        </SheetHeader>
        <ScrollArea
          className={cn("hidden h-full md:flex", {
            [className as string]: className,
          })}
        >
          {menuItems.map(({ name, url }) => (
            <Link key={url} href={url}>
              {name}
            </Link>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
