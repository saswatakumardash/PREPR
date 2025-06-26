"use client"

import Image from "next/image"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "@/components/ui/button"
import { Info, LogOut } from "lucide-react"
import { useEffect, useState } from "react"

interface HeaderProps {
  onShowCreator: () => void
  onLogout?: () => void
}

function LiveClock() {
  const [time, setTime] = useState("")
  useEffect(() => {
    const update = () => {
      const now = new Date()
      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZoneName: "short"
      }
      // Remove the timezone abbreviation and add IST
      let t = now.toLocaleTimeString("en-IN", options)
      t = t.replace(/ GMT.*/, " IST")
      setTime(t)
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])
  return <span className="text-xs md:text-sm font-mono text-white/70 tracking-widest px-2">{time}</span>
}

export function Header({ onShowCreator, onLogout }: HeaderProps) {
  return (
    <header className="w-full border-b border-white/10 bg-black/95 py-4 px-0 flex items-center justify-between relative z-10">
      {/* Mobile: Only logo and PrepR text, centered */}
      <div className="flex items-center justify-center w-full sm:hidden">
        <Image
          src="/logo-512.png"
          alt="PrepR Logo"
          width={80}
          height={80}
          className="object-contain"
        />
        <span className="ml-3 text-2xl font-bold text-white leading-tight">PrepR</span>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          {onLogout && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onLogout}
              className="hover:bg-white/10 text-white"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
      {/* Desktop: Full header */}
      <div className="hidden sm:flex items-center gap-4 pl-4 flex-1">
        <Image
          src="/logo-512.png"
          alt="PrepR Logo"
          width={80}
          height={80}
          className="object-contain"
        />
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-white leading-tight">PrepR</span>
          <span className="text-xs text-white/60 font-medium">AI Coding Interview Arena</span>
        </div>
      </div>
      <div className="hidden sm:flex items-center gap-4 pr-4">
        <LiveClock />
        <Button
          variant="ghost"
          size="icon"
          onClick={onShowCreator}
          className="hover:bg-white/10 text-white"
        >
          <Info className="h-5 w-5" />
        </Button>
        <ThemeToggle />
        {onLogout && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onLogout}
            className="hover:bg-white/10 text-white"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        )}
      </div>
    </header>
  )
}
