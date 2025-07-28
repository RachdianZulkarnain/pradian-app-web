import { Copyright } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t bg-white text-black">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 text-sm sm:flex-row">
        {/* Logo & Brand */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/pradian-logo1.png"
            alt="Pradian logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <span className="hidden text-lg font-semibold sm:inline">
            Pradian
          </span>
        </Link>

        {/* Copyright Text */}
        <p className="flex items-center gap-1 text-center text-gray-500">
          <Copyright className="h-4 w-4" />
          {new Date().getFullYear()} Pradian. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
