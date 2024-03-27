"use client";

import cn from "classnames";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";

import { UserInfo } from "@/features/main/auth";
import { useCurrentUser } from "@/shared/lib/auth/hooks/use-current-user";
import { Badge } from "@/shared/ui/badge";
import { SettingForm } from "./setting-form";

type UserSettingMobileProps = {
  className?: string;
};

export function UserSettingMobile({ className }: UserSettingMobileProps) {
  const user = useCurrentUser();

  return (
    <Accordion
      type="single"
      collapsible
      className={cn("w-full space-y-3 p-0", {
        [className as string]: className,
      })}
    >
      <AccordionItem
        value="item-1"
        className="flex flex-col items-center justify-center border-none p-0"
      >
        <AccordionTrigger className="rounded-lg border px-1 py-1 text-center text-neutral-500 !no-underline dark:border-neutral-500 dark:text-neutral-950 [&>svg]:ml-2 [&>svg]:stroke-black [&>svg]:dark:stroke-white">
          <Badge
            variant="outline"
            className="rounded-md bg-neutral-200 dark:text-black"
          >
            Info profil
          </Badge>
        </AccordionTrigger>
        <AccordionContent className="mt-[10px]">
          <UserInfo user={user} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        value="item-2"
        className="flex flex-col items-center justify-center border-none p-0"
      >
        <AccordionTrigger className="rounded-lg border px-1 py-1 text-center text-neutral-500 !no-underline dark:border-neutral-500 dark:text-neutral-950 [&>svg]:ml-2 [&>svg]:stroke-black [&>svg]:dark:stroke-white">
          <Badge
            variant="outline"
            className="rounded-md bg-neutral-200 dark:text-black"
          >
            Settings
          </Badge>
        </AccordionTrigger>
        <AccordionContent className="mt-[10px]">
          <SettingForm />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
