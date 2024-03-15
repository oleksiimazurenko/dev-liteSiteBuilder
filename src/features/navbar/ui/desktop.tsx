"use client";

import Link from "next/link";

import {
  LangSwitchProps,
  LogOutProps,
  ThemeSwitchProps,
} from "@/shared/types/props";
import { Button } from "@/shared/ui/button";
import cn from "classnames";
import { UserButton } from "./user-button";
import { usePathname } from 'next/navigation'

type ButtonArray = {
	name: string;
	link: string;
}[]

type NavbarProps = {
	className?: string;
  LangSwitch: ({ className }: LangSwitchProps) => JSX.Element;
  ThemeSwitch: ({ className }: ThemeSwitchProps) => JSX.Element;
  LogOut: ({ className }: LogOutProps) => JSX.Element;
	buttonArray: ButtonArray;
};

export function Desktop({ className, LangSwitch, ThemeSwitch, LogOut, buttonArray }: NavbarProps) {

	const pathname = usePathname();

  return (
    <div className={cn('flex items-center gap-x-2', {
			[className as string]: className,
		})}>
      {buttonArray.map(({ name, link }) => (
        <Button
          key={link}
          asChild
          className={cn(
            "button-white dark:button-dark shadow-xl transition-all hover:scale-105 dark:border-none",
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

      <div className="flex flex-1 items-center justify-end">
        <UserButton
          LangSwitch={LangSwitch}
          ThemeSwitch={ThemeSwitch}
          LogOut={LogOut}
        />
      </div>
    </div>
  );
}
