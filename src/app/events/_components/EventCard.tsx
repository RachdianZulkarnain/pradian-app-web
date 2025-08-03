import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Event } from "@/types/event";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

// Tambahkan tipe tickets manual jika belum ada di Event
interface EventWithTickets extends Event {
  tickets?: { price: number }[];
}

interface BlogCardProps {
  event: EventWithTickets;
}

const formatPrice = (price: number | string | undefined) => {
  const numericPrice = typeof price === "number" ? price : Number(price || 0);
  return numericPrice.toLocaleString("id-ID");
};

const EventCard: FC<BlogCardProps> = ({ event }) => {
  const lowestPrice =
    event.tickets && event.tickets.length > 0
      ? Math.min(...event.tickets.map((t) => Number(t.price)))
      : null;

  return (
    <Link href={`/events/${event.slug}`}>
      <Card className="overflow-hidden rounded-xl pt-0 transition-shadow hover:shadow-md">
        <CardHeader className="p-0">
          <div className="relative h-[240px] w-full">
            <Image
              src={event.thumbnail || "/placeholder.png"}
              alt={event.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-1.5">
          <h2 className="text-lg font-semibold text-gray-900">{event.title}</h2>
          <p className="text-sm text-gray-500">
            {new Date(event.startDate).toLocaleDateString("id-ID")} –{" "}
            {new Date(event.endDate).toLocaleDateString("id-ID")}
          </p>
          <h3 className="text-lg font-semibold text-gray-900">
            {lowestPrice !== null
              ? `Rp ${formatPrice(lowestPrice)}`
              : "Belum tersedia"}
          </h3>
        </CardContent>
      </Card>
    </Link>
  );
};

export default EventCard;
