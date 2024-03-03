"use client";

import { Button } from "@/shared/ui/button";
import { Switch } from "@/shared/ui/switch";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

export type Site = {
  id: string;
  status: boolean;
  name: string;
  views: number;
  view: boolean;
};

type SwitchCellProps = {
  status: unknown;
};

type ViewCellProps = {
  status: unknown;
};

const SwitchCell = ({ status }: SwitchCellProps) => {
  const [checked, setChecked] = useState(status);

  const handleClick = () => setChecked(!checked);

  return (
    <Switch className="" checked={checked as boolean} onClick={handleClick} />
  );
};

const ViewCell = ({ status }: ViewCellProps) => {
  const [checked, setChecked] = useState(status);

  const handleClick = () => setChecked(!checked);

  return (
    <Button className="" disabled={checked as boolean} onClick={handleClick}>
      View
    </Button>
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
    accessorKey: "view",
    header: "View",
    cell: (info) => <ViewCell status={info.getValue()} />,
  },
];