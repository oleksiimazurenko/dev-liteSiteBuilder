import { useEffect } from 'react'
import { Theme, useThemeStore } from '../store/theme-store'

export function useInitTheme() {

	const { setTheme } = useThemeStore();

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

}