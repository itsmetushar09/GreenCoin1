import Link from "next/link"
import { cn } from "@/lib/utils"

interface LogoProps {
  collapsed?: boolean
}

export function Logo({ collapsed = false }: LogoProps) {
  return (
    <Link href="/dashboard" className="flex items-center gap-3 px-4 py-5">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-xl">
        🌿
      </span>
      <span
        className={cn(
          "text-lg font-semibold tracking-tight text-white transition-all duration-300",
          collapsed && "lg:hidden"
        )}
      >
        GreenCoin
      </span>
    </Link>
  )
}