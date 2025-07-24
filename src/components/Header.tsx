"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="w-full border-b bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 sm:py-4">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/assets/logo2.png"
            alt="Pradian Logo"
            width={70}
            height={70}
            className="object-contain"
          />
          <span className="text-lg font-bold text-gray-800 sm:text-xl">
            Pradian
          </span>
        </Link>

        <div className="flex items-center space-x-2">
          <Button className="rounded-full px-4 py-2 text-sm sm:text-base">
            <Link href="/sign-in">Login</Link>
          </Button>
          <Button className="rounded-full px-4 py-2 text-sm sm:text-base">
            <Link href="/sign-up">Register</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
