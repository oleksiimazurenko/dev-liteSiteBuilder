"use client";

import { ScrollArea } from "@/shared/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/ui/sheet";
import Link from "next/link";
import cn from "classnames";
import { SideBarItems } from '../model/side-bar-data'

type MobileProps = {
  className?: string;
  menuItems: SideBarItems[];
};

export default function Mobile({ className, menuItems }: MobileProps) {
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
