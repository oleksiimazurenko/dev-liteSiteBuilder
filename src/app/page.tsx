import { LogoIcon } from "@/entities/logo-icon";
import { GeneralPreview } from "@/features/general-preview";
import { auth } from "@/shared/lib/auth/model/auth";
import { AuthPanel } from "@/widgets/auth-panel";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (session) redirect("/list-sites"); // Когда сделаю точку выхода и входа в систему, то здесь будет редирект на страницу списка сайтов

  return (
    <div className="sm:items-baselin bcw1 dark:bcd1 relative grid min-h-screen w-screen min-w-[300px] grid-cols-[1fr] grid-rows-[6fr_1fr] justify-center p-[20px] sm:grid-cols-[1fr] md:grid-cols-[1fr_2fr] md:grid-rows-1">
      <AuthPanel />

      <GeneralPreview className="order-1 grid h-full grid-cols-10 gap-x-5 sm:order-1 md:order-2" />

      <LogoIcon className="absolute bottom-2 right-4 hidden text-lg opacity-30 sm:block" />
    </div>
  );
}
