import { Skeleton } from "@/components/ui/skeleton";
import { FC } from "react";

interface EventCardSkeletonProps {
  count: number;
}

const EventCardSkeleton: FC<EventCardSkeletonProps> = ({ count }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="overflow-hidden rounded-lg border shadow-sm">
          <Skeleton className="h-[200px] w-full" />
          <div className="space-y-2 p-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ))}
    </>
  );
};

export default EventCardSkeleton;
