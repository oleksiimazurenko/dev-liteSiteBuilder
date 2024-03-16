"use client";

import { useInitTheme } from "@/shared/hooks/use-init-theme";
import { useThemeStore } from "@/shared/store/theme-store";
import { ThemeSwitchProps } from "@/shared/types/props";
import { Button } from "@/shared/ui/button";
import cn from "classnames";
import { BsMoon, BsSun } from "react-icons/bs";

export function ThemeSwitch({ className }: ThemeSwitchProps) {
  const { theme, setTheme } = useThemeStore();

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

  useInitTheme();

  return (
    <Button
      className={cn(
        "bottom-0 left-0 flex items-center justify-center shadow-2xl backdrop-blur-[0.5rem] transition-all hover:scale-[1.07] hover:bg-neutral-400 active:scale-105",
        {
          [className as string]: className,
        },
      )}
      onClick={toggleTheme}
      variant="default"
    >
      {theme === "light" ? (
        <BsMoon className="fill-neutral-500 dark:fill-neutral-900" />
      ) : (
        <BsSun className="fill-neutral-500 dark:fill-neutral-900" />
      )}
    </Button>
  );
}
