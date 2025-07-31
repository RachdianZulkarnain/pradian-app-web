"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebounceValue } from "usehooks-ts";
import PaginationSection from "@/components/PaginationSection";
import useGetEvents from "../hooks/useGetEvents";
import EventCard from "./EventCard";
import EventCardSkeleton from "./EventCardSkeleton";
import { CategoryFilter } from "@/components/CategoryFilter";

const EventList = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("all");

  const [debounceSearch] = useDebounceValue(search, 500);


  useEffect(() => {
    const urlCategory = searchParams.get("category");
    const urlLocation = searchParams.get("location");

    if (urlCategory) setCategory(urlCategory);
    if (urlLocation) setLocation(urlLocation);
  }, [searchParams]);


  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    category !== "all"
      ? params.set("category", category)
      : params.delete("category");
    location !== "all"
      ? params.set("location", location)
      : params.delete("location");
    router.replace(`/events?${params.toString()}`);
  }, [category, location]);

  const { data: events, isPending } = useGetEvents({
    page,
    search: debounceSearch,
    category: category === "all" ? undefined : category,
    location: location === "all" ? undefined : location,
  });

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <Input
          type="text"
          placeholder="Search events..."
          className="w-full sm:max-w-xs"
          onChange={(e) => setSearch(e.target.value)}
        />

        <CategoryFilter value={category} onValueChange={setCategory} />

        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="jakarta">Jakarta</SelectItem>
            <SelectItem value="bandung">Bandung</SelectItem>
            <SelectItem value="bali">Bali</SelectItem>
          </SelectContent>
        </Select>
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
