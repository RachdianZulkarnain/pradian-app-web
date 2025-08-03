"use client";

import {
  IconDashboard,
  IconListDetails,
  IconTicket,
  IconDiscount2,
  IconReceipt2,
  IconSettings,
} from "@tabler/icons-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Transactions",
      url: "/dashboard/transactions",
      icon: IconReceipt2,
      children: [
        {
          title: "Manual Transaction",
          url: "/dashboard/transactions/manual",
        },
      ],
    },
    {
      title: "All Events",
      url: "/dashboard/events",
      icon: IconListDetails,
      children: [
        {
          title: "Create Event",
          url: "/dashboard/events/create",
        },
      ],
    },
    {
      title: "Tickets",
      url: "/dashboard/tickets",
      icon: IconTicket,
      children: [
        {
          title: "Create Ticket",
          url: "/dashboard/tickets/create",
        },
      ],
    },
    {
      title: "Voucher",
      url: "/dashboard/voucher",
      icon: IconDiscount2,
      children: [
        {
          title: "Create Voucher",
          url: "/dashboard/voucher/create",
        },
      ],
    },
    {
      title: "Settings",
      url: "/dashboard/Settings",
      icon: IconSettings,
      children: [
        {
          title: "Bank Details",
          url: "/dashboard/settings/Bank Details",
        },
        {
          title: "Change Password",
          url: "/dashboard/settings/change password",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/dashboard" className="flex items-center space-x-2">
                <Image
                  src="/assets/pradian-logo1.png"
                  alt="Pradian Logo"
                  width={50}
                  height={50}
                  className="object-contain"
                />
                <span className="text-xl font-bold text-black">
                  Pradian<span className="text-red-600">Event</span>
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
