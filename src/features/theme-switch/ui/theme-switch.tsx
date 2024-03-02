"use client";

import { ThemeSwitchProps } from '@/shared/types/props'
import { Button } from "@/shared/ui/button";
import cn from "classnames";
import { useEffect, useState } from "react";
import { BsMoon, BsSun } from "react-icons/bs";

type Theme = "light" | "dark";

export function ThemeSwitch({ className }: ThemeSwitchProps) {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      window.localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
      return;
    }

    setTheme("light");
    window.localStorage.setItem("theme", "light");
    document.documentElement.classList.remove("dark");
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme") as Theme;
    if (localTheme) {
      setTheme(localTheme);
      if (localTheme === "dark") document.documentElement.classList.add("dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <Button
      className={cn(
        "dark:bcd2 bcw2 bottom-0 left-0 flex h-[30px] w-[30px] items-center justify-center border border-none border-opacity-40 p-0 shadow-2xl backdrop-blur-[0.5rem] transition-all hover:scale-[1.15] hover:bg-neutral-400 active:scale-105 dark:border-none", {
          [className as string]: className,
        }
      )}
      onClick={toggleTheme}
      variant="default"
    >
      {theme === "light" ? (
        <BsMoon className="fill-neutral-500" />
      ) : (
        <BsSun className="fill-neutral-400" />
      )}
    </Button>
  );
}
