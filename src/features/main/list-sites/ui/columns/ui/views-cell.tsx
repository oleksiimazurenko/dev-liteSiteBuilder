import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { CellContext } from "@tanstack/react-table";
import { usePathname, useRouter } from "next/navigation";

type ViewsCellProps = {
  value: unknown;
};

const ViewsCell = ({ value }: ViewsCellProps) => {
  return (
    <div className="flex h-full items-center justify-center">
      <Badge
        variant="outline"
        className="rounded-md bg-neutral-200 dark:text-black"
      >
        {value as string}
      </Badge>
    </div>
  );
};

export { ViewsCell };
