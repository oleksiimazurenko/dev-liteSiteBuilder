import { LangSwitch } from "@/features/lang-switch";
import { LogOut } from "@/features/logout";
import { Navbar } from "@/features/navbar";
import { ThemeSwitch } from "@/features/theme-switch";
import { auth } from "@/shared/lib/auth/model/auth";
import { redirect } from "next/navigation";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
  const session = await auth();
  if (!session) redirect("/");

  return (
    <div className="flex h-svh w-full items-center justify-center bg-white md:pb-[72px]">
      
      <div className="bcw1 dark:bcd1 w-full h-[calc(100svh-72px)]">
        {children}
      </div>

      <Navbar
        className="dark:bcd2 bcw2 fixed bottom-0 left-1/2 z-50 w-full max-w-[2400px] -translate-x-1/2 transform p-4"
        LangSwitch={LangSwitch}
        ThemeSwitch={ThemeSwitch}
        LogOut={LogOut}
      />
    </div>
  );
};

export default ProtectedLayout;
