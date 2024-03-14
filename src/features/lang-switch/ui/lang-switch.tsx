"use client";

import { setLangUser } from "@/shared/dictionary/actions/set/set-lang-user";
import { useInitDictionary } from "@/shared/dictionary/hooks/use-init-dictionary";
import { useDictionaryStore } from "@/shared/dictionary/store/dictionary-store";
import { useInitFontFamily } from "@/shared/hooks/use-init-font-family";
import { publicRoutes } from "@/shared/lib/auth/model/routes";
import { LangSwitchProps } from "@/shared/types/props";
import { Button } from "@/shared/ui/button";
import cn from "classnames";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

export function LangSwitch({ className }: LangSwitchProps) {
  const { setLanguage, language: lang } = useDictionaryStore();
  const pathname = usePathname();

  useInitDictionary();
  useInitFontFamily(lang);

  //Устанавливаем язык пользователя на сервере
  const handleSetLangUser = async (lang: string) => {
    // Если мы находимся на публичной странице, то не отправляем запрос на сервер так как пользователь не авторизован нету на кого записывать данные
    if (!publicRoutes.includes(pathname)) {
      const { success, message } = await setLangUser(lang);
      if (!success) {
        toast.error(
          `Client message: Don\'t change language in server. Notice in file: src/features/lang-switch/ui/lang-switch.tsx, function: handleSetLangUser. Server message: ${message}.`,
        );
      }
    }
  };

  const toggleLang = () => {
    switch (lang) {
      case "en":
        setLanguage("ua");
        handleSetLangUser("ua");
        break;
      case "ua":
        setLanguage("ru");
        handleSetLangUser("ru");
        break;
      case "ru":
        setLanguage("en");
        handleSetLangUser("en");
        break;
      default:
        setLanguage("en");
        handleSetLangUser("en");
    }
  };

  return (
    <Button
      className={cn(
        "items-center justify-center overflow-hidden border-opacity-40 font-light text-neutral-500 dark:text-neutral-800 shadow-2xl backdrop-blur-[0.5rem] transition-all hover:scale-[1.07] active:scale-105",
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
