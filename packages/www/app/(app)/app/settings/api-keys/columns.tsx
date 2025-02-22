"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DateTime } from "luxon";
import { ListApiKeysResponse } from "./data";

export const columns: ColumnDef<ListApiKeysResponse[number]>[] = [
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "key",
    header: "Key",
    cell: ({ row }) => {
      return (
        <span suppressHydrationWarning>
          {row.getValue("key") ?? "*****************************"}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      return (
        <span suppressHydrationWarning>
          {DateTime.fromISO(row.getValue("createdAt")).toLocaleString(
            DateTime.DATE_SHORT
          )}
        </span>
      );
    },
  },
];
