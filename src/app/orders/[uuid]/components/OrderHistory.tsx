"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import Image from "next/image";
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
        return "bg-yellow-100 text-yellow-800 border-yellow-300"; // Menunggu pembayaran
      case "WAITING_FOR_CONFIRMATION":
        return "bg-blue-100 text-blue-800 border-blue-300"; // Menunggu konfirmasi admin
      case "PAID":
        return "bg-green-100 text-green-800 border-green-300"; // Berhasil
      case "REJECT":
        return "bg-red-100 text-red-800 border-red-300"; // Ditolak
      case "EXPIRED":
        return "bg-gray-100 text-gray-500 border-gray-300"; // Kadaluarsa
      default:
        return "bg-slate-100 text-slate-700 border-slate-300"; // Status tidak dikenal
    }
  };

  return (
    <div className="mx-auto min-h-screen max-w-5xl p-4 sm:p-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Order History</h1>

      <div className="relative mb-8 w-full">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
        <Input
          placeholder="Search event title"
          className="w-full max-w-md rounded-md border-gray-200 bg-white pl-10 shadow-sm"
          value={searchQuery}
          onChange={(e) => {
            setCurrentPage(1);
            setSearchQuery(e.target.value);
          }}
        />
      </div>

      <div className="mb-8 grid gap-4">
        {orders.map((order) => (
          <div
            key={order.uuid}
            className="cursor-pointer rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md"
            onClick={() => router.push(`/orders/${order.uuid}`)}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6">
              <div className="mb-4 sm:mb-0 sm:w-[180px]">
                <Image
                  src={order.image || "/placeholder.svg"}
                  alt={order.title}
                  width={180}
                  height={120}
                  className="h-[120px] w-full rounded-md object-cover"
                />
              </div>

              <div className="flex-1 space-y-2">
                <h3 className="truncate text-lg font-semibold text-gray-900">
                  {order.title}
                </h3>

                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="mr-2 h-4 w-4 text-orange-500" />
                  {order.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="mr-2 h-4 w-4 text-orange-500" />
                  {order.dateRange}
                </div>

                <Badge
                  variant="outline"
                  className={`mt-2 w-fit text-xs font-medium ${getStatusColor(
                    order.status,
                  )}`}
                >
                  {order.status}
                </Badge>
              </div>

              <div className="mt-3 sm:mt-0 sm:self-center">
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Previous
        </Button>

        {Array.from({ length: totalPages }).map((_, index) => {
          const page = index + 1;
          return (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(page)}
              className={
                currentPage === page
                  ? "border-orange-500 bg-orange-500 text-white hover:bg-orange-600"
                  : ""
              }
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
        >
          Next
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
