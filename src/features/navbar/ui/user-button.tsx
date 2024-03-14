"use client";

import { useInitDictionary } from "@/shared/dictionary/hooks/use-init-dictionary";
import { useDictionaryStore } from "@/shared/dictionary/store/dictionary-store";
import { useInitFontFamily } from "@/shared/hooks/use-init-font-family";
import { useInitTheme } from "@/shared/hooks/use-init-theme";
import {
  LangSwitchProps,
  LogOutProps,
  ThemeSwitchProps,
} from "@/shared/types/props";
import { AccordionHorizontal } from "./accordion-horizontal";

type UserButtonProps = {
  className?: string;
  LangSwitch: ({ className }: LangSwitchProps) => JSX.Element;
  ThemeSwitch: ({ className }: ThemeSwitchProps) => JSX.Element;
  LogOut: ({ className }: LogOutProps) => JSX.Element;
};

export const UserButton = ({
  LangSwitch,
  ThemeSwitch,
  LogOut,
}: UserButtonProps) => {
  useInitDictionary();

  const { language: lang } = useDictionaryStore();

  useInitFontFamily(lang);
  useInitTheme();

  return (
    // <DropdownMenu>
    //   <DropdownMenuTrigger className="rounded-full">
    //     <Avatar className="shadow-xl transition-all hover:scale-105">
    //       <AvatarImage
    //         src={user?.image ? user.image : "https://github.com/shadcn.png"}
    //       />
    //       <AvatarFallback>CN</AvatarFallback>
    //     </Avatar>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent
    //     className="dark:second-gradient-white second-gradient-dark flex space-x-3 border-none"
    //     align="end"
    //   >
    //     <div className="flex justify-evenly">
    //       <LangSwitch className="md:h-[3rem] md:w-[3rem] md:px-[16px] md:py-[16px]" />
    //     </div>
    //     <div className="flex justify-evenly">
    //       <ThemeSwitch className="md:h-[3rem] md:w-[3rem] md:px-[16px] md:py-[16px]" />
    //     </div>
    //     <div className="flex justify-evenly">
    //       <LogOut className="md:h-[3rem] md:w-[3rem] md:px-[16px] md:py-[16px]" />
    //     </div>
    //   </DropdownMenuContent>
    // </DropdownMenu>

    <AccordionHorizontal
      LangSwitch={LangSwitch}
      ThemeSwitch={ThemeSwitch}
      LogOut={LogOut}
    />
  );
};
