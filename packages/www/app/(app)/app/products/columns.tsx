"use client";

import { ColumnDef } from "@tanstack/react-table";
import { title } from "radash";

export const columns: ColumnDef<unknown>[] = [
  {
    accessorKey: "name",
    header: "Feature",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "quota",
    header: "Quota",
  },
  {
    accessorKey: "resetPeriod",
    header: "Reset Period",
    cell: ({ row }) => {
      return title(row.getValue("resetPeriod"));
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
  },
];
