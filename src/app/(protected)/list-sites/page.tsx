import { DataTable, columns } from "@/features/list-sites";
import { getSites } from "@/shared/actions/site/get/get-sites";
import { Button } from "@/shared/ui/button";

export default async function Page() {
  const { data } = await getSites();

  return (
    <div className="dark:bcd2 bcw2 container overflow-hidden rounded-lg p-5">
      {data && data?.length > 0 && <DataTable columns={columns} data={data} />}
      {(!data || data.length === 0) && (
        <div className="space-x-2">
          <Button>Создать новый сайт</Button>
          <Button>Выбрать шаблон</Button>
        </div>
      )}
    </div>
  );
}
