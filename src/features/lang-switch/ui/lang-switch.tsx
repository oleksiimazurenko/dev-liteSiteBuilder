"use client";

import { useInitDictionary } from "@/shared/hooks/use-init-dictionary";
import { useInitFontFamily } from "@/shared/hooks/use-init-font-family";
import { useDictionaryStore } from "@/shared/store/dictionary-store";
import { LangSwitchProps } from "@/shared/types/props";
import { Button } from "@/shared/ui/button";
import cn from "classnames";

export function LangSwitch({ className }: LangSwitchProps) {
  const { dictionary, setLanguage, language: lang } = useDictionaryStore();

  useInitDictionary();

  useInitFontFamily(lang);

  const toggleLang = () => {

    switch (lang) {
      case "en":
        setLanguage("ua");
        break;
      case "ua":
        setLanguage("ru");
        break;
      case "ru":
        setLanguage("en");
        break;
      default:
        setLanguage("en");
    }
  };

  return (
    <Button
      className={cn(
        "dark:bcd2 bcw2 h-[30px] w-[30px] items-center justify-center overflow-hidden border border-none border-opacity-40 font-light text-neutral-500 shadow-2xl backdrop-blur-[0.5rem] transition-all hover:scale-[1.07] hover:bg-neutral-400 active:scale-105 dark:border-none",
        {
          [className as string]: className,
        },
      )}
      onClick={toggleLang}
      variant="default"
    >
      {lang === "en" && "EN"}

      {lang === "ua" && "UA"}

      {lang === "ru" && "RU"}
    </Button>
  );
}
