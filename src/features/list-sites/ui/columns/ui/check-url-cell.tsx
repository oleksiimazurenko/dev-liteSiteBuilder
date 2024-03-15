import { ScrollArea, ScrollBar } from "@/shared/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui/tooltip";
import { CellContext } from "@tanstack/react-table";
import cn from "classnames";

export type Site = {
  id: string;
  status?: boolean | null;
  name: string;
  views?: number | null;
  url?: string | null;
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
              className={cn(
                "rounded-md px-[10px] py-[3px] text-xs font-semibold text-foreground",
                {
                  ["bg-green-300/50"]: isRegisteredDomain,
                  ["bg-red-300/50"]: !isRegisteredDomain,
                },
              )}
            >
              {cellValue}
            </p>
          </TooltipTrigger>
          <TooltipContent>
            <p className="">
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

export { CheckUrlCell };
