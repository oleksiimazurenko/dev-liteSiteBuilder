import {
  LangSwitchProps,
  LogOutProps,
  ThemeSwitchProps,
} from "@/shared/types/props";
import { NavAccordionHorizontal } from "./nav-accordion-horizontal";
import { currentUser as getCurrentUser } from '@/shared/lib/auth/actions/get/auth'

type NavUserButtonProps = {
  LangSwitch: ({ className }: LangSwitchProps) => JSX.Element;
  ThemeSwitch: ({ className }: ThemeSwitchProps) => JSX.Element;
  LogOut: ({ className }: LogOutProps) => JSX.Element;
};

export const NavUserButton = async ({
  LangSwitch,
  ThemeSwitch,
  LogOut,
}: NavUserButtonProps) => {

  const currentUser = await getCurrentUser()

  return (
    <NavAccordionHorizontal
      LangSwitch={LangSwitch}
      ThemeSwitch={ThemeSwitch}
      LogOut={LogOut}
      currentUser={currentUser?.name}
    />
  );
};
