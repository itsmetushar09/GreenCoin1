"use client"

import { Menu, Search, Bell, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserMenu } from "./UserMenu"
import { useSidebar } from "./SidebarContext"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation"
import React from "react"

export function Navbar() {
  const { toggleCollapsed, isMobile, setMobileOpen } = useSidebar()
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  const breadcrumbSegments = pathname
    .split("/")
    .filter(Boolean)
    .map((segment, index, arr) => {
      const href = "/" + arr.slice(0, index + 1).join("/")
      const isLast = index === arr.length - 1
      const label = segment.charAt(0).toUpperCase() + segment.slice(1)
      return { label, href, isLast }
    })

  const handleHamburgerClick = () => {
    if (isMobile) {
      setMobileOpen(true)
    } else {
      toggleCollapsed()
    }
  }

  return (
    <header className="sticky top-0 z-30 flex h-[72px] items-center gap-4 border-b bg-white px-4 shadow-sm dark:bg-neutral-900 md:px-6">
      {/* Left section: hamburger + breadcrumb */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleHamburgerClick}
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="hidden md:block">
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbSegments.length === 0 ? (
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              ) : (
                breadcrumbSegments.map((segment, i) => (
                  <React.Fragment key={segment.href}>
                    <BreadcrumbItem>
                      {segment.isLast ? (
                        <BreadcrumbPage>{segment.label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={segment.href}>{segment.label}</BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {!segment.isLast && <BreadcrumbSeparator />}
                  </React.Fragment>
                ))
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right section */}
      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-64 rounded-lg pl-8 focus-visible:ring-green-600 md:w-80"
          />
        </div>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Bell className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
        <UserMenu />
      </div>
    </header>
  )
}