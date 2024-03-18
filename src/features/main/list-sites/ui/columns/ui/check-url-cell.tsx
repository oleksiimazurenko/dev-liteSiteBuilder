import { ScrollArea, ScrollBar } from "@/shared/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui/tooltip";
import { CellContext } from "@tanstack/react-table";
import cn from "classnames";

type CheckUrlCellProps = {
  value: unknown;
};

const CheckUrlCell = ({ value }: CheckUrlCellProps) => {
  const isRegisteredDomain = false;

  return (
    <ScrollArea>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <p
              className={cn(
                "rounded-md px-[10px] py-[2px] text-center text-xs font-[200] text-foreground text-neutral-500 transition-all dark:text-neutral-400",
                {
                  ["bg-green-300/95 backdrop-blur supports-[backdrop-filter]:bg-green-300/20"]:
                    isRegisteredDomain,
                  ["bg-red-300/95 backdrop-blur supports-[backdrop-filter]:bg-red-300/20"]:
                    !isRegisteredDomain,
                },
              )}
            >
              {value as string}
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
