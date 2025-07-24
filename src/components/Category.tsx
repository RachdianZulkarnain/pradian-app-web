import {
  Music,
  Moon,
  Paintbrush,
  Utensils,
  Briefcase,
  Heart,
} from "lucide-react";
import Link from "next/link";

const Category = () => {
  return (
    <section className="container mx-auto px-4 py-6">
      <h3 className="mb-6 text-3xl font-semibold">Category Event</h3>

      <div className="grid grid-cols-3 gap-4 md:flex md:snap-x md:snap-mandatory md:justify-center md:gap-40 md:overflow-x-auto md:pb-2">
        {/* Music */}
        <div className="flex snap-start flex-col items-center text-center md:min-w-[80px]">
          <Link href="/music">
            <div className="mb-2 flex h-[90px] w-[90px] items-center justify-center rounded-full border border-gray-300 transition hover:scale-105">
              <Music size={35} />
            </div>
            <span className="text-sm font-medium">Music</span>
          </Link>
        </div>

        {/* Nightlife */}
        <div className="flex snap-start flex-col items-center text-center md:min-w-[80px]">
          <Link href="/nightlife">
            <div className="mb-2 flex h-[90px] w-[90px] items-center justify-center rounded-full border border-gray-300 transition hover:scale-105">
              <Moon size={35} />
            </div>
            <span className="text-sm font-medium">Nightlife</span>
          </Link>
        </div>

        {/* Arts */}
        <div className="flex snap-start flex-col items-center text-center md:min-w-[80px]">
          <Link href="/arts">
            <div className="mb-2 flex h-[90px] w-[90px] items-center justify-center rounded-full border border-gray-300 transition hover:scale-105">
              <Paintbrush size={35} />
            </div>
            <span className="text-sm font-medium">Arts</span>
          </Link>
        </div>

        {/* Food */}
        <div className="flex snap-start flex-col items-center text-center md:min-w-[80px]">
          <Link href="/food">
            <div className="mb-2 flex h-[90px] w-[90px] items-center justify-center rounded-full border border-gray-300 transition hover:scale-105">
              <Utensils size={35} />
            </div>
            <span className="text-sm font-medium">Food</span>
          </Link>
        </div>

        {/* Business */}
        <div className="flex snap-start flex-col items-center text-center md:min-w-[80px]">
          <Link href="/business">
            <div className="mb-2 flex h-[90px] w-[90px] items-center justify-center rounded-full border border-gray-300 transition hover:scale-105">
              <Briefcase size={35} />
            </div>
            <span className="text-sm font-medium">Business</span>
          </Link>
        </div>

        {/* Dating */}
        <div className="flex snap-start flex-col items-center text-center md:min-w-[80px]">
          <Link href="/dating">
            <div className="mb-2 flex h-[90px] w-[90px] items-center justify-center rounded-full border border-gray-300 transition hover:scale-105">
              <Heart size={35} />
            </div>
            <span className="text-sm font-medium">Dating</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Category;
