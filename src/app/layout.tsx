import { LangSwitch } from "@/features/lang-switch";
import { ThemeSwitch } from "@/features/theme-switch";
import { SessionProvider } from "@/shared/providers/session-provider/session-provider";
import cn from "classnames";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Landee",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <html lang="en">
        <body className={cn("max-w-[4400px]")}>
          <main>{children}</main>
          <ThemeSwitch className="hidden md:fixed md:bottom-5 md:left-5 md:flex md:h-[3rem] md:w-[3rem] md:rounded-full md:px-[16px] md:py-[16px]" />
          <LangSwitch className="hidden md:fixed md:left-5 md:top-5 md:flex md:h-[3rem] md:w-[3rem] md:rounded-full md:px-[16px] md:py-[16px]" />
        </body>
      </html>
    </SessionProvider>
  );
}
