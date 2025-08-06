"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();

  // Split path into segments
  const pathSegments = pathname.split("/").filter(Boolean);

  // Build breadcrumb items with corresponding URLs
  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");

    // Format the segment (replace hyphens, capitalize)
    const label = segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

    return { label, href };
  });

  return (
    <header className="flex h-[var(--header-height)] shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-[var(--header-height)]">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <nav className="text-muted-foreground text-base font-normal flex items-center gap-1">
          <Link href="/">Home</Link>
          {breadcrumbs.map((crumb, i) => (
            <span key={crumb.href} className="flex items-center gap-1">
              <span className="text-muted-foreground">›</span>
              <Link
                href={crumb.href}
                className="hover:underline hover:text-foreground transition-colors"
              >
                {crumb.label}
              </Link>
            </span>
          ))}
        </nav>
      </div>
    </header>
  );
}
