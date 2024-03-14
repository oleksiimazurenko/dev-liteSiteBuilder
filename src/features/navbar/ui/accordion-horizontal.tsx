"use client";

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

type AccordionHorizontalProps = {
  LangSwitch: ({ className }: LangSwitchProps) => JSX.Element;
  ThemeSwitch: ({ className }: ThemeSwitchProps) => JSX.Element;
  LogOut: ({ className }: LogOutProps) => JSX.Element;
};

export function AccordionHorizontal({
  LangSwitch,
  ThemeSwitch,
  LogOut,
}: AccordionHorizontalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useOutsideClick(
    ref,
    () => {
      setIsOpen(false);
    },
    "[data-accordion-wrapper]",
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
      <Button
        className="cursor-pointer rounded-full p-0"
        onClick={onHandleClick}
      >
        <Avatar className="shadow-xl transition-all hover:scale-105">
          <AvatarImage
            src={user?.image ? user.image : "https://github.com/shadcn.png"}
          />
          <AvatarFallback>CN</AvatarFallback>
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
          <div className="flex justify-evenly">
            <LangSwitch className="button-white dark:button-dark rounded-full md:h-[40px] md:w-[40px] " />
          </div>
          <div className="flex justify-evenly">
            <ThemeSwitch className="button-white dark:button-dark rounded-full md:h-[40px] md:w-[40px]" />
          </div>
          <div className="flex justify-evenly">
            <LogOut className="button-white dark:button-dark rounded-full md:h-[40px] md:w-[40px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
