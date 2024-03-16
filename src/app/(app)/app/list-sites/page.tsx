import { getSites } from "@/shared/actions/site/get/get-sites";
import { auth } from "@/shared/lib/auth/model/auth";
import { Button } from "@/shared/ui/button";
import { ListSites } from "@/widgets/list-sites";
import cn from "classnames";
import { MoveDown } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  const userId = await auth();
  const { data } = await getSites();
  const sites = data?.filter((site) => site.userId === userId?.user?.id);

  return (
    <div className={cn("flex h-full w-full overflow-y-scroll", {})}>
      <div className="container relative m-auto flex w-full flex-col items-center justify-center space-y-5 overflow-hidden rounded-lg p-9 md:p-5">
        <ListSites />

        {(!sites || sites.length === 0) && (
          <>
            <div className="text-white-2 dark:text-dark-2 md:text-[30px]">
              Ваш перший сайт
            </div>
            <div className="text-white-2 dark:text-dark-2 text-center md:text-[16px]">
              Ви легко можете створити Ваш сайт прямо зараз!
            </div>
            <MoveDown strokeWidth={0.75} className="mt-10" />
          </>
        )}

        <Button
          variant="link"
          className={cn("hidden h-auto p-0 text-neutral-400 md:block")}
        >
          <Link href="/app/create-site" className="">
            Створити новий сайт
          </Link>
        </Button>
      </div>
    </div>
  );
}
