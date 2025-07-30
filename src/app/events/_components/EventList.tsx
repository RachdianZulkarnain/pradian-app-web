"use client";

import PaginationSection from "@/components/PaginationSection";
import useGetEvents from "../hooks/useGetEvents";
import EventCard from "./EventCard";
import EventCardSkeleton from "./EventCardSkeleton";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useDebounceValue } from "usehooks-ts";

const EventList = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [debounceSearch] = useDebounceValue(search, 500);

  const { data: events, isPending } = useGetEvents({
    page,
    search: debounceSearch,
  });

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      {/* Search Input */}
      <div className="mb-8">
        <Input
          type="text"
          placeholder="Search events..."
          className="w-full max-w-md"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Event Grid */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isPending && <EventCardSkeleton count={3} />}
        {events?.data.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </section>

      {/* Pagination */}
      {events && (
        <div className="mt-12 flex justify-center">
          <PaginationSection meta={events.meta} setPage={setPage} />
        </div>
      )}
    </div>
  );
};

export default EventList;
