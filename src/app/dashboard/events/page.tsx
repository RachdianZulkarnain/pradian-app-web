"use client";

import { DataTable } from "@/components/data-table";
import PaginationSection from "@/components/PaginationSection";
import { useState } from "react";
import { useGetEvents } from "./_hooks/useGetEvents";
import { columns } from "./columns";

const MyEventsPage = () => {
  const [page, setPage] = useState(1);
  const take = 10;

  const { data, isLoading, isError } = useGetEvents({ page, take });

  if (isLoading) return <p>Loading events...</p>;
  if (isError || !data || !data.meta) return <p>Failed to load events</p>;

  return (
    <div className="y-4 p-6">
      <h1 className="mb-4 text-2xl font-bold">My Events</h1>

      <DataTable columns={columns} data={data.data} />

      <PaginationSection meta={data.meta} setPage={setPage} />
    </div>
  );
};

export default MyEventsPage;
