"use client";

import { type Icon } from "@tabler/icons-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Disclosure } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

type NavItem = {
  title: string;
  url?: string;
  icon?: Icon;
  children?: NavItem[];
};

export function NavMain({ items }: { items: NavItem[] }) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) =>
            item.children ? (
              <Disclosure key={item.title}>
                {({ open }) => (
                  <div>
                    {/* Parent item with link and toggle */}
                    <SidebarMenuItem>
                      <div className="flex w-full items-center justify-between">
                        {/* Clickable main link */}
                        <Link href={item.url || "#"} className="flex-1">
                          <SidebarMenuButton tooltip={item.title}>
                            {item.icon && <item.icon className="h-4 w-4" />}
                            <span>{item.title}</span>
                          </SidebarMenuButton>
                        </Link>

                        {/* Chevron toggle */}
                        <Disclosure.Button as="div">
                          <button className="p-2">
                            <ChevronDown
                              className={`h-4 w-4 transition-transform ${
                                open ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                        </Disclosure.Button>
                      </div>
                    </SidebarMenuItem>

                    {/* Submenu items */}
                    <Disclosure.Panel className="mt-1 ml-6 space-y-1">
                      {item.children?.map((child) => (
                        <SidebarMenuItem key={child.title}>
                          <Link href={child.url || "#"}>
                            <SidebarMenuButton tooltip={child.title}>
                              <span>{child.title}</span>
                            </SidebarMenuButton>
                          </Link>
                        </SidebarMenuItem>
                      ))}
                    </Disclosure.Panel>
                  </div>
                )}
              </Disclosure>
            ) : (
              <Link href={item.url!} key={item.title}>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon className="h-4 w-4" />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </Link>
            ),
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
