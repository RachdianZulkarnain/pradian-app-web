"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Search,
  MapPin,
  Calendar,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

import { getOrders, Order } from "../_api/get-orders";

export default function OrderHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const itemsPerPage = 5;
  const router = useRouter();

  const fetchOrders = async () => {
    try {
      const result = await getOrders(currentPage, searchQuery);
      setOrders(result.data);
      setTotalOrders(result.total);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(totalOrders / itemsPerPage));

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CREATED":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "WAITING_FOR_CONFIRMATION":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "PAID":
        return "bg-green-100 text-green-800 border-green-300";
      case "REJECT":
        return "bg-red-100 text-red-800 border-red-300";
      case "EXPIRED":
        return "bg-gray-100 text-gray-500 border-gray-300";
      default:
        return "bg-slate-100 text-slate-700 border-slate-300";
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-black text-gray-900 sm:text-4xl">
          ORDER HISTORY
        </h1>
        <div className="mx-auto mt-2 h-1 w-16 bg-red-500" />
      </div>

      {/* Search */}
      <div className="relative mx-auto mb-10 w-full max-w-xl">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search event title"
          className="w-full rounded-md border-2 border-gray-900 bg-white py-3 pr-4 pl-10 font-medium shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] placeholder:text-gray-400 focus:border-blue-600 focus:ring-0"
          value={searchQuery}
          onChange={(e) => {
            setCurrentPage(1);
            setSearchQuery(e.target.value);
          }}
        />
      </div>

      {/* Orders */}
      <section className="mb-10 grid gap-6">
        {orders.map((order) => (
          <div
            key={order.uuid}
            onClick={() => router.push(`/orders/${order.uuid}`)}
            className="cursor-pointer rounded-md border-2 border-gray-900 bg-white p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-1 hover:translate-y-1"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              {/* Image */}
              <div className="w-full flex-shrink-0 sm:w-[180px]">
                <Image
                  src={order.image || "/placeholder.svg"}
                  alt={order.title}
                  width={180}
                  height={120}
                  className="h-[120px] w-full rounded border border-gray-300 object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 space-y-2">
                <h3 className="truncate text-lg font-bold tracking-wide text-gray-900 uppercase">
                  {order.title}
                </h3>
                <div className="flex items-center text-sm text-gray-700">
                  <MapPin className="mr-2 h-4 w-4 text-orange-500" />
                  {order.location}
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <Calendar className="mr-2 h-4 w-4 text-orange-500" />
                  {order.dateRange}
                </div>

                <Badge
                  variant="outline"
                  className={`mt-2 w-fit border text-xs font-semibold tracking-wide uppercase ${getStatusColor(
                    order.status,
                  )}`}
                >
                  {order.status}
                </Badge>
              </div>

              {/* Arrow */}
              <div className="self-end sm:self-center">
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Pagination */}
      <div className="flex flex-wrap justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="rounded-md border-2 border-gray-900 text-sm font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100"
        >
          <ChevronLeft className="mr-1 h-4 w-4" /> Prev
        </Button>

        {Array.from({ length: totalPages }).map((_, index) => {
          const page = index + 1;
          const isActive = currentPage === page;
          return (
            <Button
              key={page}
              size="sm"
              onClick={() => setCurrentPage(page)}
              className={`rounded-md border-2 text-sm font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                isActive
                  ? "border-gray-900 bg-orange-500 text-white hover:bg-orange-600"
                  : "border-gray-900 text-gray-800 hover:bg-gray-100"
              }`}
              variant="outline"
            >
              {page}
            </Button>
          );
        })}

        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setCurrentPage((prev) => Math.min(totalPages, prev + 1))
          }
          disabled={currentPage === totalPages}
          className="rounded-md border-2 border-gray-900 text-sm font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100"
        >
          Next <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </main>
  );
}
