"use client";

import { ColumnDef } from "@tanstack/react-table";
import { title } from "radash";
import { GetFeaturesResponse } from "./data";
import { DateTime } from "luxon";

export const columns: ColumnDef<GetFeaturesResponse[number]>[] = [
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
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => {
      return (
        <span suppressHydrationWarning>
          {DateTime.fromISO(row.getValue("updatedAt")).toLocaleString(
            DateTime.DATE_SHORT
          )}
        </span>
      );
    },
  },
];
