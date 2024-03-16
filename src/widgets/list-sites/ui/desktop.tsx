import { DataTable, columns } from "@/features/list-sites";
import { getSites } from "@/shared/actions/site/get/get-sites";
import { auth } from "@/shared/lib/auth/model/auth";
import { ScrollArea } from "@/shared/ui/scroll-area";

export default async function Desktop() {
  const userId = await auth();
  const { data } = await getSites();
  const sites = data?.filter((site) => site.userId === userId?.user?.id);

  return (
    <>
      {sites && sites.length > 0 && (
        <ScrollArea className="hidden md:block">
          <DataTable columns={columns} data={sites} />
        </ScrollArea>
      )}
    </>
  );
}
