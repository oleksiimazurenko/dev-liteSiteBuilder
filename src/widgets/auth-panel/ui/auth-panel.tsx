"use client";

import { LoginForm, RegisterForm, ResetForm } from "@/features/auth";
import { LangSwitch } from "@/features/lang-switch";
import { ThemeSwitch } from "@/features/theme-switch";
import { useOutsideClick } from "@/shared/hooks/use-outside-click";
import { GeneralPanelOptions } from "@/shared/types/types";
import { useRef, useState } from "react";

type AuthPanelProps = {};

export function AuthPanel({}: AuthPanelProps) {
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
    <div className="order-2 flex h-full items-center justify-center sm:order-2 sm:self-end md:order-1">
      <div data-general-panel ref={generalPanelDivRef} className="">
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
