import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/ste-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen bg-white text-gray-900">
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar
          variant="inset"
          className="border-r-4 border-gray-900 bg-white shadow-[6px_0px_0px_0px_rgba(0,0,0,1)]"
        />

        <SidebarInset className="flex min-h-screen flex-col">
          <SiteHeader />

          <main className="flex-1 bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="rounded-md border-4 border-gray-900 bg-white p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:p-6">
              {children}
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </section>
  );
}
