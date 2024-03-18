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
        className="rounded-md bg-background/95 font-[200] text-neutral-500 backdrop-blur transition-all border-none supports-[backdrop-filter]:bg-background/10 dark:text-neutral-400"
      >
        {value as string}
      </Badge>
    </div>
  );
};

export { ViewsCell };
