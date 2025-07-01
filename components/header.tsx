"use client"

import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Trophy, UserIcon, LogOut } from "lucide-react"

interface HeaderProps {
  user: any
}

export function Header({ user }: HeaderProps) {
  const router = useRouter()
  const supabase = createClient()
  const points = 42

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      router.replace("/auth")
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }

  const handleProfileClick = () => {
    router.push("/profile")
  }

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg">
            <Trophy className="w-4 h-4 text-green-600" />
          </div>
          <h1 className="text-xl font-bold text-green-600">HabitHero</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
            <Trophy className="h-4 w-4 text-green-600" />
            <span className="font-semibold text-green-700">{points} Punkte</span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user?.user_metadata?.avatar_url || "/placeholder.svg"} />
                  <AvatarFallback className="bg-green-100 text-green-600">
                    {user?.email?.charAt(0).toUpperCase() || "?"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuItem onClick={handleProfileClick}>
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Profil bearbeiten</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Abmelden</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
