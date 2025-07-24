import { Copyright } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t text-black">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 text-sm sm:flex-row">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/Logo2.png"
            alt="Pradian logo"
            width={40}
            height={40}
          />
          <span className="hidden text-lg font-semibold sm:inline">
            Pradian
          </span>
        </Link>

        <p className="flex items-center gap-1 text-center text-black/60">
          <Copyright className="h-4 w-4" />
          {new Date().getFullYear()} Pradian. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
