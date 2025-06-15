"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Target, Activity, Apple, BarChart3, User } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Ziele", href: "/goals", icon: Target },
  { name: "Aktivitäten", href: "/activities", icon: Activity },
  { name: "Ernährung", href: "/nutrition", icon: Apple },
  { name: "Statistiken", href: "/stats", icon: BarChart3 },
  { name: "Profil", href: "/profile", icon: User },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="bg-white border-t md:border-t-0 md:border-r">
      <div className="flex md:flex-col overflow-x-auto md:overflow-x-visible">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col md:flex-row items-center justify-center md:justify-start space-y-1 md:space-y-0 md:space-x-3 px-3 py-2 md:px-4 md:py-3 text-sm font-medium transition-colors min-w-[80px] md:min-w-0",
                isActive ? "text-green-600 bg-green-50" : "text-gray-600 hover:text-green-600 hover:bg-green-50",
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs md:text-sm">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
