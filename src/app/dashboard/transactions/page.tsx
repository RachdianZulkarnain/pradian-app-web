"use client";

import { useState } from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { useGetAdminTransactions } from "./_hooks/useGetTransactions";

const TransactionPage = () => {
  const [page, setPage] = useState(1);
  const take = 10;

  const { data, isLoading, isError } = useGetAdminTransactions({ page, take });

  if (isLoading) return <p>Loading transactions...</p>;
  if (isError || !data || !data.meta) return <p>Failed to load transactions</p>;

  const totalPages = Math.ceil(data.meta.total / take);

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold">Transactions</h1>
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
};

export default TransactionPage;
