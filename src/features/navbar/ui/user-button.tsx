import {
  LangSwitchProps,
  LogOutProps,
  ThemeSwitchProps,
} from "@/shared/types/props";
import { AccordionHorizontal } from "./accordion-horizontal";

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

  return (
    <AccordionHorizontal
      LangSwitch={LangSwitch}
      ThemeSwitch={ThemeSwitch}
      LogOut={LogOut}
    />
  );
};
