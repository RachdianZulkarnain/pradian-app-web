"use client";

import { DataTable } from "@/components/data-table";
import { columns, EventRow } from "./columns";

export default function EventListPage() {
  const data: EventRow[] = [
    {
      thumbnail: null,
      title: "Tech Expo 2025",
      status: "Active",
      location: "Jakarta",
      startDate: "2025-09-01T00:00:00.000Z",
      endDate: "2025-09-03T00:00:00.000Z",
    },
    {
      thumbnail: null,
      title: "Startup Meetup",
      status: "Draft",
      location: "Bandung",
      startDate: "2025-10-10T00:00:00.000Z",
      endDate: "2025-10-11T00:00:00.000Z",
    },
  ];

  return (
    <div className="space-y-4 p-6">
      <h1 className="text-2xl font-bold">My Events</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
