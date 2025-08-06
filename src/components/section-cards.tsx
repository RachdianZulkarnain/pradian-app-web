"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useGetAnalytics } from "@/app/dashboard/_hooks/useGetAnalytics";

export function SectionCards() {
  const [showRevenue, setShowRevenue] = useState(false);
  const { data, isLoading } = useGetAnalytics();

  if (isLoading) return <p>Loading analytics...</p>;
  if (!data) return <p>No data</p>;

  return (
    <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Revenue */}
      <Card>
        <CardHeader className="flex flex-col gap-2">
          <CardDescription>Total Revenue</CardDescription>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-semibold">
              {showRevenue
                ? `Rp ${data.totalRevenue.toLocaleString()}`
                : "**** **** **** ***"}
            </CardTitle>
            <button onClick={() => setShowRevenue((prev) => !prev)}>
              {showRevenue ? (
                <EyeOff className="ml-2  h-5 w-5" />
              ) : (
                <Eye className="ml-2 mb-2 h-5 w-5" />
              )}
            </button>
          </div>
        </CardHeader>
      </Card>

      {/* Total Events */}
      <Card>
        <CardHeader>
          <CardDescription>Total Events</CardDescription>
          <CardTitle className="text-2xl font-semibold">
            +{data.totalEvents}
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Total Tickets */}
      <Card>
        <CardHeader>
          <CardDescription>Total Tickets</CardDescription>
          <CardTitle className="text-2xl font-semibold">
            +{data.totalTickets}
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Total Vouchers */}
      <Card>
        <CardHeader>
          <CardDescription>Total Vouchers</CardDescription>
          <CardTitle className="text-2xl font-semibold">
            +{data.totalVouchers}
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
