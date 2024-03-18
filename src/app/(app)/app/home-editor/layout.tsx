"use client";

import { SidePanel, sideBarData } from "@/widgets/main/side-panel";
import cn from "classnames";
import { usePathname } from "next/navigation";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const sideBarDataUrl = sideBarData.homeEditor.map((item) => item.url);

  const pathname = usePathname();
  const isSite = sideBarDataUrl.some((item) => pathname.endsWith(item));

  return (
    <div
      className={cn("", {
        ["container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10"]:
          isSite,
        ["grid-cols-1"]: !isSite,
      })}
    >
      {isSite && <SidePanel menuItems={sideBarData.homeEditor} />}

      <div className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
        {children}
      </div>
    </div>
  );
}
