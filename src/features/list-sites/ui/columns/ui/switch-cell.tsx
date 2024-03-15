import { Switch } from "@/shared/ui/switch";
import { useState } from "react";

type SwitchCellProps = {
  status: unknown;
};

const SwitchCell = ({ status }: SwitchCellProps) => {
  const [checked, setChecked] = useState(status);

  const handleClick = () => setChecked(!checked);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Switch
        className="!border-[0.5px] !border-white !bg-red-300/50 !p-[1.5px] aria-checked:!bg-green-300/50 dark:border-none [&>span]:bg-neutral-100 dark:[&>span]:bg-neutral-700"
        checked={checked as boolean}
        onClick={handleClick}
      />
    </div>
  );
};

export { SwitchCell };
