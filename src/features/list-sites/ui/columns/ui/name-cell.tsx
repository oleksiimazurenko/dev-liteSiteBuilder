import { Badge } from "@/shared/ui/badge";
import { CellContext } from "@tanstack/react-table";

export type Site = {
  id: string;
  status?: boolean | null;
  name: string;
  views?: number | null;
  url?: string | null;
};

const NameCell = ({ info }: { info: CellContext<Site, unknown> }) => {
  const cellValue = info.row.original.name;

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Badge variant="outline" className="rounded-md bg-neutral-200 dark:text-black">
        {cellValue}
      </Badge>
    </div>
  );
};

export { NameCell };
