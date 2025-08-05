"use client";

import { ColumnDef } from "@tanstack/react-table";

export type AttendeeRow = {
  id: number;
  user: {
    name: string;
    email: string;
  };
  event: {
    title: string;
  };
  transactionDetail: {
    ticket: {
      title: string;
    };
  }[];
};

export const attendeeColumns: ColumnDef<AttendeeRow>[] = [
  {
    accessorKey: "user.name",
    header: "Name",
    cell: ({ row }) => row.original.user.name,
  },
  {
    accessorKey: "user.email",
    header: "Email",
    cell: ({ row }) => row.original.user.email,
  },
  {
    accessorKey: "event.title",
    header: "Event",
    cell: ({ row }) => row.original.event.title,
  },
  {
    id: "ticket",
    header: "Ticket",
    cell: ({ row }) => {
      const tickets = row.original.transactionDetail.map(
        (detail) => detail.ticket.title
      );

      return (
        <ul className="list-inside list-disc text-sm text-gray-700">
          {tickets.map((ticket, i) => (
            <li key={i}>{ticket}</li>
          ))}
        </ul>
      );
    },
  },
];
