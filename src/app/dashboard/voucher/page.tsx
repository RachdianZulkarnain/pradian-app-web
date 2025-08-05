"use client";

import { useState } from "react";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { useGetVouchers } from "./_hooks/useGetVouchers";

export default function VoucherPage() {
  const [page, setPage] = useState(1);
  const take = 10;

  const { data, isLoading, isError } = useGetVouchers({ page, take });

  if (isLoading) return <p>Loading vouchers...</p>;
  if (isError || !data) return <p>Failed to load vouchers</p>;

  const totalPages = Math.ceil(data.meta.total / take);

  return (
    <div className="space-y-4 p-6">
      <h1 className="text-2xl font-bold">Vouchers</h1>
      <DataTable columns={columns} data={data.data} />

      <div className="mt-4 flex justify-between">
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
