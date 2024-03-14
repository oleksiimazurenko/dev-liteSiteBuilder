import { BuildNavbar } from "@/features/build-navbar";
import { CreatePageTrigger, DeletePageTrigger } from "@/features/drawer-tools";

type BuildHeaderProps = {
  className?: string;
  siteId: string;
};

export async function BuildHeader({ className, siteId }: BuildHeaderProps) {
  return (
    <header
      className={`absolute left-1/2 top-0 z-50 w-full -translate-x-1/2 transform py-[30px] ${className}`}
    >
      <BuildNavbar
        linkColor="white"
        typeNavbar="header"
        CreatePageTrigger={CreatePageTrigger}
        DeletePageTrigger={DeletePageTrigger}
        siteId={siteId}
      />
    </header>
  );
}
