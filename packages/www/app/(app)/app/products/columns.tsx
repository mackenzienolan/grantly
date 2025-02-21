"use client";

import { ColumnDef } from "@tanstack/react-table";
import { title } from "radash";
import { GetProductsResponse } from "./data";
export const columns: ColumnDef<GetProductsResponse[number]>[] = [
  {
    accessorKey: "name",
    header: "Product",
  },
  {
    accessorKey: "externalId",
    header: "External ID",
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
