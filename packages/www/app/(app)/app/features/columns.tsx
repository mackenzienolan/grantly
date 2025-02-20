"use client";

import { ColumnDef } from "@tanstack/react-table";
import { GetFeaturesResponse } from "./data";

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
    accessorKey: "reset_period",
    header: "Reset Period",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
  },
  {
    accessorKey: "updated_at",
    header: "Updated At",
  },
];
