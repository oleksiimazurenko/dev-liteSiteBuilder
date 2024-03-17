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
}

const CheckUrlCell = ({ value }: CheckUrlCellProps ) => {

  const isRegisteredDomain = false;

  return (
    <ScrollArea>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <p
              className={cn(
                "rounded-md px-[10px] py-[3px] text-xs font-semibold text-foreground text-center",
                {
                  ["bg-green-300/50"]: isRegisteredDomain,
                  ["bg-red-300/50"]: !isRegisteredDomain,
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
