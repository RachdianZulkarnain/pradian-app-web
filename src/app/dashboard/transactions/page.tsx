"use client";

import { DataTable } from "@/components/data-table";
import PaginationSection from "@/components/PaginationSection";
import { useState } from "react";
import { useGetAdminTransactions } from "./_hooks/useGetTransactions";
import { columns } from "./columns";

const TransactionPage = () => {
  const [page, setPage] = useState(1);
  const take = 10;

  const { data, isLoading, isError } = useGetAdminTransactions({ page, take });

  if (isLoading) return <p>Loading transactions...</p>;
  if (isError || !data || !data.meta) return <p>Failed to load transactions</p>;

  return (
    <div className="space-y-4 p-6">
      <h1 className="mb-4 text-2xl font-bold">Transactions</h1>
      <DataTable columns={columns} data={data.data} />

      <PaginationSection meta={data.meta} setPage={setPage} />
    </div>
  );
};

export default TransactionPage;
