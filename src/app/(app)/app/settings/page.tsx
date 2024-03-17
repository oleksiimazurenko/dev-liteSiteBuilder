"use client";

import { LangSwitch } from "@/features/main/lang-switch";
import { ThemeSwitch } from "@/features/main/theme-switch";
import { SettingAccordion } from "@/widgets/main/setting-accordion";
import { ScrollArea } from "@radix-ui/react-scroll-area";

const SettingsPage = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="second-gradient-white dark:second-gradient-dark flex w-[322px] flex-col items-center justify-center space-y-3 overflow-hidden rounded-2xl p-4 shadow-xl transition-all">
        <div className="flex items-center justify-center space-x-2">
          <LangSwitch className="button-white dark:button-dark h-[40px] w-[40px] rounded-full md:hidden " />
          <ThemeSwitch className="button-white dark:button-dark h-[40px] w-[40px] rounded-full p-0 md:hidden " />
        </div>

        <SettingAccordion className="md:hidden" />
        <ScrollArea className=""></ScrollArea>
      </div>
    </div>
  );
};

export default SettingsPage;
