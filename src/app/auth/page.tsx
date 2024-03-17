import { LogoIcon } from "@/entities/main/logo-icon";
import { auth } from "@/shared/lib/auth/model/auth";
import { AuthPanel } from "@/widgets/main/auth-panel";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (session) redirect("/app/home");

  return (
    <div className="third-gradient-white dark:third-gradient-dark relative grid min-h-screen min-w-[300px] grid-cols-[1fr] grid-rows-[6fr_1fr] items-baseline justify-center p-[20px] md:grid-cols-[1fr_2fr] md:grid-rows-1">
      <AuthPanel />
      <LogoIcon className="absolute bottom-2 right-4 hidden text-lg opacity-30 sm:block" />
    </div>
  );
}
