import { CreateSectionTrigger } from "@/features/drawer-tools";

type BuildFooterProps = {
  className?: string;
};

export async function BuildFooter({ className }: BuildFooterProps) {
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
