import { Button } from "@/shared/ui/button";
import { CellContext } from "@tanstack/react-table";
import { Eye } from 'lucide-react'
import { usePathname, useRouter } from "next/navigation";

export type Site = {
  id: string;
  status?: boolean | null;
  name: string;
  views?: number | null;
  url?: string | null;
};

const ViewCell = ({ info }: { info: CellContext<Site, unknown> }) => {
  const pathName = usePathname();
  const router = useRouter();

  const handleClick = () => {
    const url = info.row.original.url;
    router.push(`${pathName}/${url}`);
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Button
        className="button-white dark:button-dark h-auto p-1 shadow-xl transition-all hover:scale-105 dark:border-none"
        onClick={handleClick}
      >
        <Eye strokeWidth={1} size={20}/>
      </Button>
    </div>
  );
};

export { ViewCell };
