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
      <div className="bcw2 dark:bcd2 h-[500px] w-[300px] md:w-[500px] rounded-xl">
        {children}
      </div>

      <div className="absolute right-3 top-3 flex space-x-2">
        <ThemeSwitch className="md:h-[3rem] md:w-[3rem] md:rounded-full md:px-[16px] md:py-[16px]" />
        <LangSwitch className="md:h-[3rem] md:w-[3rem] md:rounded-full md:px-[16px] md:py-[16px]" />
      </div>
    </div>
  );
};

export default ProtectedLayout;
