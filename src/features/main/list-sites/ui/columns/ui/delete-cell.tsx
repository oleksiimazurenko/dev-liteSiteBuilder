"use client";

import { getIdSiteByUrl } from "@/shared/actions/site/get/get-id-site-by-url";
import { deleteSite } from "@/shared/actions/site/set/delete-site";
import { Button } from "@/shared/ui/button";
import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

type DeleteCellProps = {
  value: unknown;
};

const DeleteCell = ({ value }: DeleteCellProps) => {
  const [isPending, startTransition] = useTransition();

  const handleClick = async () => {
    startTransition(async () => {
      if (!value) {
        toast.error(
          "URL is not defined, error in file: src/features/home/ui/columns.tsx",
        );
        return;
      }

      const { data: idSite } = await getIdSiteByUrl(value as string);

      if (!idSite) {
        toast.error(
          "ID Site is not defined, error in file: src/features/home/ui/columns.tsx",
        );
        return;
      }

      const { success } = await deleteSite(idSite);

      success && toast.success("The site was successfully deleted");
      !success &&
        toast.error(
          "The site was not deleted, error in file: src/features/home/ui/columns.tsx",
        );
    });
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Button
        variant="link"
        className="h-auto p-0"
        disabled={isPending as boolean}
        onClick={handleClick}
      >
        <Trash2
          className="h-full w-full !stroke-neutral-500 !p-[10.7px] transition-all hover:!stroke-neutral-600 dark:!stroke-neutral-400 dark:hover:!stroke-neutral-300"
          strokeWidth={1}
          size={20}
        />
      </Button>
    </div>
  );
};

export { DeleteCell };
