import { LangSwitch } from "@/features/main/lang-switch";
import { ThemeSwitch } from "@/features/main/theme-switch";
import UserSettingDesktop from "./user-setting-desktop";
import { UserSettingMobile } from "./user-setting-mobile";

type UserSettingProps = {
  children?: React.ReactNode;
};

export function UserSetting({ children }: UserSettingProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-3 overflow-hidden rounded-2xl bg-background/95 p-4 shadow-xl backdrop-blur transition-all supports-[backdrop-filter]:bg-background/10">
      <div className="flex items-center justify-center space-x-2 md:hidden">
        <LangSwitch className="  dark:  h-[40px] w-[40px] rounded-full " />
        <ThemeSwitch className="  dark:  h-[40px] w-[40px] rounded-full p-0 " />
      </div>

      <UserSettingMobile className="md:hidden" />
      <UserSettingDesktop className="hidden md:flex" />
    </div>
  );
}
