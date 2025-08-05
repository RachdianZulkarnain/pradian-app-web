"use client";

import { DataTable } from "@/components/data-table";
import { useState } from "react";
import { useGetTickets } from "./_hooks/useGetTickets";
import { columns } from "./columns";
import PaginationSection from "@/components/PaginationSection";

export default function TicketPage() {
  const [page, setPage] = useState(1);
  const take = 10;

  const { data, isLoading, isError } = useGetTickets({
    page,
    take,
  });

  if (isLoading) return <p>Loading tickets...</p>;
  if (isError || !data || !data.meta) return <p>Failed to load tickets</p>;

  return (
    <div className="space-y-4 p-6">
      <h1 className="text-2xl font-bold">Tickets</h1>

      <DataTable columns={columns} data={data.data} />

      {/* ✅ Use custom pagination component */}
      <PaginationSection meta={data.meta} setPage={setPage} />
    </div>
  );
}
