"use client";

import Image from "next/image";
import Link from "next/link";

const links = [
  { title: "Features", href: "#" },
  { title: "Solution", href: "#" },
  { title: "Customers", href: "#" },
  { title: "Pricing", href: "#" },
  { title: "Help", href: "#" },
  { title: "About", href: "#" },
];

const socials = [
  { name: "LinkedIn", href: "#", icon: "linkedin" },
  { name: "Instagram", href: "#", icon: "instagram" },
  { name: "TikTok", href: "#", icon: "tiktok" },
];

export default function FooterSection() {
  return (
    <footer className="bg-background border-muted py-16 md:py-20">
      <div className="container mx-auto px-6">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Link href="/" aria-label="Go home">
            <Image
              src="/assets/pradian-logo1.png"
              alt="Pradian Logo"
              width={90}
              height={90}
              className="object-contain"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="text-muted-foreground mb-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="hover:text-primary transition-colors"
            >
              {link.title}
            </Link>
          ))}
        </div>

        {/* Social & Copyright */}
        <div className="border-muted-foreground flex flex-col-reverse items-center justify-between gap-6 border-t pt-8 md:flex-row">
          {/* Copyright */}
          <p className="text-muted-foreground text-center text-sm md:text-left">
            © {new Date().getFullYear()} Pradian. All rights reserved.
          </p>

          {/* Social Media Icons */}
          <div className="flex flex-wrap justify-center gap-6 md:justify-end">
            {socials.map((social, index) => (
              <Link
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <use href={`#icon-${social.icon}`} />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ICON DEFINITIONS */}
      <svg style={{ display: "none" }}>
        <symbol id="icon-linkedin" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z" />
        </symbol>
        <symbol id="icon-instagram" viewBox="0 0 24 24">
          <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3" />
        </symbol>
        <symbol id="icon-tiktok" viewBox="0 0 24 24">
          <path d="M16.6 5.82s.51.5 0 0A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64c0 3.33 2.76 5.7 5.69 5.7c3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48" />
        </symbol>
      </svg>
    </footer>
  );
}
