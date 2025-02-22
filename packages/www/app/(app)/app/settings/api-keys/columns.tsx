"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DateTime } from "luxon";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { DataItem } from "./models";

export const columns: ColumnDef<DataItem>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
          {row.getValue("key") ?? "*****************************"}{" "}
          {row.getValue("key") ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                navigator.clipboard.writeText(row.getValue("key"));
                toast.success("Key copied to clipboard");
              }}
            >
              <Copy className="size-4" />
            </Button>
          ) : null}
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
