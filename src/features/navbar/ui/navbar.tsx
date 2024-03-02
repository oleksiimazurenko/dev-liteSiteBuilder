"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useCurrentRole } from "@/shared/lib/auth/hooks/use-current-role";
import { LangSwitchProps, ThemeSwitchProps } from "@/shared/types/props";
import { Button } from "@/shared/ui/button";
import cn from "classnames";
import { UserButton } from "./user-button";

type NavbarProps = {
  className?: string;
  LangSwitch: ({ className }: LangSwitchProps) => JSX.Element;
  ThemeSwitch: ({ className }: ThemeSwitchProps) => JSX.Element;
};

export const Navbar = ({ className, LangSwitch, ThemeSwitch }: NavbarProps) => {
  const pathname = usePathname();

  const session = useSession();
  const role = useCurrentRole();

  const buttonArray = [
    { name: "Info profil", link: "/info-profil" },
    { name: "Settings", link: "/settings" },
    { name: "List sites", link: "/list-sites" },
  ];

  return (
    <nav className={cn('', {
			[className as string]: className,
		})}>
      <div className="flex items-center gap-x-2">
        {buttonArray.map(({ name, link }) => (
          <Button
            key={link}
            asChild
            className={cn(
              "dark:bcd2 bcw2 border-none transition-all hover:scale-105",
            )}
          >
            <Link
              href={link}
              className={cn("tcw2 dark:tcd2", {
                ["!border !border-solid !border-black"]: pathname === link,
                ["border border-transparent"]: pathname !== link,
              })}
            >
              {name}
            </Link>
          </Button>
        ))}

        <div className="flex flex-1 items-center justify-center">
          <div className="ml-auto mr-4 block">{session?.data?.user?.name}</div>
          <UserButton />
        </div>

        <ThemeSwitch className="md:flex md:h-[3rem] md:w-[3rem] md:rounded-full md:px-[16px] md:py-[16px]" />

        <LangSwitch className="md:flex md:h-[3rem] md:w-[3rem] md:rounded-full md:px-[16px] md:py-[16px]" />
      </div>
    </nav>
  );
};
