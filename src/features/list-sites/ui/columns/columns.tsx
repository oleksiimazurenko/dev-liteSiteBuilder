"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CheckUrlCell } from "./ui/check-url-cell";
import { DeleteCell } from "./ui/delete-cell";
import { SwitchCell } from "./ui/switch-cell";
import { ViewCell } from './ui/view-cell'
import { ViewsCell } from './ui/views-cell'
import { NameCell } from './ui/name-cell'

export type Site = {
  id: string;
  status?: boolean | null;
  name: string;
  views?: number | null;
  url?: string | null;
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
    cell: (info) => <NameCell value={info.getValue()} />,
  },
  {
    accessorKey: "url",
    header: "URL",
    cell: (info) => <CheckUrlCell value={info.getValue()} />,
  },
  {
    accessorKey: "views",
    header: "Views",
    cell: (info) => <ViewsCell value={info.getValue()} />,
  },
  {
    accessorKey: "view",
    header: "View",
    cell: (info) => <ViewCell value={info.getValue()} />,
  },
  {
    accessorKey: "trash",
    header: "Trash",
    cell: (info) => <DeleteCell value={info.getValue()} />,
  },
];
