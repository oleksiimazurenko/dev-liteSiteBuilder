"use client";

import { LangSwitch } from "@/features/lang-switch";
import { ThemeSwitch } from "@/features/theme-switch";
import { SettingAccordion } from "@/widgets/setting-accordion";
import { ScrollArea } from "@radix-ui/react-scroll-area";

const SettingsPage = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="second-gradient-white dark:second-gradient-dark flex flex-col items-center justify-center space-y-3 overflow-hidden rounded-2xl p-4 shadow-xl transition-all w-[322px]">
        <div className="flex items-center justify-center space-x-2">
          <LangSwitch className="button-white dark:button-dark h-[40px] w-[40px] rounded-full md:hidden " />
          <ThemeSwitch className="button-white dark:button-dark h-[40px] w-[40px] rounded-full p-0 md:hidden " />
        </div>

        <SettingAccordion className="md:hidden" />
        <ScrollArea className="">
          
        </ScrollArea>
      </div>
    </div>
  );
};

export default SettingsPage;
