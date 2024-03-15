import { DataTable, columns } from "@/features/list-sites";
import { getSites } from "@/shared/actions/site/get/get-sites";
import { auth } from "@/shared/lib/auth/model/auth";
import { Button } from "@/shared/ui/button";
import { ScrollArea } from "@/shared/ui/scroll-area";
import cn from "classnames";
import Link from "next/link";

export default async function ListSites() {
  const userId = await auth();
  const { data } = await getSites();
  const sites = data?.filter((site) => site.userId === userId?.user?.id);

  return (
    <div className="flex h-full w-full overflow-y-scroll">
      <div className="container relative m-auto flex w-full flex-col items-center justify-center space-y-5 overflow-hidden rounded-lg p-5">
        {sites && sites.length > 0 && (
          <ScrollArea>
            <DataTable columns={columns} data={sites} />
          </ScrollArea>
        )}

        {(!data || data.length === 0) && (
          <>
            <div className="text-white-2 dark:text-dark-2 md:text-[30px]">
              Ваш перший сайт
            </div>
            <div className="text-white-2 dark:text-dark-2 text-center md:text-[16px]">
              Ви легко можете створити Ваш сайт прямо зараз!
            </div>
          </>
        )}

        <Button variant="link" className={cn("p-0 h-auto")}>
          <Link
            href="/app/create-site"
            className=""
          >
            Створити новий сайт
          </Link>
        </Button>
      </div>
    </div>
  );
}
