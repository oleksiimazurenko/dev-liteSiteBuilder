"use client";

import { useInitDictionary } from "@/shared/hooks/use-init-dictionary";
import { useInitFontFamily } from "@/shared/hooks/use-init-font-family";
import { useInitTheme } from "@/shared/hooks/use-init-theme";
import { useCurrentUser } from "@/shared/lib/auth/hooks/use-current-user";
import { useDictionaryStore } from "@/shared/store/dictionary-store";
import {
  LangSwitchProps,
  LogOutProps,
  ThemeSwitchProps,
} from "@/shared/types/props";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

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
  const user = useCurrentUser();

  useInitDictionary();
  
  const { language: lang } = useDictionaryStore();

  useInitFontFamily(lang);
  useInitTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full">
        <Avatar className="shadow-xl transition-all hover:scale-105">
          <AvatarImage
            src={user?.image ? user.image : "https://github.com/shadcn.png"}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="dark:bcw2 bcd2 flex space-x-3 border-none"
        align="end"
      >
        <div className="flex justify-evenly">
          <LangSwitch className="md:h-[3rem] md:w-[3rem] md:px-[16px] md:py-[16px]" />
        </div>
        <div className="flex justify-evenly">
          <ThemeSwitch className="md:h-[3rem] md:w-[3rem] md:px-[16px] md:py-[16px]" />
        </div>
        <div className="flex justify-evenly">
          <LogOut className="md:h-[3rem] md:w-[3rem] md:px-[16px] md:py-[16px]" />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};