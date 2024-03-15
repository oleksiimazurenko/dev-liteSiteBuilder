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
import { ScrollArea, ScrollBar } from "@/shared/ui/scroll-area";
import cn from "classnames";
import { UserButton } from "./user-button";
import { Desktop } from './desktop'

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
      <Desktop className='' LangSwitch={LangSwitch} ThemeSwitch={ThemeSwitch} LogOut={LogOut} buttonArray={buttonArray}/>
    </nav>
  );
};
