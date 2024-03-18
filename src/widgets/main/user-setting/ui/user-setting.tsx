import { LangSwitch } from "@/features/main/lang-switch";
import { ThemeSwitch } from "@/features/main/theme-switch";
import UserSettingDesktop from "./user-setting-desktop";
import { UserSettingMobile } from "./user-setting-mobile";

export function UserSetting() {
  return (
    <div className="flex flex-col items-center justify-center space-y-3 overflow-hidden rounded-2xl bg-background/95 p-4 shadow-xl backdrop-blur transition-all supports-[backdrop-filter]:bg-background/10">
      <div className="flex items-center justify-center space-x-2 md:hidden">
        <LangSwitch className="button-white dark:button-dark h-[40px] w-[40px] rounded-full " />
        <ThemeSwitch className="button-white dark:button-dark h-[40px] w-[40px] rounded-full p-0 " />
      </div>

      <UserSettingMobile className="md:hidden" />
      <UserSettingDesktop className="hidden md:flex" />
    </div>
  );
}

{/* <div
  className={cn("", {
    ["container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10"]:
      isSite,
    ["grid-cols-1"]: !isSite,
  })}
>
  <SidePanel menuItems={sideBarData.homeEditor} />

  <div
    className={cn("relative  lg:gap-10  xl:grid xl:grid-cols-[1fr_300px]", {
      ["py-6 lg:py-8"]: isSite,
    })}
  >
    {children}
  </div>
</div>; */}
