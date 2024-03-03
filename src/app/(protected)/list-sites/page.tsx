import { DataTable, columns } from "@/features/list-sites";
import { getSites } from "@/shared/actions/site/get/get-sites";
import { Button } from "@/shared/ui/button";
import { ScrollArea } from "@/shared/ui/scroll-area";

export default async function Page() {
  const { data } = await getSites();


  return (
    <div className="container flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg p-5">
      {data && data?.length > 0 && (
        <ScrollArea>
          <DataTable columns={columns} data={data} />
        </ScrollArea>
      )}
      {(!data || data.length === 0) && (
        <div className="space-x-2">
          <Button
            variant="link"
            className="tw2 dark:td2 m-auto h-5 p-0 font-normal"
            size="sm"
          >
            Создать новый сайт
          </Button>

          {false && <Button>Выбрать шаблон</Button>}
        </div>
      )}
    </div>
  );
}
