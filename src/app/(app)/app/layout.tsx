import { auth } from "@/shared/lib/auth/model/auth";
import { redirect } from "next/navigation";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
  const session = await auth();
  if (!session) redirect("/");

  return (
    <div className="third-gradient-white dark:third-gradient-dark relative min-h-[calc(100svh-59.5px)] w-full">
      {children}
    </div>
  );
};

export default ProtectedLayout;
