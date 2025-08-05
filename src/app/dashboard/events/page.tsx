"use client";

import { useState } from "react";
import { columns } from "./columns";
import { useGetEvents } from "./_hooks/useGetEvents";
import { DataTable } from "@/components/data-table";

const MyEventsPage = () => {
  const [page, setPage] = useState(1);
  const take = 10;

  const { data, isLoading, isError } = useGetEvents({ page, take });

  // ✅ Safely wait until data is loaded
  if (isLoading) return <p>Loading events...</p>;
  if (isError || !data || !data.meta) return <p>Failed to load events</p>;

  const totalPages = Math.ceil(data.meta.total / take);

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">My Events</h1>
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
};

export default MyEventsPage;
