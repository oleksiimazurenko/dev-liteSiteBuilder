import { LogoIcon } from "@/entities/logo-icon";
import { GeneralPanel } from "@/features/auth";
import { GeneralPreview } from "@/features/general-preview";
import { LangSwitch } from "@/features/lang-switch";
import { ThemeSwitch } from '@/features/theme-switch'
import { auth } from "@/shared/lib/auth/model/auth";

export default async function Home() {
  const session = await auth();

  // if (session) redirect('/list-sites') // Когда сделаю точку выхода и входа в систему, то здесь будет редирект на страницу списка сайтов

  return (
    <div className="sm:items-baselin bg-color-w1 dark:bg-color-d1 relative grid min-h-screen w-screen min-w-[300px] grid-cols-[1fr] grid-rows-[6fr_1fr] justify-center p-[20px] sm:grid-cols-[1fr] md:grid-cols-[1fr_2fr] md:grid-rows-1">
      <GeneralPanel LangSwitch={LangSwitch} ThemeSwitch={ThemeSwitch}/>

      <GeneralPreview className="order-1 grid h-full grid-cols-10 gap-x-5 sm:order-1 md:order-2" />

      <LogoIcon className="absolute bottom-2 right-4 hidden text-lg text-neutral-500 opacity-30 sm:block" />
    </div>
  );
}
