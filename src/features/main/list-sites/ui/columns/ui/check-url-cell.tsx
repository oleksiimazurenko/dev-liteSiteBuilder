import { Badge } from "@/shared/ui/badge";

type CheckUrlCellProps = {
  value: unknown;
};

const CheckUrlCell = ({ value }: CheckUrlCellProps) => {
  const isRegisteredDomain = false;

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Badge
        variant="outline"
        className="bg-background/95 supports-[backdrop-filter]:bg-background/10 rounded-md border-none font-[200] text-neutral-500 backdrop-blur transition-all dark:text-neutral-400"
      >
        {value as string}
      </Badge>
    </div>
  );
};

export { CheckUrlCell };
