"use client";

import { LoginForm, RegisterForm, ResetForm } from "@/features/main/auth";
import { LangSwitch } from "@/features/main/lang-switch";
import { ThemeSwitch } from "@/features/main/theme-switch";
import { useOutsideClick } from "@/shared/hooks/use-outside-click";
import { GeneralPanelOptions } from "@/shared/types/types";
import { useRef, useState } from "react";

type AuthPanelProps = {};

export function AuthPanel({}: AuthPanelProps) {
  const [generalPanel, setGeneralPanel] =
    useState<GeneralPanelOptions>("login");
  const [valueAccordion, setValueAccordion] = useState("");

  useOutsideClick(
    !!valueAccordion,
    () => {
      setGeneralPanel("login");
      setValueAccordion("");
    },
    ["[data-general-panel]"],
  );

  return (
    <div>
      <div data-general-panel>
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
