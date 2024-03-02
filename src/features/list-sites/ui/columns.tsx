"use client";

import { Switch } from "@/shared/ui/switch";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Site = {
  id: string;
  status: boolean;
  name: string;
  views: number;
  email: string;
};

type SwitchCellProps = {
  status: unknown;
};

const SwitchCell = ({ status }: SwitchCellProps) => {
  const [checked, setChecked] = useState(status);

  const handleClick = () => setChecked(!checked);

  return (
    <Switch
      className="dark:bg-color-d2 text-color-w1"
      checked={checked as boolean}
      onClick={handleClick}
    />
  );
};

export const columns: ColumnDef<Site>[] = [
  {
    accessorKey: "status",
    header: () => "Status",
    cell: (info) => <SwitchCell status={info.getValue()} />,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "views",
    header: "Views",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];
