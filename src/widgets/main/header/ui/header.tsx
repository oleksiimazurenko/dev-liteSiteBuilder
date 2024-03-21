import { LangSwitch } from "@/features/main/lang-switch";
import { LogOut } from "@/features/main/logout";
import { NavUserButton, Navbar } from "@/features/main/navbar";
import { ThemeSwitch } from "@/features/main/theme-switch";
import { auth } from "@/shared/lib/auth/model/auth";
import Link from "next/link";
import LogInButton from "./log-in-button";
import { Slash } from "lucide-react";

export async function Header() {
  const session = await auth();

  return (
    <header className="bg-glass sticky top-0 z-50 w-full border-b border-neutral-950/10 dark:border-neutral-50/10">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <div className="mr-4 hidden md:flex">
          <Link
            href="/"
            className="mr-2 flex items-center space-x-2 font-[400] dark:text-neutral-400 text-neutral-500"
          >
            Landee
          </Link>
          <Slash
            strokeWidth={1}
            className="rotate-[155deg] stroke-neutral-500"
          />
          <Navbar
            className="flex items-center gap-6 text-sm"
            LangSwitch={LangSwitch}
            ThemeSwitch={ThemeSwitch}
            LogOut={LogOut}
          />
        </div>

        {!session && (
          <div className="flex items-center justify-center space-x-3">
            <LangSwitch className="h-[35px] w-[35px] text-neutral-500 transition-all hover:!text-neutral-600 dark:text-neutral-400 dark:hover:!text-neutral-300" />
            <ThemeSwitch
              className="h-[35px] w-[35px] p-0"
              svgClassName="w-full h-full !fill-neutral-500 transition-all hover:!fill-neutral-600 dark:!fill-neutral-400 dark:hover:!fill-neutral-300 !p-[10.7px]"
            />
            <LogInButton />
          </div>
        )}
        {session && (
          <div className="flex flex-1 items-center justify-end">
            <NavUserButton
              LangSwitch={LangSwitch}
              ThemeSwitch={ThemeSwitch}
              LogOut={LogOut}
            />
          </div>
        )}
      </div>
    </header>
  );
}
