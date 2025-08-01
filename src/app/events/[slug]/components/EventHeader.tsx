import { FC } from "react";
import Image from "next/image";
import { getEvent } from "../_api/get-event";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Calendar, Clock, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Markdown from "@/components/Markdown";

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

const EventHeader: FC<EventHeaderProps> = async ({ slug }) => {
  const event = await getEvent(slug);

  if (!event) {
    return <div className="p-4">Event not found</div>;
  }

  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);
  const formattedDate = formatDateRange(startDate, endDate);
  const totalPrice = 0;

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 md:py-15 lg:px-8">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
        {/* LEFT SECTION */}
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

          {/* MOBILE DETAIL */}
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

          {/* DESCRIPTION & TICKETS */}
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-2 rounded-full bg-gray-100 p-1 text-sm">
              <TabsTrigger
                value="description"
                className="rounded-full px-4 py-2 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="tickets"
                className="rounded-full px-4 py-2 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm"
              >
                Tickets
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="description"
              className="space-y-4 pt-6 text-sm leading-relaxed text-gray-700"
            >
              <Markdown description={event.description} />
            </TabsContent>

            <TabsContent value="tickets" className="pt-6">
              <Card className="border-orange-200">
                <CardContent className="flex items-start gap-3 p-6 text-sm text-gray-600">
                  <Sparkles className="mt-1 h-5 w-5 text-orange-500" />
                  <span>
                    You haven't selected any tickets. Please choose one first in
                    the{" "}
                    <span className="font-medium text-orange-500">Tickets</span>{" "}
                    tab.
                  </span>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* MOBILE CHECKOUT CARD */}
          <Card className="md:hidden">
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">
                  Total price
                </span>
                <span className="text-xl font-bold text-gray-900">
                  Rp {totalPrice.toLocaleString()}
                </span>
              </div>
              <Button
                className="w-full bg-orange-500 py-3 text-sm font-medium text-white hover:bg-orange-600"
                size="lg"
              >
                Checkout
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* DESKTOP DETAIL */}
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
                  Rp {totalPrice.toLocaleString()}
                </span>
              </div>
              <Button
                className="w-full bg-orange-500 py-3 text-sm font-medium text-white hover:bg-orange-600"
                size="lg"
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
