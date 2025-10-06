"use client";

import { Button } from "@/components/ui/button";
import { LogIn, LogOut, Menu, UserPlus, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import AccountMenu from "./profile-dropdown";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathName = usePathname();
  const { data: session } = useSession();

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
    <header className="top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/assets/pradian-logo1.png"
            alt="Pradian Logo"
            width={80}
            height={80}
            className="object-contain"
          />
          <span className="text-xl font-black tracking-tight text-black uppercase">
            Pradian<span className="text-red-600">Event</span>
          </span>
        </Link>

        <div className="hidden items-center space-x-2 md:flex">
          {session ? (
            <AccountMenu email={session.user?.email} points={0} />
          ) : (
            <>
              <Button className="rounded-3xl bg-blue-600 text-white hover:bg-blue-700">
                <Link href="/register">Sign Up</Link>
              </Button>
              <Button className="rounded-3xl bg-blue-600 text-white hover:bg-blue-700">
                <Link href="/login">Sign in</Link>
              </Button>
            </>
          )}
        </div>

        <button
          className="p-2 md:hidden"
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

      {mobileMenuOpen && (
        <div className="absolute top-20 right-4 z-50 w-60 rounded-lg bg-white shadow-lg md:hidden">
          <div className="border-b px-4 py-3">
            <p className="text-sm font-bold text-black">Menu</p>
            <p className="text-xs text-gray-600">
              {session ? session.user?.email : "Not logged in"}
            </p>
          </div>
          <div className="flex flex-col divide-y">
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
              <>
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 text-sm font-medium hover:bg-gray-100"
                >
                  <UserPlus className="h-4 w-4 text-black" />
                  Profile
                </Link>
                <Link
                  href="/profile/change-password"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 text-sm font-medium hover:bg-gray-100"
                >
                  <Menu className="h-4 w-4 text-black" />
                  Change Password
                </Link>
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
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
