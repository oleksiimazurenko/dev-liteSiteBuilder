"use client";

import {
  LangSwitchProps,
  LogOutProps,
  ThemeSwitchProps,
} from "@/shared/types/props";
import cn from "classnames";
import {
  BarChart4,
  BookOpenCheck,
  FileText,
  Home,
  PencilRuler,
  Settings,
} from "lucide-react";
import { useSession } from "next-auth/react";
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
  const session = useSession();

  const buttonArray = [
    {
      name: "Editor",
      link: "/app/editor",
      icon: <Home strokeWidth={1} />,
      isPublic: false,
    },
    {
      name: "Settings",
      link: "/app/settings",
      icon: <Settings strokeWidth={1} />,
      isPublic: false,
    },
    {
      name: "Create site",
      link: "/app/editor/create-site",
      icon: <PencilRuler strokeWidth={1} />,
      isPublic: false,
    },
    {
      name: "Forms",
      link: "/app/forms",
      icon: <FileText strokeWidth={1} />,
      isPublic: false,
    },
    {
      name: "Analytics",
      link: "/app/analytics",
      icon: <BarChart4 strokeWidth={1} />,
      isPublic: false,
    },
    {
      name: "Docs",
      link: "/docs",
      icon: <FileText strokeWidth={0.5} />,
      isPublic: true,
    },
    {
      name: "Examples",
      link: "/examples",
      icon: <BookOpenCheck strokeWidth={0.5} />,
      isPublic: true,
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
        buttonArray={
          session.status === "authenticated"
            ? buttonArray
            : buttonArray.filter(({ isPublic }) => isPublic === true)
        }
      />
      <NavMobile
        className="flex md:hidden"
        LangSwitch={LangSwitch}
        ThemeSwitch={ThemeSwitch}
        LogOut={LogOut}
        buttonArray={
          session.status === "authenticated"
            ? buttonArray.filter((button) => !button.isPublic)
            : buttonArray.filter((button) => button.isPublic)
        }
      />
    </nav>
  );
};
