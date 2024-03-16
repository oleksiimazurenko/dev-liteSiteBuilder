"use client";

import Link from "next/link";

import {
  LangSwitchProps,
  LogOutProps,
  ThemeSwitchProps,
} from "@/shared/types/props";
import cn from "classnames";
import { usePathname } from "next/navigation";
import { UserButton } from "./user-button";

type ButtonArray = {
  name: string;
  link: string;
}[];

type NavbarProps = {
  className?: string;
  LangSwitch: ({ className }: LangSwitchProps) => JSX.Element;
  ThemeSwitch: ({ className }: ThemeSwitchProps) => JSX.Element;
  LogOut: ({ className }: LogOutProps) => JSX.Element;
  buttonArray: ButtonArray;
};

export function Desktop({
  className,
  LangSwitch,
  ThemeSwitch,
  LogOut,
  buttonArray,
}: NavbarProps) {
  const pathname = usePathname();

  return (
    <div
      className={cn("items-center space-x-6 pl-5", {
        [className as string]: className,
      })}
    >
      {buttonArray.map(({ name, link }) => {
        if (name === "Create site") return;
        return (
          <Link
            key={link}
            href={link}
            className={cn(
              "font-[200] text-neutral-500 transition-all hover:!text-neutral-600 dark:text-neutral-400 dark:hover:!text-neutral-300",
              {
                ["dark:!text-white"]: pathname === link,
                ["!text-neutral-950"]: pathname === link,

              },
            )}
          >
            {name}
          </Link>
        );
      })}

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
