import { CreateSectionTrigger } from "@/features/drawer-tools";
import { auth } from "@/shared/lib/auth/model/auth";

type BuildFooterProps = {
  className?: string;
};

export async function BuildFooter({ className }: BuildFooterProps) {
  const session = await auth();
  const isAdmin = session?.user.role === "ADMIN";

  return (
    <footer
      className={`relative flex w-full flex-col items-center justify-center py-[30px] ${className}`}
    >
      {isAdmin && (
        <div className="absolute right-0 top-0">
          <CreateSectionTrigger />
        </div>
      )}
      2024 © All rights reserved
    </footer>
  );
}
