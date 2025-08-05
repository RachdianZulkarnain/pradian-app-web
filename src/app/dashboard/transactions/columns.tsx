// columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";
import * as Yup from "yup";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InferType } from "yup";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUpdateTransaction } from "./_hooks/useUpdateTransactions";
import { Toaster } from "@/components/ui/sonner";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Yup schema for a transaction row
const transactionSchema = Yup.object({
  uuid: Yup.string().uuid("Invalid UUID format").required("UUID is required"),
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
  paymentProof: Yup.string().nullable(),
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
  {
    id: "actions",
    cell: ({ row }) => {
      const transaction = row.original;
      const { mutate: updateTransaction, isPending } = useUpdateTransaction();
      const queryClient = useQueryClient();

      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              {/* View Payment Proof */}
              <DialogTrigger asChild>
                <DropdownMenuItem
                  disabled={!transaction.paymentProof}
                  className={!transaction.paymentProof ? "opacity-50" : ""}
                >
                  View Payment Proof
                </DropdownMenuItem>
              </DialogTrigger>

              <DropdownMenuSeparator />

              {/* Accept Payment */}
              <DropdownMenuItem
                disabled={isPending}
                onClick={() =>
                  updateTransaction(
                    { uuid: transaction.uuid, type: "ACCEPT" },
                    {
                      onSuccess: () => {
                        toast.success("Transaction accepted ✅");
                        queryClient.invalidateQueries({
                          queryKey: ["transactions"],
                        });
                      },
                      onError: (error: any) => {
                        toast.error("Failed to accept transaction", {
                          description:
                            error?.response?.data?.message ||
                            "Unexpected error occurred",
                        });
                      },
                    },
                  )
                }
              >
                Accept Payment
              </DropdownMenuItem>

              {/* Reject Payment */}
              <DropdownMenuItem
                disabled={isPending}
                onClick={() =>
                  updateTransaction(
                    { uuid: transaction.uuid, type: "REJECT" },
                    {
                      onSuccess: () => {
                        toast.success("Transaction rejected ❌");
                        queryClient.invalidateQueries({
                          queryKey: ["transactions"],
                        });
                      },
                      onError: (error: any) => {
                        toast.error("Failed to reject transaction", {
                          description:
                            error?.response?.data?.message ||
                            "Unexpected error occurred",
                        });
                      },
                    },
                  )
                }
              >
                Decline Payment
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Payment Proof Dialog */}
          <DialogTitle>
            <DialogContent className="max-w-md">
              {transaction.paymentProof ? (
                <img
                  src={transaction.paymentProof}
                  alt="Payment Proof"
                  className="w-full rounded-lg"
                />
              ) : (
                <p>No payment proof uploaded.</p>
              )}
            </DialogContent>
          </DialogTitle>
        </Dialog>
      );
    },
  },
];
