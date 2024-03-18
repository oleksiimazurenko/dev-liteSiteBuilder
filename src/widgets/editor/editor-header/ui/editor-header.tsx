import { EditorNavbar } from "@/features/editor/editor-navbar";
import {
  CreatePageTrigger,
  DeletePageTrigger,
} from "@/features/main/drawer-tools";
import cn from "classnames";

type EditorHeaderProps = {
  className?: string;
  siteId: string;
};

export async function EditorHeader({ className, siteId }: EditorHeaderProps) {
  return (
    <header
      className={cn(
        "absolute left-1/2 top-0 z-40 w-full -translate-x-1/2 transform bg-neutral-300/10 py-[10px] backdrop-blur-sm",
        {
          [className as string]: className,
        },
      )}
    >
      <EditorNavbar
        linkColor="white"
        typeNavbar="header"
        CreatePageTrigger={CreatePageTrigger}
        DeletePageTrigger={DeletePageTrigger}
        siteId={siteId}
      />
    </header>
  );
}
