import { getSites } from "@/shared/actions/site/get/get-sites";
import { auth } from "@/shared/lib/auth/model/auth";
import cn from "classnames";
import Desktop from "./desktop";
import Mobile from "./mobile";

export async function ListSites() {
  const userId = await auth();
  const { data } = await getSites();
  const sites = data?.filter((site) => site.userId === userId?.user?.id);

  return (
    <>
      {sites && sites.length > 0 && (
        <div
          className={cn(
            "flex-col items-center justify-center bg-transparent rounded-lg overflow-hidden",
            {
              ["space-y-3"]: sites.length > 1,
            },
          )}
        >
          <Desktop />
          <Mobile sites={sites} />
        </div>
      )}
    </>
  );
}
