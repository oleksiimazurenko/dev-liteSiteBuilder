import { SidePanel, sideBarData } from "@/widgets/main/side-panel";
import cn from "classnames";

type ProtectedLayoutProps = {
  children: React.ReactNode;
};

export default async function EditorLayout({ children }: ProtectedLayoutProps) {
  return (
    <div
      className={cn(
        "container relative w-full flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10",
        {},
      )}
    >
      <SidePanel menuItems={sideBarData.editor} titleMenu="Editor menu" />

      {children}
      
    </div>
  );
}
