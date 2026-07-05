"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Logo } from "./Logo"
import { NavItem } from "./NavItem"
import { useSidebar } from "./SidebarContext"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Truck,
  Gift,
  BarChart3,
  Building2,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const navigation = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Users", href: "/dashboard/users", icon: Users },
  { label: "Collectors", href: "/dashboard/collectors", icon: UserCheck },
  { label: "Pickup Requests", href: "/dashboard/pickup-requests", icon: Truck },
  { label: "Rewards", href: "/dashboard/rewards", icon: Gift },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "CSR Partners", href: "/dashboard/csr-partners", icon: Building2 },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function Sidebar() {
  const { isCollapsed, toggleCollapsed, isMobileOpen, setMobileOpen, isMobile } = useSidebar()

  const sidebarContent = (
    <div className="flex h-full flex-col bg-[hsl(var(--sidebar-bg))] text-[hsl(var(--sidebar-fg))]">
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-5">
        <Logo collapsed={isCollapsed} />
        {/* Collapse toggle - visible on tablet/desktop when not mobile */}
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapsed}
            className="hidden text-white hover:bg-white/10 lg:flex"
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => (
          <NavItem
            key={item.href}
            icon={item.icon}
            label={item.label}
            href={item.href}
            collapsed={isCollapsed}
            onClick={() => isMobile && setMobileOpen(false)}
          />
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t border-white/10 px-2 py-4">
        <NavItem
          icon={LogOut}
          label="Logout"
          href="/login"
          collapsed={isCollapsed}
          onClick={() => isMobile && setMobileOpen(false)}
        />
      </div>
    </div>
  )

  // Mobile: Sheet drawer
  if (isMobile) {
    return (
      <Sheet open={isMobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-[280px] p-0">
          {sidebarContent}
        </SheetContent>
      </Sheet>
    )
  }

  // Desktop / Tablet: Fixed sidebar
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-20 hidden border-r border-white/10 transition-all duration-300 md:block",
        isCollapsed ? "w-[72px]" : "w-[280px]"
      )}
    >
      {sidebarContent}
    </aside>
  )
}