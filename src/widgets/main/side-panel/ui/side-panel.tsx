"use client";

import { SideBarItems } from "../model/side-bar-data";
import Desktop from "./desktop";
import Mobile from "./mobile";

type SidePanelProps = {
  className?: string;
  menuItems: SideBarItems[];
};

export function SidePanel({ className, menuItems }: SidePanelProps) {
  return (
    <aside className='fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block'>
      <Mobile menuItems={menuItems} />
      <Desktop menuItems={menuItems} />
    </aside>
  );
}
