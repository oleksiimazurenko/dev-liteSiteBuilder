"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LangSwitchProps,
  LogOutProps,
  ThemeSwitchProps,
} from "@/shared/types/props";
import { Button } from "@/shared/ui/button";
import cn from "classnames";
import { UserButton } from "./user-button";

type NavbarProps = {
  className?: string;
  LangSwitch: ({ className }: LangSwitchProps) => JSX.Element;
  ThemeSwitch: ({ className }: ThemeSwitchProps) => JSX.Element;
  LogOut: ({ className }: LogOutProps) => JSX.Element;
};

export const Navbar = ({
  className,
  LangSwitch,
  ThemeSwitch,
  LogOut,
}: NavbarProps) => {
  const pathname = usePathname();

  const session = useSession();

  const buttonArray = [
    { name: "Info profil", link: "/app/info-profil" },
    { name: "Settings", link: "/app/settings" },
    { name: "List sites", link: "/app/list-sites" },
  ];

  return (
    <nav
      className={cn("", {
        [className as string]: className,
      })}
    >
      <div className="flex items-center gap-x-2">
        {buttonArray.map(({ name, link }) => (
          <Button
            key={link}
            asChild
            className={cn(
              "btnw1 dark:btnd1 shadow-xl transition-all hover:scale-105 dark:border-none",
            )}
          >
            <Link
              href={link}
              className={cn("text-white dark:text-black", {
                ["!border-[1.5px] !border-solid !border-white"]:
                  pathname === link,
              })}
            >
              {name}
            </Link>
          </Button>
        ))}

        <div className="flex flex-1 items-center justify-center">
          <div className="ml-auto mr-4 block font-light text-neutral-500">
            {session?.data?.user?.name}
          </div>
          <UserButton
            LangSwitch={LangSwitch}
            ThemeSwitch={ThemeSwitch}
            LogOut={LogOut}
          />
        </div>
      </div>
    </nav>
  );
};
