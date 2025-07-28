import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Event } from '@/types/events';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react'

interface EventCardProps {
  event: Event;
}

const EventCard: FC<EventCardProps> = ({ event }) => {
  return (
    <Link href={`/events/${event.slug}`}>
      <Card>
        <CardHeader>
          <div className="relative h-[200px] w-full overflow-hidden rounded-lg">
            <Image
              src={event.thumbnail}
              alt="thumbnail"
              className="object-cover"
              fill
            />
          </div>
        </CardHeader>
        <CardContent>
          <h2 className="text-lg font-bold">{event.title}</h2>
          <p className="line-clamp-3">{event.description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default EventCard