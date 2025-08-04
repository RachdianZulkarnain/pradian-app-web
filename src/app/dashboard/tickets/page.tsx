// app/(dashboard)/tickets/page.tsx
"use client"

import { columns, TicketRow } from "./columns"
import { DataTable } from "@/components/data-table"

export default function TicketPage() {
  // Mock data
  const data: TicketRow[] = [
    {
      id: 1,
      title: "General Admission",
      price: 150000,
      stock: 100,
      totalPrice: 4500000,
      description: "Access to all sessions and exhibition area",
      createdAt: "2025-06-10T10:00:00.000Z",
      updatedAt: "2025-07-01T10:00:00.000Z",
    },
    {
      id: 2,
      title: "VIP Pass",
      price: 300000,
      stock: 50,
      totalPrice: 7500000,
      description: "Includes backstage and lunch with speakers",
      createdAt: "2025-06-15T10:00:00.000Z",
      updatedAt: "2025-07-02T10:00:00.000Z",
    },
  ]

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Tickets</h1>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
