// columns.tsx
"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";
import * as Yup from "yup";
import { InferType } from "yup";

// Yup schema for a transaction row
const transactionSchema = Yup.object({
  eventName: Yup.string().required(),
  Email: Yup.string().email().required(),
  quantity: Yup.number().required().min(1),
  totalTicketPrice: Yup.number().required().min(0),
  voucherUsed: Yup.string().nullable(),
  pointsUsed: Yup.number().nullable().min(0),
  finalPrice: Yup.number().required().min(0),
  status: Yup.mixed<TransactionStatus>().oneOf([
    "WAITING_FOR_PAYMENT",
    "WAITING_FOR_CONFIRMATION",
    "PAID",
    "REJECT",
    "EXPIRED",
  ]),
});

type TransactionStatus =
  | "WAITING_FOR_PAYMENT"
  | "WAITING_FOR_CONFIRMATION"
  | "PAID"
  | "REJECT"
  | "EXPIRED";

// Infer the type from Yup schema
export type TransactionRow = InferType<typeof transactionSchema>;

export const columns: ColumnDef<TransactionRow>[] = [
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
    accessorKey: "eventName",
    header: "Event Name",
  },
  {
    accessorKey: "Email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: "Qty",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("quantity")}</div>
    ),
  },
  {
    accessorKey: "totalTicketPrice",
    header: "Total Price (Before Discount)",
    cell: ({ row }) => {
      const value = row.getValue("totalTicketPrice") as number;
      return <div className="text-middle">Rp {value.toLocaleString()}</div>;
    },
  },
  {
    accessorKey: "voucherUsed",
    header: "Voucher",
    cell: ({ row }) => row.getValue("voucherUsed") || "-",
  },
  {
    accessorKey: "pointsUsed",
    header: "Points Used",
    cell: ({ row }) => {
      const points = row.getValue("pointsUsed") as number | null;
      return points ? `${points} pts` : "-";
    },
  },
  {
    accessorKey: "finalPrice",
    header: "Final Price",
    cell: ({ row }) => {
      const value = row.getValue("finalPrice") as number;
      return (
        <div className="text-right font-medium text-green-600">
          Rp {value.toLocaleString()}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as TransactionStatus;
      const statusColor =
        {
          WAITING_FOR_PAYMENT: "text-yellow-600",
          WAITING_FOR_CONFIRMATION: "text-orange-600",
          PAID: "text-green-600",
          REJECT: "text-red-600",
          EXPIRED: "text-gray-400",
        }[status] || "text-black";

      return (
        <span className={`font-semibold capitalize ${statusColor}`}>
          {status.replace(/_/g, " ")}
        </span>
      );
    },
  },
];
