// app/(dashboard)/tickets/columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export type TicketRow = {
  id: number;
  title: string;
  price: number;
  stock: number;
  description: string;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
};

export const columns: ColumnDef<TicketRow>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Title
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const value = row.getValue("price") as number;
      return `Rp ${value.toLocaleString()}`;
    },
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => (
      <span className="text-center">{row.getValue("stock")}</span>
    ),
  },
  {
    accessorKey: "totalPrice",
    header: "Total Sales",
    cell: ({ row }) => {
      const value = row.getValue("totalPrice") as number;
      return `Rp ${value.toLocaleString()}`;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <span className="text-muted-foreground line-clamp-2 max-w-xs">
        {row.getValue("description")}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const value = row.getValue("createdAt") as string;
      return <span>{format(new Date(value), "dd MMM yyyy")}</span>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated",
    cell: ({ row }) => {
      const value = row.getValue("updatedAt") as string;
      return <span>{format(new Date(value), "dd MMM yyyy")}</span>;
    },
  },
];
