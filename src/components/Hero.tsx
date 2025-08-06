"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % 2);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => setCurrent((prev) => (prev - 1 + 2) % 2);
  const handleNext = () => setCurrent((prev) => (prev + 1) % 2);

  return (
    <section className="w-full px-4 py-10 md:px-12 lg:px-24">
      <Carousel className="relative w-full overflow-hidden rounded-xl border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
        <CarouselContent
          style={{
            transform: `translateX(-${current * 100}%)`,
            transition: "transform 0.6s ease-in-out",
            display: "flex",
          }}
        >
          {[1, 2].map((num) => (
            <CarouselItem key={num} className="w-full flex-shrink-0">
              <div className="relative h-[220px] w-full md:h-[320px] lg:h-[420px]">
                {/* Outer overflow and border radius is already handled in Carousel */}
                <Image
                  src={`/assets/${num}.webp`}
                  alt={`Slide ${num}`}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={num === 1}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious
          className="absolute top-1/2 left-4 z-10 -translate-y-1/2 rounded-full border-2 border-black bg-white text-black p-2 shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:bg-gray-100"
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
        />
        <CarouselNext
          className="absolute top-1/2 right-4 z-10 -translate-y-1/2 rounded-full border-2 border-black bg-white text-black p-2 shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:bg-gray-100"
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
        />
      </Carousel>
    </section>
  );
};

export default Hero;
