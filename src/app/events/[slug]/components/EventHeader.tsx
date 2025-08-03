"use client";

import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { getEvent } from "../_api/get-event";
import { getTicketsByEvent } from "../_api/get-tickets";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Calendar, Clock } from "lucide-react";
import Markdown from "@/components/Markdown";
import { Event } from "@/types/event";
import { Ticket } from "@/types/ticket";

interface EventHeaderProps {
  slug: string;
}

const formatDateRange = (start: Date, end: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  const startDate = start.toLocaleDateString("id-ID", options);
  const endDate = end.toLocaleDateString("id-ID", options);
  return start.toDateString() === end.toDateString()
    ? startDate
    : `${startDate} - ${endDate}`;
};

const EventHeader: FC<EventHeaderProps> = ({ slug }) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  useEffect(() => {
    const fetchData = async () => {
      const fetchedEvent = await getEvent(slug);
      if (!fetchedEvent) return;

      setEvent(fetchedEvent);

      const ticketList = await getTicketsByEvent(Number(fetchedEvent.id));
      setTickets(ticketList);

      const initialQuantities: Record<number, number> = {};
      ticketList.forEach((t) => (initialQuantities[t.id] = 0));
      setQuantities(initialQuantities);
    };

    fetchData();
  }, [slug]);

  if (!event) return <div className="p-4">Loading event...</div>;

  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);
  const formattedDate = formatDateRange(startDate, endDate);

  const totalPrice = tickets.reduce(
    (sum, ticket) => sum + (quantities[ticket.id] || 0) * ticket.price,
    0,
  );

  const handleQuantityChange = (ticketId: number, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [ticketId]: Math.max((prev[ticketId] || 0) + delta, 0),
    }));
  };

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 md:py-15 lg:px-8">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-md">
            <Image
              src={event.thumbnail || "/placeholder.png"}
              alt="Event Poster"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
          </div>

          <Card className="md:hidden">
            <CardContent className="space-y-4 p-6">
              <h1 className="text-2xl font-bold text-gray-900">
                {event.title}
              </h1>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-orange-500" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="mt-0.5 h-5 w-5 text-orange-500" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 text-orange-500" />
                  <span>19:00 - 23:00</span>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black">
                  <span className="text-sm font-bold text-white">
                    {event.adminId || "ORG"}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {event.adminId || "Unknown Organizer"}
                </span>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-2 rounded-full bg-gray-100 p-1 text-sm">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="tickets">Tickets</TabsTrigger>
            </TabsList>

            <TabsContent
              value="description"
              className="pt-6 text-sm text-gray-700"
            >
              <Markdown description={event.description} />
            </TabsContent>

            <TabsContent value="tickets" className="space-y-4 pt-6">
              {tickets.length === 0 ? (
                <p className="text-sm text-gray-500">No tickets available.</p>
              ) : (
                tickets.map((ticket) => (
                  <Card key={ticket.id} className="border-orange-200">
                    <CardContent className="space-y-3 p-6">
                      <div className="text-lg font-semibold text-gray-900">
                        {ticket.title}
                      </div>
                      <p className="text-sm text-gray-600">
                        {ticket.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-gray-900">
                          Rp {ticket.price.toLocaleString("id-ID")}
                        </span>
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            size="icon"
                            variant="outline"
                            onClick={() => handleQuantityChange(ticket.id, -1)}
                          >
                            -
                          </Button>
                          <span className="min-w-[20px] text-center text-sm font-medium">
                            {quantities[ticket.id] || 0}
                          </span>
                          <Button
                            type="button"
                            size="icon"
                            variant="outline"
                            onClick={() => handleQuantityChange(ticket.id, 1)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>

          <Card className="md:hidden">
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">
                  Total price
                </span>
                <span className="text-xl font-bold text-gray-900">
                  Rp {totalPrice.toLocaleString("id-ID")}
                </span>
              </div>
              <Button
                className="w-full bg-orange-500 py-3 text-sm font-medium text-white hover:bg-orange-600"
                size="lg"
                disabled={totalPrice === 0}
              >
                Checkout
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="hidden space-y-6 md:block">
          <Card>
            <CardContent className="space-y-4 p-6">
              <h1 className="text-2xl font-bold text-gray-900">
                {event.title}
              </h1>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-orange-500" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="mt-0.5 h-5 w-5 text-orange-500" />
                  <span>{formattedDate}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black">
                  <span className="text-sm font-bold text-white">
                    {event.adminId || "ORG"}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {event.adminId || "Unknown Organizer"}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">
                  Total price
                </span>
                <span className="text-xl font-bold text-gray-900">
                  Rp {totalPrice.toLocaleString("id-ID")}
                </span>
              </div>
              <Button
                className="w-full bg-orange-500 py-3 text-sm font-medium text-white hover:bg-orange-600"
                size="lg"
                disabled={totalPrice === 0}
              >
                Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EventHeader;
