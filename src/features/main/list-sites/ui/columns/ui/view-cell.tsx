import { Button } from "@/shared/ui/button";
import { CellContext } from "@tanstack/react-table";
import { Eye } from 'lucide-react'
import { usePathname, useRouter } from "next/navigation";

type ViewCellProps = {
  value: unknown;
}

const ViewCell = ({ value }: ViewCellProps) => {
  const pathName = usePathname();
  const router = useRouter();

  const handleClick = () => {
    const url = value as string;
    router.push('/' + url);
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Button
        variant='link'
        className="h-auto p-0"
        onClick={handleClick}
      >
        <Eye className='w-full h-full !stroke-neutral-500 transition-all hover:!stroke-neutral-600 dark:!stroke-neutral-400 dark:hover:!stroke-neutral-300 !p-[10.7px]' strokeWidth={1} size={20}/>
      </Button>
    </div>
  );
};

export { ViewCell };