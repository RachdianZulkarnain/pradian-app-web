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
      setCurrent((prev) => (prev + 1) % 2); // Karena hanya ada 2 gambar
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => setCurrent((prev) => (prev - 1 + 2) % 2);
  const handleNext = () => setCurrent((prev) => (prev + 1) % 2);

  return (
    <section className="w-full px-4 py-10 md:px-12 lg:px-24">
      <Carousel className="relative w-full">
        <CarouselContent
          style={{
            transform: `translateX(-${current * 100}%)`,
            transition: "transform 0.6s ease-in-out",
            display: "flex",
          }}
        >
          <CarouselItem className="w-full flex-shrink-0">
            <div className="relative h-[220px] w-full overflow-hidden rounded-xl md:h-[320px] lg:h-[420px]">
              <Image
                src="/assets/1.webp"
                alt="Slide 1"
                fill
                className="object-cover"
                priority
              />
            </div>
          </CarouselItem>

          <CarouselItem className="w-full flex-shrink-0">
            <div className="relative h-[220px] w-full overflow-hidden rounded-xl md:h-[320px] lg:h-[420px]">
              <Image
                src="/assets/2.webp"
                alt="Slide 2"
                fill
                className="object-cover"
              />
            </div>
          </CarouselItem>
        </CarouselContent>

        <CarouselPrevious
          className="absolute top-1/2 left-4 z-10 -translate-y-1/2 rounded-full bg-white/60 p-2 text-black shadow-md hover:bg-white/80"
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
        />
        <CarouselNext
          className="absolute top-1/2 right-4 z-10 -translate-y-1/2 rounded-full bg-white/60 p-2 text-black shadow-md hover:bg-white/80"
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
