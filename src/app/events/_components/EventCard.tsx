import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Event } from "@/types/event";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface BlogCardProps {
  event: Event;
}

const EventCard: FC<BlogCardProps> = ({ event }) => {
  return (
    <Link href={`/events/${event.slug}`}>
      <Card className="overflow-hidden rounded-xl pt-0 transition-shadow hover:shadow-md">
        <CardHeader className="p-0">
          <div className="relative h-[240px] w-full">
            <Image
              src={event.thumbnail}
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
            Rp {event.price.toLocaleString("id-ID")}
          </h3>
        </CardContent>
      </Card>
    </Link>
  );
};

export default EventCard;
