import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { PageHeader } from "@/components/page-header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <DashboardHeader />
      <main className="flex-1 pt-14 p-6">
        <PageHeader />
        {children}
      </main>
    </SidebarProvider>
  )
}
