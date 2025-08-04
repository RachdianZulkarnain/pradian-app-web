"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  MapPin,
  Calendar,
  Clock,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import Image from "next/image";

export default function OrderHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const orders = [
    {
      id: 1,
      title: "PLAYOFF IBL GOPAY 2025 : TANGERANG HAWKS...",
      location: "Surabaya",
      dateRange: "31 Mar 2026 - 01 Apr 2026",
      time: "19:00 - 23:00",
      status: "WAITING_CONFIRMATION",
      image: "/placeholder.svg?height=120&width=180&text=Basketball+Event",
    },
    {
      id: 2,
      title: "PLAYOFF IBL GOPAY 2025 : TANGERANG HAWKS...",
      location: "Surabaya",
      dateRange: "31 Mar 2026 - 01 Apr 2026",
      time: "19:00 - 23:00",
      status: "WAITING_CONFIRMATION",
      image: "/placeholder.svg?height=120&width=180&text=Basketball+Event",
    },
    {
      id: 3,
      title: "Raisa Ambivert Showcase",
      location: "Tangerang",
      dateRange: "11 Feb 2026 - 13 Feb 2026",
      time: "19:00 - 23:00",
      status: "CREATED",
      image: "/placeholder.svg?height=120&width=180&text=Concert+Event",
    },
    {
      id: 4,
      title: "Raisa Ambivert Showcase",
      location: "Tangerang",
      dateRange: "11 Feb 2026 - 13 Feb 2026",
      time: "19:00 - 23:00",
      status: "CREATED",
      image: "/placeholder.svg?height=120&width=180&text=Concert+Event",
    },
    {
      id: 5,
      title: "Raisa Ambivert Showcase",
      location: "Tangerang",
      dateRange: "11 Feb 2026 - 13 Feb 2026",
      time: "19:00 - 23:00",
      status: "CREATED",
      image: "/placeholder.svg?height=120&width=180&text=Concert+Event",
    },
    {
      id: 6,
      title: "Jakarta Music Festival 2026",
      location: "Jakarta",
      dateRange: "15 Apr 2026 - 17 Apr 2026",
      time: "18:00 - 24:00",
      status: "CONFIRMED",
      image: "/placeholder.svg?height=120&width=180&text=Music+Festival",
    },
    {
      id: 7,
      title: "Tech Conference Indonesia",
      location: "Bandung",
      dateRange: "22 May 2026 - 24 May 2026",
      time: "09:00 - 17:00",
      status: "WAITING_CONFIRMATION",
      image: "/placeholder.svg?height=120&width=180&text=Tech+Conference",
    },
    {
      id: 8,
      title: "Food Festival Surabaya",
      location: "Surabaya",
      dateRange: "10 Jun 2026 - 12 Jun 2026",
      time: "10:00 - 22:00",
      status: "CREATED",
      image: "/placeholder.svg?height=120&width=180&text=Food+Festival",
    },
  ];

  const itemsPerPage = 5;
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const filteredOrders = orders.filter(
    (order) =>
      order.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.location.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "WAITING_CONFIRMATION":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "CREATED":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "CONFIRMED":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="mx-auto min-h-screen max-w-4xl bg-gray-50 p-6">
      {/* Page Title */}
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Order History</h1>

      {/* Search Bar */}
      <div className="relative mb-8">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
        <Input
          placeholder="Search"
          className="max-w-md border-gray-200 bg-white pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Order List */}
      <div className="mb-8 space-y-4">
        {paginatedOrders.map((order) => (
          <div
            key={order.id}
            className="cursor-pointer rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md"
          >
            <div className="flex items-center space-x-4">
              {/* Event Image */}
              <div className="flex-shrink-0">
                <Image
                  src={order.image || "/placeholder.svg"}
                  alt={order.title}
                  width={180}
                  height={120}
                  className="rounded-lg object-cover"
                />
              </div>

              {/* Event Details */}
              <div className="min-w-0 flex-1">
                <h3 className="mb-3 truncate text-lg font-semibold text-gray-900">
                  {order.title}
                </h3>

                <div className="space-y-2">
                  {/* Location */}
                  <div className="flex items-center text-gray-600">
                    <MapPin className="mr-2 h-4 w-4 flex-shrink-0 text-orange-500" />
                    <span className="text-sm">{order.location}</span>
                  </div>

                  {/* Date Range */}
                  <div className="flex items-center text-gray-600">
                    <Calendar className="mr-2 h-4 w-4 flex-shrink-0 text-orange-500" />
                    <span className="text-sm">{order.dateRange}</span>
                  </div>

                  {/* Time */}
                  <div className="flex items-center text-gray-600">
                    <Clock className="mr-2 h-4 w-4 flex-shrink-0 text-orange-500" />
                    <span className="text-sm">{order.time}</span>
                  </div>

                  {/* Status Badge */}
                  <div className="pt-1">
                    <Badge
                      variant="outline"
                      className={`text-xs font-medium ${getStatusColor(order.status)}`}
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Arrow Icon */}
              <div className="flex-shrink-0">
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center bg-transparent"
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Previous
        </Button>

        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          return (
            <Button
              key={pageNumber}
              variant={currentPage === pageNumber ? "default" : "outline"}
              size="sm"
              className={
                currentPage === pageNumber
                  ? "border-orange-500 bg-orange-500 hover:bg-orange-600"
                  : ""
              }
              onClick={() => setCurrentPage(pageNumber)}
            >
              {pageNumber}
            </Button>
          );
        })}

        <Button
          variant="outline"
          size="sm"
          className="flex items-center bg-transparent"
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
