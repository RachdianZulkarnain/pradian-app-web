"use client";

import { useParams } from "next/navigation";
import OrderDetails from "./components/OrderDetails";

export default function OrderDetailPage() {
  const { uuid } = useParams() as { uuid: string };

  if (!uuid) return <p className="p-4">Invalid Order UUID</p>;

  return <OrderDetails uuid={uuid} />;
}
