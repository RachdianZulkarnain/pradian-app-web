"use client";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus } from "lucide-react";
import { usePathname } from "next/navigation";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathName = usePathname();

  if (pathName === "/login" || pathName === "/register") {
    return null;
  }

  return (
    <header className="top-0 right-0 left-0 z-50 border-b bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 sm:py-4">
        {/* Logo + Brand */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/assets/pradian-logo1.png"
            alt="Pradian Logo"
            width={100}
            height={100}
            className="object-contain"
          />
          <span className="text-xl font-bold text-black">
            Pradian<span className="text-red-600">Event</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center space-x-2 md:flex">
          <Button className="px-4 py-2 text-sm sm:text-base">
            <Link href="/login">Login</Link>
          </Button>
          <Button className="px-4 py-2 text-sm sm:text-base">
            <Link href="/register">Sign-Up</Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-gray-700" />
          ) : (
            <Menu className="h-6 w-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-14 right-2 z-50 w-60 rounded-md border bg-white shadow-lg md:hidden">
          <div className="px-4 py-3">
            <p className="text-sm font-medium">Menu</p>
            <p className="text-xs text-gray-500">0 points</p>
          </div>
          <div className="border-t">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
            >
              <LogIn className="h-4 w-4 text-gray-700" />
              Login
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
            >
              <UserPlus className="h-4 w-4 text-gray-700" />
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
