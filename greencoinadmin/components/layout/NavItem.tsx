"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface NavItemProps {
  icon: LucideIcon
  label: string
  href: string
  collapsed?: boolean
  onClick?: () => void
}

export function NavItem({ icon: Icon, label, href, collapsed = false, onClick }: NavItemProps) {
  const pathname = usePathname()
  const isActive = pathname === href || pathname.startsWith(href + "/")

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "mx-2 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
        "hover:bg-white/10 hover:text-white",
        isActive ? "bg-white/20 text-white" : "text-green-100",
        collapsed && "lg:justify-center lg:px-0"
      )}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span className={cn("transition-opacity duration-200", collapsed && "lg:hidden")}>
        {label}
      </span>
    </Link>
  )
}