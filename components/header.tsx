"use client"

import Image from "next/image"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "@/components/ui/button"
import { Info, LogOut } from "lucide-react"

interface HeaderProps {
  onShowCreator: () => void
  onLogout?: () => void
}

export function Header({ onShowCreator, onLogout }: HeaderProps) {
  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-b border-border/40">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20px 20px, currentColor 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-16 relative">
        <div className="flex justify-between items-start">
          <div className="text-center flex-1">
            {/* Logo and Title */}
            <div className="flex items-center justify-center gap-8 mb-8">
              <div className="relative">
                <Image
                  src="/logo-512.png"
                  alt="SKD Logo"
                  width={120}
                  height={120}
                  className="object-contain drop-shadow-xl"
                />
              </div>
              <div className="text-left">
                <h1
                  className="text-7xl md:text-8xl font-black tracking-tight mb-2"
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    background: "linear-gradient(135deg, #1e40af 0%, #7c3aed 50%, #1e40af 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textShadow: "0 0 30px rgba(30, 64, 175, 0.3)",
                  }}
                >
                  PrepR
                </h1>
                <div className="text-xl font-semibold text-slate-600 dark:text-slate-300 tracking-wide">
                  AI Coding Interview Arena
                </div>
              </div>
            </div>

            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8 font-medium">
              Master your coding interviews with intelligent feedback and comprehensive practice sessions
            </p>

            {/* Feature highlights */}
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { label: "Smart AI Feedback", color: "bg-blue-500" },
                { label: "Live Code Analysis", color: "bg-purple-500" },
                { label: "HR Interview Prep", color: "bg-green-500" },
                { label: "Interactive Learning", color: "bg-orange-500" },
              ].map((feature) => (
                <div
                  key={feature.label}
                  className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
                >
                  <div className={`w-2 h-2 rounded-full ${feature.color}`} />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{feature.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={onShowCreator}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-white/90 dark:hover:bg-slate-700/90 transition-all duration-200 shadow-lg"
            >
              <Info className="h-5 w-5" />
            </Button>
            <ThemeToggle />
            {onLogout && (
              <Button
                variant="outline"
                size="icon"
                onClick={onLogout}
                className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-white/90 dark:hover:bg-slate-700/90 transition-all duration-200 shadow-lg"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
