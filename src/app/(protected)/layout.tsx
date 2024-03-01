import { auth } from "@/shared/lib/auth/model/auth";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { redirect } from "next/navigation";
import { Navbar } from "../../features/auth/ui/navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
  const session = await auth();
  if (!session) redirect("/");

  return (
    <div className="flex h-svh w-full flex-col items-center justify-center gap-y-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800 pb-[40px] pt-[120px]">
      <Navbar />
      <ScrollArea className=" rounded-xl border">{children}</ScrollArea>
    </div>
  );
};

export default ProtectedLayout;
