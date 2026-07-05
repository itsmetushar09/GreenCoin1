"use client"

import { SidebarProvider, useSidebar } from "@/components/layout/SidebarContext"
import { Sidebar } from "@/components/layout/Sidebar"
import { Navbar } from "@/components/layout/Navbar"
import { cn } from "@/lib/utils"

function DashboardInner({ children }: { children: React.ReactNode }) {
  const { isCollapsed, isMobile } = useSidebar()

  const leftOffset = isMobile ? "0px" : isCollapsed ? "72px" : "280px"

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div
        className="flex flex-1 flex-col transition-all duration-300"
        style={{ marginLeft: leftOffset }}
      >
        <Navbar />
        <main className="flex-1 bg-neutral-50 dark:bg-neutral-950">{children}</main>
      </div>
    </div>
  )
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardInner>{children}</DashboardInner>
    </SidebarProvider>
  )
}