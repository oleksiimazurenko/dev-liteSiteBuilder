import { LangSwitch } from "@/features/lang-switch";
import { Navbar } from "@/features/navbar";
import { ThemeSwitch } from "@/features/theme-switch";
import { auth } from "@/shared/lib/auth/model/auth";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { redirect } from "next/navigation";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
  const session = await auth();
  if (!session) redirect("/");

  return (
    <div className="bcw1 dark:bcd1 flex h-svh w-full items-center justify-center md:pb-[80px]">
      <Navbar
        className="dark:bcd2 bcw2 fixed bottom-0 left-0 z-50 w-full p-4"
        LangSwitch={LangSwitch}
        ThemeSwitch={ThemeSwitch}
      />
      <ScrollArea className="h-[500px] rounded-xl">{children}</ScrollArea>
    </div>
  );
};

export default ProtectedLayout;
