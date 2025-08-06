"use client";

import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getEvent } from "../_api/get-event";
import { getTicketsByEvent } from "../_api/get-tickets";
import { getVouchersByEvent } from "../_api/get-vouchers";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Calendar, Copy } from "lucide-react";
import Markdown from "@/components/Markdown";
import { toast } from "sonner";
import { Event } from "@/types/event";
import { Ticket } from "@/types/ticket";
import { Voucher } from "@/types/voucher";
import { useCreateTransaction } from "../_api/create-transactions";
import Link from "next/link";

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
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [showConfirm, setShowConfirm] = useState(false);

  const router = useRouter();
  const { handleCheckout } = useCreateTransaction(tickets, quantities, () => {
    setShowConfirm(false);
  });

  useEffect(() => {
    const fetchData = async () => {
      const fetchedEvent = await getEvent(slug);
      if (!fetchedEvent) return;

      setEvent(fetchedEvent);

      const ticketList = await getTicketsByEvent(fetchedEvent.slug);
      setTickets(ticketList);

      const voucherList = await getVouchersByEvent(Number(fetchedEvent.id));
      setVouchers(voucherList);

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
      <div className="mx-auto max-w-6xl space-y-8 lg:grid lg:grid-cols-[2fr_1fr] lg:gap-8 lg:space-y-0">
        {/* Left Content */}
        <div className="space-y-6">
          {/* Thumbnail */}
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

          {/* Mobile Info */}
          <div className="space-y-4 md:hidden">
            <h1 className="text-xl font-bold text-gray-900">{event.title}</h1>
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
            <hr className="border-t border-gray-200" />
            <div className="flex items-center gap-3">
              {event.admin?.pictureProfile ? (
                <Image
                  src={event.admin.pictureProfile}
                  alt={event.admin.name || "Admin"}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black">
                  <span className="text-sm font-bold text-white">
                    {event.admin?.name?.charAt(0).toUpperCase() || "A"}
                  </span>
                </div>
              )}
              <span className="text-sm font-medium text-gray-900">
                {event.admin?.name || "Unknown Admin"}
              </span>
            </div>
          </div>

          {/* Vouchers */}
          {vouchers.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {vouchers.map((voucher) => (
                <div
                  key={voucher.id}
                  className="flex w-full max-w-fit items-center justify-between rounded-md border border-orange-200 bg-white px-3 py-2 shadow-sm sm:w-auto"
                >
                  <div className="mr-2 flex flex-col text-left">
                    <span className="text-sm font-bold text-orange-600">
                      {voucher.code}
                    </span>
                    <span className="text-xs text-gray-700">
                      Rp {voucher.value.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6"
                    onClick={() => {
                      navigator.clipboard.writeText(voucher.code);
                      toast.success("Voucher code copied!");
                    }}
                  >
                    <Copy className="h-4 w-4 text-gray-600" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Description & Tickets */}
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
                    <CardContent className="space-y-4 px-4 py-5 sm:p-6">
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {ticket.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {ticket.description}
                        </p>
                      </div>
                      <hr className="border-t border-gray-200" />
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xl font-bold text-gray-900">
                          {ticket.price === 0
                            ? "Gratis"
                            : `Rp ${ticket.price.toLocaleString("id-ID")}`}
                        </span>
                        {ticket.price === 0 ? (
                          <div className="rounded-md bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                            1 Ticket
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Button
                              type="button"
                              size="icon"
                              variant="outline"
                              onClick={() =>
                                handleQuantityChange(ticket.id, -1)
                              }
                            >
                              -
                            </Button>
                            <span className="min-w-[24px] text-center text-sm font-medium">
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
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>

          {/* Mobile Checkout */}
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
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Desktop Sidebar */}
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
              <hr className="my-4 border-t border-gray-200" />
              <div className="flex items-center gap-3">
                <Link href="/organizer" className="flex items-center gap-3">
                {event.admin?.pictureProfile ? (
                  <Image
                  src={event.admin.pictureProfile}
                  alt={event.admin.name || "Admin"}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black">
                    <span className="text-sm font-bold text-white">
                      {event.admin?.name?.charAt(0).toUpperCase() || "A"}
                    </span>
                  </div>
                )}
                <span className="text-sm font-medium text-gray-900">
                  {event.admin?.name || "Unknown Admin"}
                </span>
                </Link>
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
              <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
                <DialogTrigger asChild>
                  <Button
                    className="w-full bg-orange-500 py-3 text-sm font-medium text-white hover:bg-orange-600"
                    size="lg"
                    disabled={totalPrice === 0}
                  >
                    Checkout
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Confirm Transaction</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to proceed with this transaction?
                      This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="mt-4 flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowConfirm(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleCheckout}
                      className="bg-orange-500 text-white hover:bg-orange-600"
                    >
                      Confirm
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EventHeader;
