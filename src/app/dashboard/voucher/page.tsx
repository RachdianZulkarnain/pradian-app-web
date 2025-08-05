"use client";

import { useState } from "react";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { useGetVouchers } from "./_hooks/useGetVouchers";
import PaginationSection from "@/components/PaginationSection";

export default function VoucherPage() {
  const [page, setPage] = useState(1);
  const take = 10;

  const { data, isLoading, isError } = useGetVouchers({ page, take });

  if (isLoading) return <p>Loading vouchers...</p>;
  if (isError || !data || !data.meta) return <p>Failed to load vouchers</p>;

  return (
    <div className="space-y-4 p-6">
      <h1 className="text-2xl font-bold">Vouchers</h1>

      <DataTable columns={columns} data={data.data} />

      {/* ✅ Use the reusable pagination component */}
      <PaginationSection meta={data.meta} setPage={setPage} />
    </div>
  );
}
