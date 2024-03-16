import { getSites } from "@/shared/actions/site/get/get-sites";
import { auth } from "@/shared/lib/auth/model/auth";
import Desktop from "./desktop";
import Mobile from "./mobile";

export async function ListSites() {
  const userId = await auth();
  const { data } = await getSites();
  const sites = data?.filter((site) => site.userId === userId?.user?.id);

  return (
    <>
      {sites && sites.length > 0 && (
        <>
          <Desktop />
          <Mobile sites={sites} />
        </>
      )}
    </>
  );
}
