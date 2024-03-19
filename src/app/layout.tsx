import { SessionProvider } from "@/shared/providers/session-provider/session-provider";
import "@/shared/styles/globals.css";
import { Toaster } from "@/shared/ui/sonner";
import { Footer } from "@/widgets/main/footer";
import { Header } from "@/widgets/main/header";
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
        <body className="m-auto max-w-[2400px]">
          <div className="third-gradient-white dark:third-gradient-dark">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>

          <Toaster />
        </body>
      </html>
    </SessionProvider>
  );
}
