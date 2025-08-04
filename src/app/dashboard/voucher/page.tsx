// app/(dashboard)/vouchers/page.tsx
"use client";

import { DataTable } from "@/components/data-table";
import { columns, VoucherRow } from "./columns";

export default function VoucherPage() {
  // Mock data
  const data: VoucherRow[] = [
    {
      code: "EVENT50",
      value: 50,
      stock: 100,
      eventTitle: "Tech Conference 2025",
      createdAt: "2025-07-01T10:00:00Z",
    },
    {
      code: "DEV10",
      value: 10,
      stock: 40,
      eventTitle: "DevTalk",
      createdAt: "2025-07-15T14:30:00Z",
    },
    {
      code: "SUMMER15",
      value: 15,
      stock: 0,
      eventTitle: "Startup Expo",
      createdAt: "2025-07-20T08:45:00Z",
    },
  ];

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Vouchers</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
