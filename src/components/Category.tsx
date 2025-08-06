import {
  Music,
  Moon,
  Paintbrush,
  Utensils,
  Briefcase,
  Heart,
} from "lucide-react";
import Link from "next/link";

const categories = [
  { icon: Music, label: "Music", value: "music" },
  { icon: Moon, label: "Nightlife", value: "nightlife" },
  { icon: Paintbrush, label: "Arts", value: "art" },
  { icon: Utensils, label: "Food", value: "food" },
  { icon: Briefcase, label: "Business", value: "business" },
  { icon: Heart, label: "Dating", value: "dating" },
];

const Category = () => {
  return (
    <section className="container mx-auto px-4 py-10 md:px-12 lg:px-24">
      <h3 className="mb-8 text-3xl font-bold text-black">
        Category <span className="text-red-600">Event</span>
      </h3>

      <div className="grid grid-cols-3 gap-6 md:flex md:snap-x md:snap-mandatory md:justify-center md:gap-12 md:overflow-x-auto md:pb-4">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <div
              key={category.value}
              className="flex snap-start flex-col mt-2 items-center text-center md:min-w-[100px]"
            >
              <Link href={`/events?category=${category.value}`}>
                <div className="mb-3 flex h-[100px] w-[100px] items-center justify-center rounded-xl border-4 border-black bg-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-transform hover:scale-105">
                  <Icon size={36} className="text-black" />
                </div>
                <span className="text-sm font-semibold text-black">
                  {category.label}
                </span>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Category;
