import { auth } from "@/shared/lib/auth/model/auth";
import { redirect } from "next/navigation";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
  const session = await auth();
  if (!session) redirect("/");

  return (
    <div className="third-gradient-white dark:third-gradient-dark relative min-h-[100svh] w-full md:min-h-[100svh]">
      <div className="pt-[46px] md:pt-[56px]">{children}</div>
    </div>
  );
};

export default ProtectedLayout;