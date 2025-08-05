"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { useUpdateEventStatus } from "./_hooks/useUpdateEventStatus";

export type EventRow = {
  id: number;
  thumbnail?: string | null;
  title: string;
  status: "ACTIVE" | "DRAFT";
  location: string;
  startDate: string; 
  endDate: string; 
};

export const columns: ColumnDef<EventRow>[] = [
  {
    accessorKey: "thumbnail",
    header: "Thumbnail",
    cell: ({ row }) => {
      const src = row.getValue("thumbnail") as string | null;
      return src ? (
        <Image
          src={src}
          alt="Thumbnail"
          width={64}
          height={40}
          className="rounded-md object-cover"
        />
      ) : (
        <div className="text-sm text-gray-400 italic">No Image</div>
      );
    },
    enableSorting: false,
  },
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const initialStatus = row.getValue("status") as "ACTIVE" | "DRAFT";
      const [status, setStatus] = useState<"ACTIVE" | "DRAFT">(initialStatus);
      const { mutate } = useUpdateEventStatus();

      const statusColor =
        status === "ACTIVE" ? "text-green-600" : "text-gray-500";

      const handleStatusChange = (newStatus: "ACTIVE" | "DRAFT") => {
        setStatus(newStatus);
        mutate({
          eventId: row.original.id,
          status: newStatus.toUpperCase() as "ACTIVE" | "DRAFT",
        });

      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={`capitalize ${statusColor}`}
            >
              {status}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {["Active", "Draft"].map((option) => (
              <DropdownMenuItem
                key={option}
                onClick={() => handleStatusChange(option as "ACTIVE" | "DRAFT")}
              >
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => {
      const value = row.getValue("startDate");
      return <span>{format(new Date(value as string), "dd MMM yyyy")}</span>;
    },
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => {
      const value = row.getValue("endDate");
      return <span>{format(new Date(value as string), "dd MMM yyyy")}</span>;
    },
  },
];
