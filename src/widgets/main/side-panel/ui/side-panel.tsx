"use client";

import { SideBarItems } from "@/widgets/main/side-panel";
import { usePathname } from "next/navigation";
import SidePanelDesktop from "./side-panel-desktop";
import SidePanelMobile from "./side-panel-mobile";

type SidePanelProps = {
  className?: string;
  menuItems: SideBarItems[];
  titleMenu: string;
};

export function SidePanel({ menuItems, titleMenu }: SidePanelProps) {
  
  // const pathname = usePathname();

  // const isVisible = menuItems.some((item) => item.url === pathname);

  // if (!isVisible) {
  //   return null;
  // }

  return (
    <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
      <SidePanelMobile menuItems={menuItems} />
      <SidePanelDesktop menuItems={menuItems} titleMenu={titleMenu} />
    </aside>
  );
}
