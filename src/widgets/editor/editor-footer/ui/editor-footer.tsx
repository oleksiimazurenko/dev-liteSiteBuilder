import { CreateSectionTrigger } from "@/features/main/drawer-tools";

type EditorFooterProps = {
  className?: string;
};

export async function EditorFooter({ className }: EditorFooterProps) {
  return (
    <footer
      className={`relative flex w-full flex-col items-center justify-center py-[30px] ${className}`}
    >
      <div className="absolute right-0 top-0">
        <CreateSectionTrigger />
      </div>
      2024 © All rights reserved
    </footer>
  );
}
