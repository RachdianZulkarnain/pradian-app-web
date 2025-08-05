"use client";

import { useState } from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { useGetTickets } from "./_hooks/useGetTickets";

export default function TicketPage() {
  const [page, setPage] = useState(1);
  const take = 10;

  const { data, isLoading, isError } = useGetTickets({ page, take });

  if (isLoading) return <p>Loading tickets...</p>;
  if (isError || !data) return <p>Failed to load tickets</p>;

  const totalPages = Math.ceil(data.meta.total / take);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Tickets</h1>
      <DataTable columns={columns} data={data.data} />

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {data.meta.page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
