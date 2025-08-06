"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();

  const pathSegments = pathname.split("/").filter(Boolean);

  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    const label = segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

    return { label, href };
  });

  return (
    <header className="flex h-[var(--header-height)] shrink-0 items-center border-b-4 border-gray-900 bg-white px-4 shadow-[0px_4px_0px_0px_rgba(0,0,0,1)] transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-[var(--header-height)] lg:px-6">
      <div className="flex w-full items-center justify-between gap-2">
        {/* Left side: sidebar trigger and breadcrumbs */}
        <div className="flex items-center gap-3">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-6 bg-gray-400" />

          <nav className="flex items-center gap-2 text-sm font-bold text-gray-900">
            <Link
              href="/"
              className="transition-colors hover:text-blue-600 hover:underline"
            >
              Home
            </Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={crumb.href} className="flex items-center gap-2">
                <span className="text-gray-400">›</span>
                <Link
                  href={crumb.href}
                  className="transition-colors hover:text-blue-600 hover:underline"
                >
                  {crumb.label}
                </Link>
              </span>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
