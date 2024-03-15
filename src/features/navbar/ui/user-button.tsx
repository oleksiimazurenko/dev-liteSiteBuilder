import {
  LangSwitchProps,
  LogOutProps,
  ThemeSwitchProps,
} from "@/shared/types/props";
import { AccordionHorizontal } from "./accordion-horizontal";
import { useSession } from 'next-auth/react'

type UserButtonProps = {
  LangSwitch: ({ className }: LangSwitchProps) => JSX.Element;
  ThemeSwitch: ({ className }: ThemeSwitchProps) => JSX.Element;
  LogOut: ({ className }: LogOutProps) => JSX.Element;
};

export const UserButton = ({
  LangSwitch,
  ThemeSwitch,
  LogOut,
}: UserButtonProps) => {

  const currentUser = useSession().data?.user?.name

  return (
    <AccordionHorizontal
      LangSwitch={LangSwitch}
      ThemeSwitch={ThemeSwitch}
      LogOut={LogOut}
      currentUser={currentUser}
    />
  );
};
