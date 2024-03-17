import { auth } from "@/shared/lib/auth/model/auth";
import { SessionProvider } from "@/shared/providers/session-provider/session-provider";
import "@/shared/styles/globals.css";
import { Toaster } from "@/shared/ui/sonner";
import { Footer } from "@/widgets/main/footer";
import { Header } from "@/widgets/main/header";
import cn from "classnames";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Landee",
  description: "",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <html lang="en">
        <body className={cn("m-auto max-w-[2400px] third-gradient-white dark:third-gradient-dark")}>
          <Header />
          <main className=''>{children}</main>
          <Footer />
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  );
}
