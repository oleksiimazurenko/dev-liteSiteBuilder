import { getSites } from "@/shared/actions/site/get/get-sites";
import { auth } from "@/shared/lib/auth/model/auth";
import { Button } from "@/shared/ui/button";
import { ListSites } from "@/widgets/main/list-sites";
import cn from "classnames";
import { MoveDown } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  const userId = await auth();
  const { data } = await getSites();
  const sites = data?.filter((site) => site.userId === userId?.user?.id);

  return (
    <div
      className={cn("py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]")}
    >
      <div
        className={cn(
          "flex flex-col items-center justify-center space-y-5",
          {},
        )}
      >
        <ListSites />

        {(!sites || sites.length === 0) && (
          <>
            <div className="text-primary md:text-[30px]">
              Ваш перший сайт
            </div>
            <div className="text-primary text-center md:text-[16px]">
              Ви легко можете створити Ваш сайт прямо зараз!
            </div>
            <MoveDown strokeWidth={0.75} className="mt-10 svg-icon-stroke" />
          </>
        )}

        <Button
          variant="link"
          className={cn("hidden h-auto p-0 text-neutral-400 md:block")}
        >
          <Link
            href="/app/editor/create-site"
            className="text-primary flex items-center justify-center"
          >
            Створити новий сайт
          </Link>
        </Button>
      </div>
    </div>
  );
}
