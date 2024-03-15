import { getIdSiteByUrl } from "@/shared/actions/site/get/get-id-site-by-url";
import { deleteSite } from "@/shared/actions/site/set/delete-site";
import { Button } from "@/shared/ui/button";
import { CellContext } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

export type Site = {
  id: string;
  status?: boolean | null;
  name: string;
  views?: number | null;
  url?: string | null;
};

const DeleteCell = ({ info }: { info: CellContext<Site, unknown> }) => {
  const url = info.row.original.url;
  const [isPending, startTransition] = useTransition();

  const handleClick = async () => {
    startTransition(async () => {
      if (!url) {
        toast.error(
          "URL is not defined, error in file: src/features/list-sites/ui/columns.tsx",
        );
        return;
      }

      const { data: idSite } = await getIdSiteByUrl(url);

      if (!idSite) {
        toast.error(
          "ID Site is not defined, error in file: src/features/list-sites/ui/columns.tsx",
        );
        return;
      }

      const { success } = await deleteSite(idSite);

      success && toast.success("The site was successfully deleted");
      !success &&
        toast.error(
          "The site was not deleted, error in file: src/features/list-sites/ui/columns.tsx",
        );
    });
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Button
        className="button-white dark:button-dark shadow-xl transition-all hover:scale-105 dark:border-none h-auto p-1"
        disabled={isPending as boolean}
        onClick={handleClick}
      >
        <Trash2 strokeWidth={1} size={20} />
      </Button>
    </div>
  );
};

export { DeleteCell };
