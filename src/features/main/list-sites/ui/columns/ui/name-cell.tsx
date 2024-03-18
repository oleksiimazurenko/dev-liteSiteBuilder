import { Badge } from "@/shared/ui/badge";
import { CellContext } from "@tanstack/react-table";

type NameCellProps = {
  value: unknown;
}

const NameCell = ({ value }: NameCellProps) => {
  // const cellValue = info.row.original.name;

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Badge variant="outline" className="rounded-md bg-background/95 font-[200] text-neutral-500 backdrop-blur transition-all border-none supports-[backdrop-filter]:bg-background/10 dark:text-neutral-400">
        {value as string}
      </Badge>
    </div>
  );
};

export { NameCell };
