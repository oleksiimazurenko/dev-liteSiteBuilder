import { Badge } from "@/shared/ui/badge";
import { CellContext } from "@tanstack/react-table";

type NameCellProps = {
  value: unknown;
}

const NameCell = ({ value }: NameCellProps) => {
  // const cellValue = info.row.original.name;

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Badge variant="outline" className="rounded-md bg-neutral-200 dark:text-black">
        {value as string}
      </Badge>
    </div>
  );
};

export { NameCell };
