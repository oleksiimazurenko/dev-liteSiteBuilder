"use client";

import {
  LangSwitchProps,
  LogOutProps,
  ThemeSwitchProps,
} from "@/shared/types/props";
import cn from "classnames";
import { BarChart4, FileText, Home, PencilRuler, Settings } from "lucide-react";
import { NavDesktop } from "./nav-desktop";
import { NavMobile } from "./nav-mobile";

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
    {
      name: "Home",
      link: "/app/home",
      icon: <Home strokeWidth={1} />,
    },
    {
      name: "Settings",
      link: "/app/settings",
      icon: <Settings strokeWidth={1} />,
    },
    {
      name: "Create site",
      link: "/app/create-site",
      icon: <PencilRuler strokeWidth={1} />,
    },
    {
      name: "Forms",
      link: "/app/forms",
      icon: <FileText strokeWidth={1} />,
    },
    {
      name: "Analytics",
      link: "/app/analytics",
      icon: <BarChart4 strokeWidth={1} />,
    },
  ];

  return (
    <nav
      className={cn("", {
        [className as string]: className,
      })}
    >
      <NavDesktop
        className="hidden md:flex"
        buttonArray={buttonArray}
      />
      <NavMobile
        className="flex md:hidden"
        LangSwitch={LangSwitch}
        ThemeSwitch={ThemeSwitch}
        LogOut={LogOut}
        buttonArray={buttonArray}
      />
    </nav>
  );
};