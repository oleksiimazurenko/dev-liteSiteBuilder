"use client";

import { LoginForm } from "@/features/auth/ui/forms/login-form";
import { RegisterForm } from "@/features/auth/ui/forms/register-form";
import { useOutsideClick } from "@/shared/hooks/use-outside-click";
import { LangSwitchProps, ThemeSwitchProps } from "@/shared/types/props";
import { GeneralPanelOptions } from "@/shared/types/types";
import { useRef, useState } from "react";
import { ResetForm } from "./forms/reset-form";

type GeneralPanelProps = {
  LangSwitch: ({ className }: LangSwitchProps) => JSX.Element;
  ThemeSwitch: ({ className }: ThemeSwitchProps) => JSX.Element;
};

export function GeneralPanel({ LangSwitch, ThemeSwitch }: GeneralPanelProps) {
  const [generalPanel, setGeneralPanel] =
    useState<GeneralPanelOptions>("login");
  const generalPanelDivRef = useRef<HTMLDivElement | null>(null);
  const [valueAccordion, setValueAccordion] = useState("");

  useOutsideClick(
    generalPanelDivRef,
    () => {
      setGeneralPanel("login");
      setValueAccordion("");
    },
    "[data-general-panel]",
  );

  return (
    <div className='order-2 flex items-center justify-center sm:order-2 sm:self-end md:order-1 h-full'>
      <div
        data-general-panel
        ref={generalPanelDivRef}
        className=""
      >
        {generalPanel === "login" && (
          <LoginForm
            setGeneralPanel={setGeneralPanel}
            valueAccordion={valueAccordion}
            setValueAccordion={setValueAccordion}
            LangSwitch={LangSwitch}
            ThemeSwitch={ThemeSwitch}
          />
        )}
        {generalPanel === "register" && (
          <RegisterForm setGeneralPanel={setGeneralPanel} />
        )}
        {generalPanel === "forgot-password" && (
          <ResetForm setGeneralPanel={setGeneralPanel} />
        )}
      </div>
    </div>
  );
}
