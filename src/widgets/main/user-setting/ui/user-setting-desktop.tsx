"use client";

import { UserInfo } from "@/features/main/auth";
import { useCurrentUser } from "@/shared/lib/auth/hooks/use-current-user";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import cn from "classnames";
import SettingForm from "./setting-form";

type UserSettingDesktopProps = {
  className?: string;
};

export default function UserSettingDesktop({
  className,
}: UserSettingDesktopProps) {
  const user = useCurrentUser();

  return (
    <ScrollArea
      className={cn("flex flex-col space-y-5", {
        [className as string]: className,
      })}
    >
      <UserInfo user={user} />
      <SettingForm />
    </ScrollArea>
  );
}
