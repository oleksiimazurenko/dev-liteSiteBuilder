"use client";

import { LoginForm } from "./forms/login-form";
import { LangSwitch } from "@/features/main/lang-switch";
import { ThemeSwitch } from "@/features/main/theme-switch";
import { useOutsideClick } from "@/shared/hooks/use-outside-click";
import { useState } from "react";

type LoginPanelProps = {};

export function LoginPanel({}: LoginPanelProps) {
  const [valueAccordion, setValueAccordion] = useState("");

  useOutsideClick(
    !!valueAccordion,
    () => {
      setValueAccordion("");
    },
    ["[data-login-panel]"],
  );

  return (
    <div data-login-panel>
      <LoginForm
        valueAccordion={valueAccordion}
        setValueAccordion={setValueAccordion}
        LangSwitch={LangSwitch}
        ThemeSwitch={ThemeSwitch}
      />
    </div>
  );
}
