"use client";

import {
  LangSwitchProps,
  LogOutProps,
  ThemeSwitchProps,
} from "@/shared/types/props";
import cn from "classnames";
import { Desktop } from "./desktop";
import { Mobile } from "./mobile";
import { BarChart4, FileText, Home, PencilRuler, Settings } from "lucide-react";

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
      name: "Main page",
      link: "/app/list-sites",
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
      icon: <PencilRuler strokeWidth={1} />
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
      <Desktop
        className="hidden md:flex"
        LangSwitch={LangSwitch}
        ThemeSwitch={ThemeSwitch}
        LogOut={LogOut}
        buttonArray={buttonArray}
      />
      <Mobile
        className="flex md:hidden"
        LangSwitch={LangSwitch}
        ThemeSwitch={ThemeSwitch}
        LogOut={LogOut}
        buttonArray={buttonArray}
      />
    </nav>
  );
};
