"use client";

import { useState } from "react";
import { attendeeColumns } from "./columns"; // your AttendeeColumnDef
import useGetAttendees from "./_hooks/useGetAttendees";
import { DataTable } from "@/components/data-table";
import PaginationSection from "@/components/PaginationSection";

const AttendeesPage = () => {
  const [page, setPage] = useState(1);
  const take = 10;

  const { data, isLoading, isError } = useGetAttendees({ page, take });

  if (isLoading) return <p>Loading attendees...</p>;
  if (isError || !data || !data.meta) return <p>Failed to load attendees</p>;

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold">Attendees</h1>

      <DataTable columns={attendeeColumns} data={data.data} />

      <PaginationSection meta={data.meta} setPage={setPage} />
    </div>
  );
};

export default AttendeesPage;
