"use client";

import { useState } from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { useGetAdminTransactions } from "./_hooks/useGetTransactions";
import PaginationSection from "@/components/PaginationSection";

const TransactionPage = () => {
  const [page, setPage] = useState(1);
  const take = 10;

  const { data, isLoading, isError } = useGetAdminTransactions({ page, take });

  if (isLoading) return <p>Loading transactions...</p>;
  if (isError || !data || !data.meta) return <p>Failed to load transactions</p>;

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold">Transactions</h1>
      <DataTable columns={columns} data={data.data} />

      {/* 🔁 Replaces the old manual pagination */}
      <PaginationSection meta={data.meta} setPage={setPage} />
    </div>
  );
};

export default TransactionPage;
