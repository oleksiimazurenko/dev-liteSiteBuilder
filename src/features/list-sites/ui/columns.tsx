"use client";

import { getIdSiteByUrl } from "@/shared/actions/site/get/get-id-site-by-url";
import { deleteSite } from "@/shared/actions/site/set/delete-site";
import { Button } from "@/shared/ui/button";
import { ScrollArea, ScrollBar } from "@/shared/ui/scroll-area";
import { Switch } from "@/shared/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui/tooltip";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import cn from "classnames";
import { Badge } from "@/shared/ui/badge";

export type Site = {
  id: string;
  status?: boolean | null;
  name: string;
  views?: number | null;
  url?: string | null;
};

type SwitchCellProps = {
  status: unknown;
};

const SwitchCell = ({ status }: SwitchCellProps) => {
  const [checked, setChecked] = useState(status);

  const handleClick = () => setChecked(!checked);

  return (
    <Switch className="" checked={checked as boolean} onClick={handleClick} />
  );
};

const CheckUrlCell = ({ info }: { info: CellContext<Site, unknown> }) => {
  const cellValue = info.row.original.url;

  const isRegisteredDomain = false;

  return (
    <ScrollArea>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <p
              className={cn("hei rounded-2xl px-2 py-0", {
                ["bg-green-300"]: isRegisteredDomain,
                ["bg-red-300"]: !isRegisteredDomain,
              })}
            >
              {cellValue}
            </p>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {isRegisteredDomain
                ? "Ваш домен зареєстрований"
                : "Ваш домен не зареєстрований"}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

const ViewCell = ({ info }: { info: CellContext<Site, unknown> }) => {
  const pathName = usePathname();
  const router = useRouter();

  const handleClick = () => {
    const url = info.row.original.url;
    router.push(`${pathName}/${url}`);
  };

  return (
    <Button
      className="btnw1 dark:btnd1 shadow-xl transition-all hover:scale-105 dark:border-none"
      onClick={handleClick}
    >
      View
    </Button>
  );
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
    <Button
      className="btnw1 dark:btnd1 shadow-xl transition-all hover:scale-105 dark:border-none"
      disabled={isPending as boolean}
      onClick={handleClick}
    >
      <Trash2 strokeWidth={1} />
    </Button>
  );
};

export const columns: ColumnDef<Site>[] = [
  {
    accessorKey: "status",
    header: () => "Status",
    cell: (info) => <SwitchCell status={info.getValue()} />,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "url",
    header: "URL",
    cell: (info) => <CheckUrlCell info={info} />,
  },
  {
    accessorKey: "views",
    header: "Views",
  },
  {
    accessorKey: "view",
    header: "View",
    cell: (info) => <ViewCell info={info} />,
  },
  {
    accessorKey: "trash",
    header: "Trash",
    cell: (info) => <DeleteCell info={info} />,
  },
];
