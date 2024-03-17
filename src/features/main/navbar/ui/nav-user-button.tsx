import {
  LangSwitchProps,
  LogOutProps,
  ThemeSwitchProps,
} from "@/shared/types/props";
import { NavAccordionHorizontal } from "./nav-accordion-horizontal";
import { useSession } from 'next-auth/react'

type NavUserButtonProps = {
  LangSwitch: ({ className }: LangSwitchProps) => JSX.Element;
  ThemeSwitch: ({ className }: ThemeSwitchProps) => JSX.Element;
  LogOut: ({ className }: LogOutProps) => JSX.Element;
};

export const NavUserButton = ({
  LangSwitch,
  ThemeSwitch,
  LogOut,
}: NavUserButtonProps) => {

  const currentUser = useSession().data?.user?.name

  return (
    <NavAccordionHorizontal
      LangSwitch={LangSwitch}
      ThemeSwitch={ThemeSwitch}
      LogOut={LogOut}
      currentUser={currentUser}
    />
  );
};
