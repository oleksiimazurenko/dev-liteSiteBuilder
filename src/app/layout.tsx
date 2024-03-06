import { LangSwitch } from "@/features/lang-switch";
import { ThemeSwitch } from "@/features/theme-switch";
import { auth } from "@/shared/lib/auth/model/auth";
import { SessionProvider } from "@/shared/providers/session-provider/session-provider";
import cn from "classnames";
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/shared/ui/sonner"
import { ScrollArea } from '@/shared/ui/scroll-area'

export const metadata: Metadata = {
  title: "Landee",
  description: "",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider>
      <html lang="en">
        <body className={cn("max-w-[4400px]")}>
          <main><ScrollArea>{children}</ScrollArea></main>
          {!session && (
            <ThemeSwitch className="hidden md:fixed md:bottom-5 md:left-5 md:flex md:h-[3rem] md:w-[3rem] md:rounded-full md:px-[16px] md:py-[16px]" />
          )}
          {!session && (
            <LangSwitch className="hidden md:fixed md:left-5 md:top-5 md:flex md:h-[3rem] md:w-[3rem] md:rounded-full md:px-[16px] md:py-[16px]" />
          )}
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  );
}
