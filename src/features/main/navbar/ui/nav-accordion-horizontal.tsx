"use client";

import { useInitDictionary } from "@/shared/dictionary/hooks/use-init-dictionary";
import { useDictionaryStore } from "@/shared/dictionary/store/dictionary-store";
import { useInitFontFamily } from "@/shared/hooks/use-init-font-family";
import { useInitTheme } from "@/shared/hooks/use-init-theme";
import { useOutsideClick } from "@/shared/hooks/use-outside-click";
import { useCurrentUser } from "@/shared/lib/auth/hooks/use-current-user";
import {
  LangSwitchProps,
  LogOutProps,
  ThemeSwitchProps,
} from "@/shared/types/props";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";

import cn from "classnames";

import { useRef, useState } from "react";

type NavAccordionHorizontalProps = {
  LangSwitch: ({ className }: LangSwitchProps) => JSX.Element;
  ThemeSwitch: ({ className }: ThemeSwitchProps) => JSX.Element;
  LogOut: ({ className }: LogOutProps) => JSX.Element;
  currentUser: string | null | undefined;
};

export function NavAccordionHorizontal({
  LangSwitch,
  ThemeSwitch,
  LogOut,
  currentUser,
}: NavAccordionHorizontalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  useInitDictionary();

  const { language: lang } = useDictionaryStore();

  useInitFontFamily(lang);
  useInitTheme();

  useOutsideClick(
    isOpen,
    () => {
      setIsOpen(false);
    },
    ["[data-accordion-wrapper]"],
  );

  const onHandleClick = () => {
    setIsOpen(!isOpen);
  };
  const user = useCurrentUser();

  return (
    <div
      data-accordion-wrapper
      className="relative flex items-center justify-center space-x-3"
      ref={ref}
    >
      <div className="overflow-hidden">
        <div
          className={cn(
            "mr-[-250px] font-[200] text-neutral-500 transition-all",
            {
              ["!mr-3"]: !isOpen,
            },
          )}
        >
          {currentUser}
        </div>
      </div>
      <Button
        className="!ml-0 cursor-pointer rounded-full p-0"
        onClick={onHandleClick}
      >
        <Avatar className="shadow-xl transition-all hover:scale-105">
          <AvatarImage
            src={user?.image ? user.image : "https://github.com/shadcn.png"}
          />
          <AvatarFallback className="text-[10px]">empty</AvatarFallback>
        </Avatar>
      </Button>

      <div className="overflow-hidden">
        <div
          className={cn(
            "mr-[-185px] flex space-x-3 rounded-lg p-1 transition-all",
            {
              ["!mr-[0px]"]: isOpen,
            },
          )}
        >
          <LangSwitch className="h-[35px] w-[35px] text-neutral-500 transition-all hover:!text-neutral-600 dark:text-neutral-400 dark:hover:!text-neutral-300" />
          <ThemeSwitch
            className="h-[35px] w-[35px] p-0"
            svgClassName="w-full h-full !fill-neutral-500 transition-all hover:!fill-neutral-600 dark:!fill-neutral-400 dark:hover:!fill-neutral-300 !p-[10.7px]"
          />
          <LogOut
            className="h-[35px] w-[35px] p-0"
            svgClassName="w-full h-full !stroke-neutral-500 transition-all hover:!stroke-neutral-600 dark:!stroke-neutral-400 dark:hover:!stroke-neutral-300 !p-[10.7px]"
          />
        </div>
      </div>
    </div>
  );
}
