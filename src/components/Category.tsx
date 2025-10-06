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
        Category <span>Event</span>
      </h3>

      <div className="grid grid-cols-3 gap-6 md:flex md:snap-x md:snap-mandatory md:justify-center md:gap-35 md:overflow-x-auto md:pb-4">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <div
              key={category.value}
              className="mt-2 flex snap-start flex-col items-center text-center md:min-w-[100px]"
            >
              <Link href={`/events?category=${category.value}`}>
                <div className="mb-3 flex h-[100px] w-[100px] items-center justify-center rounded-full bg-white shadow-md transition-all hover:scale-105 hover:shadow-lg">
                  <Icon size={36} className="text-black" />
                </div>
                <span className="text-lg font-semibold text-black">
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
