import { CarouselProfessions } from "@/features/carousel-professions";
import { DataTable, columns } from "@/features/list-sites";
import { getSites } from "@/shared/actions/site/get/get-sites";
import { getProfessionList } from "@/shared/dictionary/api/get-profession-list";
import { auth } from "@/shared/lib/auth/model/auth";
import { Button } from "@/shared/ui/button";
import { ScrollArea } from "@/shared/ui/scroll-area";
import cn from "classnames";
import Link from "next/link";

export default async function ListSites() {
  const userId = await auth();
  const { data } = await getSites();
  const sites = data?.filter((site) => site.userId === userId?.user?.id);

  const professionsList = await getProfessionList();

  return (
    <div className="grid h-full w-full grid-cols-[1fr,1fr] items-center justify-center">
      <div className="container relative flex w-full flex-col items-center justify-center space-y-5 overflow-hidden rounded-lg p-5">
        {sites && sites.length > 0 && (
          <ScrollArea>
            <DataTable columns={columns} data={sites} />
          </ScrollArea>
        )}

        {(!data || data.length === 0) && (
          <>
            <div className="tw2 dark:td2 md:text-[30px]">Ваш перший сайт</div>
            <div className="tw2 dark:td2 text-center md:text-[16px]">
              Ви легко можете створити Ваш сайт прямо зараз!
            </div>
          </>
        )}

        <Button
          className={cn(
            "btnw1 dark:btnd1 p-0 shadow-xl transition-all hover:scale-105 dark:border-none",
          )}
        >
          <Link href="/create-site" className="flex h-full items-center p-3">
            Створити новий сайт
          </Link>
        </Button>
      </div>

      <div className="vertical-mask grid w-full grid-cols-[1fr,1fr] items-center justify-center gap-4">
        <CarouselProfessions
          type="list-sites"
          professionsList={professionsList}
        />
      </div>
    </div>
  );
}
