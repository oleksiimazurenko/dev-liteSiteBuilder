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
    <div className="relative h-screen w-full bg-white">
      <div className="third-gradient-white dark:third-gradient-dark h-[calc(100%-48px)] w-full md:h-[calc(100%-56px)]">
        {children}
      </div>

      <Navbar
        className="md:dark:second-gradient-dark md:second-gradient-white fixed bottom-0 left-1/2 z-50 w-full max-w-[2400px] -translate-x-1/2 transform px-3 py-0 md:py-1"
        LangSwitch={LangSwitch}
        ThemeSwitch={ThemeSwitch}
        LogOut={LogOut}
      />
    </div>
  );
};

export default ProtectedLayout;
