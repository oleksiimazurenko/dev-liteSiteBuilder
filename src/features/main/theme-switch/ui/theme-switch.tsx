"use client";

import { useInitTheme } from "@/shared/hooks/use-init-theme";
import { useThemeStore } from "@/shared/store/theme-store";
import { ThemeSwitchProps } from "@/shared/types/props";
import { Button } from "@/shared/ui/button";
import cn from "classnames";
import { BsMoon, BsSun } from "react-icons/bs";

export function ThemeSwitch({ className, svgClassName }: ThemeSwitchProps) {
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
        "flex items-center justify-center transition-all",
        {
          [className as string]: className,
        },
      )}
      onClick={toggleTheme}
      variant="link"
    >
      {theme === "light" ? (
        <BsMoon className={cn("fill-neutral-950", {
          [svgClassName as string]: svgClassName,
        })} />
      ) : (
        <BsSun className={cn("fill-neutral-50", {
          [svgClassName as string]: svgClassName,
        })} />
      )}
    </Button>
  );
}
