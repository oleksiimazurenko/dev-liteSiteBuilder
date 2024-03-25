import DimensionsIcon from "@/features/editor/drawer-tools/svg/dimensions-icon.svg";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Arrow } from "@radix-ui/react-popover";

type WidthToolProps = {
  editableElement: HTMLElement | Element | undefined | null;
};

export function WidthTool({ editableElement }: WidthToolProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="toggle-popover" aria-label="Width">
          <DimensionsIcon className="svg-icon-fill" />
        </button>
      </PopoverTrigger>

      <PopoverContent className="text-primary bg-glass flex flex-col items-center justify-around border-none">
        <Arrow
          width={100}
          height={5}
          className="fill-neutral-200/50 dark:fill-neutral-800/50"
        />
      </PopoverContent>
    </Popover>
  );
}
