"use client";

import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useEffect, useState } from "react";

const Newest = () => {
  const [loading, setLoading] = useState(true);

  const events = [
    {
      id: 1,
      title: "Raisa Ambivert Showcase",
      date: "11 Feb 2026 - 13 Feb 2026",
      price: "Rp 2.000.000",
      img: "/events/raisa.jpg",
      author: "Rachdian",
    },
    {
      id: 2,
      title: "PLAYOFF IBL GOPAY 2025",
      date: "31 Mar 2026 - 01 Apr 2026",
      price: "Rp 650.000",
      img: "/events/ibl.jpg",
      author: "Rachdian",
    },
    {
      id: 3,
      title: "PLAYOFF IBL GOPAY 2025",
      date: "31 Mar 2026 - 01 Apr 2026",
      price: "Rp 650.000",
      img: "/events/ibl.jpg",
      author: "Rachdian",
    },
    {
      id: 4,
      title: "PLAYOFF IBL GOPAY 2025",
      date: "31 Mar 2026 - 01 Apr 2026",
      price: "Rp 650.000",
      img: "/events/ibl.jpg",
      author: "Rachdian",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="container mx-auto mt-12 p-4 py-4 md:px-8 lg:px-0">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-3xl font-semibold">Newest Event</h3>
        {/* <Link
          href="/events"
          className="text-sm text-orange-400 hover:underline"
        >
          See all
        </Link> */}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          <div className="space-y-3 overflow-hidden rounded-xl bg-zinc-900 p-4 shadow-md">
            <Skeleton className="h-[200px] w-full rounded-md" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl bg-zinc-900 shadow-md transition duration-300 hover:shadow-lg">
            <div className="relative h-[200px] w-full">
              <Image
                src={events[0].img}
                alt={events[0].title}
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-2 p-4">
              <h4 className="line-clamp-2 text-base font-semibold text-white">
                {events[0].title}
              </h4>
              <p className="text-sm text-sky-400">{events[0].date}</p>
              <p className="text-sm font-medium text-orange-400">
                {events[0].price}
              </p>
              <p className="pt-2 text-xs text-white/50">
                by {events[0].author}
              </p>
            </div>
          </div>
        )}

        {loading ? (
          <div className="space-y-3 overflow-hidden rounded-xl bg-zinc-900 p-4 shadow-md">
            <Skeleton className="h-[200px] w-full rounded-md" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl bg-zinc-900 shadow-md transition duration-300 hover:shadow-lg">
            <div className="relative h-[200px] w-full">
              <Image
                src={events[1].img}
                alt={events[1].title}
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-2 p-4">
              <h4 className="line-clamp-2 text-base font-semibold text-white">
                {events[1].title}
              </h4>
              <p className="text-sm text-sky-400">{events[1].date}</p>
              <p className="text-sm font-medium text-orange-400">
                {events[1].price}
              </p>
              <p className="pt-2 text-xs text-white/50">
                by {events[1].author}
              </p>
            </div>
          </div>
        )}
        {loading ? (
          <div className="space-y-3 overflow-hidden rounded-xl bg-zinc-900 p-4 shadow-md">
            <Skeleton className="h-[200px] w-full rounded-md" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl bg-zinc-900 shadow-md transition duration-300 hover:shadow-lg">
            <div className="relative h-[200px] w-full">
              <Image
                src={events[1].img}
                alt={events[1].title}
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-2 p-4">
              <h4 className="line-clamp-2 text-base font-semibold text-white">
                {events[1].title}
              </h4>
              <p className="text-sm text-sky-400">{events[1].date}</p>
              <p className="text-sm font-medium text-orange-400">
                {events[1].price}
              </p>
              <p className="pt-2 text-xs text-white/50">
                by {events[1].author}
              </p>
            </div>
          </div>
        )}
        {loading ? (
          <div className="space-y-3 overflow-hidden rounded-xl bg-zinc-900 p-4 shadow-md">
            <Skeleton className="h-[200px] w-full rounded-md" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl bg-zinc-900 shadow-md transition duration-300 hover:shadow-lg">
            <div className="relative h-[200px] w-full">
              <Image
                src={events[1].img}
                alt={events[1].title}
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-2 p-4">
              <h4 className="line-clamp-2 text-base font-semibold text-white">
                {events[1].title}
              </h4>
              <p className="text-sm text-sky-400">{events[1].date}</p>
              <p className="text-sm font-medium text-orange-400">
                {events[1].price}
              </p>
              <p className="pt-2 text-xs text-white/50">
                by {events[1].author}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Newest;
