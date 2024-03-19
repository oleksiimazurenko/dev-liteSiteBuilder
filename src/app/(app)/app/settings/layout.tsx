import { SidePanel, sideBarData } from "@/widgets/main/side-panel";
import cn from "classnames";

type ProtectedLayoutProps = {
  children: React.ReactNode;
};

export default async function SettingsLayout({
  children,
}: ProtectedLayoutProps) {
  return (
    <div
      className={cn(
        "container relative w-full flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10",
      )}
    >
      <SidePanel menuItems={sideBarData.setting} titleMenu="Setting menu" />

      <div
        className={cn(
          "py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]",
        )}
      >
        {children}
      </div>
    </div>
  );
}
