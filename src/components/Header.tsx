"use client";

import { Menu, X, LogIn, UserPlus, LogOut } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import AccountMenu from "./profile-dropdown";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathName = usePathname();
  const { data: session } = useSession();

  // Hide navbar on dashboard pages
  const hidePaths = [
    "/login",
    "/register",
    "/dashboard",
    "/dashboard/events",
    "/dashboard/events/create",
    "/dashboard/transactions",
    "/dashboard/transactions/manual",
    "/dashboard/tickets",
    "/dashboard/tickets/create",
    "/dashboard/voucher",
    "/dashboard/voucher/create",
    "/dashboard/settings",
    "/dashboard/settings/bank-details",
    "/dashboard/settings/change-password",
  ];

  if (hidePaths.includes(pathName)) return null;

  return (
    <header className="top-0 z-50 border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden rounded-2xl">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/assets/pradian-logo1.png"
            alt="Pradian Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <span className="text-xl font-black uppercase tracking-tight text-black">
            Pradian<span className="text-red-600">Event</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center space-x-2 md:flex">
          {session ? (
            <AccountMenu email={session.user?.email} points={0} />
          ) : (
            <>
              <Button
                variant="default"
                className="rounded-none border-2 border-black bg-blue-600 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-blue-700"
              >
                <Link href="/login">Login</Link>
              </Button>
              <Button
                variant="default"
                className="rounded-none border-2 border-black bg-green-600 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-green-700"
              >
                <Link href="/register">Sign-Up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden rounded border-2 border-black p-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-black" />
          ) : (
            <Menu className="h-6 w-6 text-black" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute right-4 top-[72px] z-50 w-60 rounded-none border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:hidden">
          <div className="border-b border-black px-4 py-3">
            <p className="text-sm font-bold text-black">Menu</p>
            <p className="text-xs text-gray-600">
              {session ? session.user?.email : "Not logged in"}
            </p>
          </div>
          <div className="flex flex-col divide-y divide-black">
            {!session ? (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 text-sm font-medium hover:bg-gray-100"
                >
                  <LogIn className="h-4 w-4 text-black" />
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 text-sm font-medium hover:bg-gray-100"
                >
                  <UserPlus className="h-4 w-4 text-black" />
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  signOut({ callbackUrl: "/" });
                }}
                className="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium hover:bg-gray-100"
              >
                <LogOut className="h-4 w-4 text-black" />
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
