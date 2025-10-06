"use client";

import Image from "next/image";
import Link from "next/link";
import useGetEvents from "@/app/events/hooks/useGetEvents";
import { Skeleton } from "@/components/ui/skeleton";

const formatPrice = (price: number | string | undefined) => {
  const numericPrice = typeof price === "number" ? price : Number(price || 0);
  return numericPrice.toLocaleString("id-ID");
};

const NewestEvents = () => {
  const { data: events, isPending } = useGetEvents({
    page: 1,
    search: "",
    take: 4,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  return (
    <section className="container mx-auto mt-12 px-4 md:px-12 lg:px-24">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-3xl font-bold text-black">
          Newest <span>Events</span>
        </h3>
        <Link
          href="/events"
          className="text-sm font-semibold hover:underline"
        >
          See all
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {isPending
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="space-y-3 rounded-xl bg-white p-4 shadow-md"
              >
                <Skeleton className="aspect-[4/3] w-full rounded-lg" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))
          : events?.data?.map((event) => {
              const lowestPrice =
                event.tickets && event.tickets.length > 0
                  ? Math.min(...event.tickets.map((t) => Number(t.price)))
                  : null;

              return (
                <div
                  key={event.id}
                  className="overflow-hidden rounded-xl bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-[4/3] w-full">
                    <Link
                      href={`/events/${event.slug}`}
                      className="absolute inset-0 z-10"
                    />
                    <Image
                      src={event.thumbnail || "/placeholder.jpg"}
                      alt={event.title}
                      fill
                      className="rounded-t-xl object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="space-y-2 p-4">
                    <h4 className="line-clamp-2 text-base font-bold text-black">
                      {event.title}
                    </h4>
                    <p className="truncate text-sm text-gray-600">
                      {event.startDate && event.endDate
                        ? `${new Date(event.startDate).toLocaleDateString("id-ID")} – ${new Date(
                            event.endDate,
                          ).toLocaleDateString("id-ID")}`
                        : "-"}
                    </p>
                    <p className="text-sm font-semibold text-red-600">
                      {lowestPrice === 0
                        ? "Gratis"
                        : lowestPrice !== null
                          ? `Rp ${formatPrice(lowestPrice)}`
                          : "Belum tersedia"}
                    </p>
                  </div>
                </div>
              );
            })}
      </div>
    </section>
  );
};

export default NewestEvents;
