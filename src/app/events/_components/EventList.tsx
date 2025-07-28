"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useDebounceValue } from "usehooks-ts";
import PaginationSection from "@/components/PaginationSection";
import useGetEvents from "../hooks/useGetEvents";
import EventCard from "./EventCard";
import EventCardSkeleton from "./EventCardSkeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = ["All", "Music", "Arts", "Food", "Business", "Nightlife"];
const locations = ["All", "Jakarta", "Bandung", "Surabaya", "Bali"];

const EventList = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All");
  const [page, setPage] = useState(1);
  const [debounceSearch] = useDebounceValue(search, 500);

  const { data: events, isPending } = useGetEvents({
    page,
    search: debounceSearch,
    category: category === "All" ? "" : category,
    location: location === "All" ? "" : location,
  });

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      {/* Filter Section - Responsive and Neat */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <Input
          type="text"
          placeholder="Search Event..."
          className="w-full sm:max-w-sm"
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex gap-3 sm:gap-4">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[130px] sm:w-[150px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="w-[130px] sm:w-[150px]">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Event Cards */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isPending && <EventCardSkeleton count={6} />}
        {!isPending &&
          events?.data.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
      </section>

      {/* Pagination */}
      {events && (
        <div className="mt-10">
          <PaginationSection meta={events.meta} setPage={setPage} />
        </div>
      )}
    </div>
  );
};

export default EventList;
