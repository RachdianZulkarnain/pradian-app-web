"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PaginationMeta } from "@/types/pagination";

interface PaginationSectionProps {
  meta: PaginationMeta;
  setPage: (page: number) => void;
}

const PaginationSection = ({ meta, setPage }: PaginationSectionProps) => {
  const { page, take, total } = meta;
  const totalPages = Math.ceil(total / take);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="mt-6 flex w-full justify-center">
      <Pagination>
        <PaginationContent className="flex items-center space-x-4">
          <PaginationItem>
            <PaginationPrevious
              onClick={handlePrev}
              className={page <= 1 ? "cursor-not-allowed opacity-50" : ""}
            />
          </PaginationItem>

          <PaginationItem>
            <span className="text-sm text-muted-foreground font-medium">
              Page {page} of {totalPages}
            </span>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              onClick={handleNext}
              className={page >= totalPages ? "cursor-not-allowed opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationSection;
