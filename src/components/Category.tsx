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
    <section className="container mx-auto px-4 py-6">
      <h3 className="mb-6 text-3xl font-semibold">Category Event</h3>

      <div className="grid grid-cols-3 gap-4 md:flex md:snap-x md:snap-mandatory md:justify-center md:gap-40 md:overflow-x-auto md:pb-2">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <div
              key={category.value}
              className="flex snap-start flex-col items-center text-center md:min-w-[80px]"
            >
              <Link href={`/events?category=${category.value}`}>
                <div className="mb-2 flex h-[90px] w-[90px] items-center justify-center rounded-full border border-gray-300 transition hover:scale-105">
                  <Icon size={35} />
                </div>
                <span className="text-sm font-medium">{category.label}</span>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Category;
