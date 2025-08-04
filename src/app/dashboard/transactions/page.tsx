// app/(dashboard)/transactions/page.tsx
"use client"

import { DataTable } from "@/components/data-table"
import { columns, TransactionRow } from "./columns"

export default function TransactionPage() {
  // Mock transaction data
  const data: TransactionRow[] = [
    {
      eventName: "Tech Conference 2025",
      Email: "alice@example.com",
      quantity: 2,
      totalTicketPrice: 500000,
      voucherUsed: "TECH25",
      pointsUsed: 20000,
      finalPrice: 480000,
      status: "PAID",
    },
    {
      eventName: "Startup Expo",
      Email: "bob@example.com",
      quantity: 1,
      totalTicketPrice: 250000,
      voucherUsed: null,
      pointsUsed: null,
      finalPrice: 250000,
      status: "WAITING_FOR_PAYMENT",
    },
    {
      eventName: "DevTalk 2025",
      Email: "carol@example.com",
      quantity: 3,
      totalTicketPrice: 750000,
      voucherUsed: "DEVTALK",
      pointsUsed: 50000,
      finalPrice: 700000,
      status: "REJECT",
    },
  ]

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Transactions</h1>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
