import { DataTable, columns } from "@/features/list-sites";
import { getSites } from "@/shared/actions/site/get/get-sites";
import { Button } from '@/shared/ui/button'
import { ScrollArea } from "@/shared/ui/scroll-area";
import cn from "classnames";
import Link from 'next/link'

export default async function ListSites() {
  const { data } = await getSites();

  return (
    <div className="container relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg p-5">

      {data && data?.length > 0 && (
        <ScrollArea>
          <DataTable columns={columns} data={data} />
        </ScrollArea>
      )}

      {(!data || data.length === 0) && (
        <>
          <div className="tw2 dark:td2 md:text-[30px]">Ваш перший сайт</div>
          <div className="tw2 dark:td2 md:text-[16px]">
            Ви легко можете створити Ваш сайт прямо зараз!
          </div>
        </>
      )}

      <Button
        className={cn(
          "btnw1 dark:btnd1 mt-3 shadow-xl transition-all hover:scale-105 dark:border-none",
        )}
      >
        <Link href='/create-site'>Створити новий сайт</Link>
      </Button>
      
    </div>
  );
}
