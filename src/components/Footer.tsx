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
    <footer className="mt-16 border-t-4 border-black bg-white shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
      <div className="container mx-auto px-6 py-12 md:py-20">
        {/* Top Grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Logo + About */}
          <div>
            <Link href="/" aria-label="Go home" className="inline-block mb-4">
              <Image
                src="/assets/pradian-logo1.png"
                alt="Pradian Logo"
                width={90}
                height={90}
                className="object-contain"
              />
            </Link>
            <p className="text-sm text-gray-600 max-w-sm">
              Pradian empowers communities to create, manage, and explore events easily. From concerts to conferences, discover what moves you.
            </p>
          </div>

          {/* Quick Links 1 */}
          <div>
            <h4 className="mb-4 font-semibold text-black">Company</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              {links.slice(0, 3).map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="hover:text-red-600">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links 2 */}
          <div>
            <h4 className="mb-4 font-semibold text-black">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              {links.slice(3).map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="hover:text-red-600">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4 font-semibold text-black">Contact Us</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>Email: support@pradian.com</li>
              <li>Phone: +62 812 3456 7890</li>
              <li>Address: Jakarta, Indonesia</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t-2 border-black" />

        {/* Bottom Row */}
        <div className="flex flex-col-reverse items-center justify-between gap-6 md:flex-row">
          {/* Copyright */}
          <p className="text-center text-sm text-gray-600 md:text-left">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-black">Pradian</span>. All rights reserved.
          </p>

          {/* Social Media */}
          <div className="flex gap-6">
            {socials.map((social, index) => (
              <Link
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="text-gray-600 hover:text-red-600"
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

      {/* SVG ICONS */}
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
