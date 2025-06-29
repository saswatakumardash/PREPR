"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TypingAnimation } from "../typing-animation"
import { VisitorCounter } from "../visitor-counter"
import { CreatorModal } from "@/components/creator-modal"
import { ThemeProvider } from "@/contexts/theme-context"
import { ThemeToggle } from "@/components/theme-toggle"

interface LoginPageProps {
  onLogin?: () => void
}

function LiveClock() {
  const [time, setTime] = useState("")
  useEffect(() => {
    const update = () => {
      const now = new Date()
      const options = {
        hour: "2-digit" as const,
        minute: "2-digit" as const,
        second: "2-digit" as const,
        hour12: false,
        timeZoneName: "short" as const
      }
      let t = now.toLocaleTimeString("en-IN", options)
      t = t.replace(/ GMT.*/, " IST")
      setTime(t)
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])
  return <span className="text-xs md:text-sm font-mono tracking-widest px-2 text-black dark:text-white/70">{time}</span>
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showCreatorModal, setShowCreatorModal] = useState(false)

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    await signIn("google", { callbackUrl: "/" })
    setIsLoading(false)
  }

  const typingTexts = [
    "Master Coding Interviews",
    "Practice with AI Feedback",
    "Ace Technical Rounds",
    "Build Confidence",
    "Land Your Dream Job",
  ]

  return (
    <ThemeProvider defaultTheme="dark" storageKey="prepr-ui-theme">
      <div className="min-h-screen flex flex-col items-center justify-center p-4 relative bg-white dark:bg-black transition-colors duration-200" style={{ fontFamily: 'Inter, system-ui, Segoe UI, sans-serif', fontSize: '1.08rem' }}>
        {/* Dotted SVG background and animated dots */}
        <div className="dotted-bg" />
        <div className="animated-dot dot1" />
        <div className="animated-dot dot2" />
        <div className="animated-dot dot3" />
        {/* Theme Toggle & Clock */}
        <div className="absolute top-6 right-6 z-30 flex flex-col items-end gap-2">
          <ThemeToggle />
          <LiveClock />
        </div>
        {/* Centered Card */}
        <div className="relative z-10 w-full max-w-md mx-auto flex-1 flex flex-col justify-center items-center">
          <Card className="w-full shadow-none rounded-xl p-8 flex flex-col items-center gap-6 border transition-colors duration-200
            bg-white text-black border-gray-200
            dark:bg-neutral-950 dark:text-white dark:border-white/10">
            {/* Logo */}
            <Image
              src="/logo-512.png"
              alt="PrepR Logo"
              width={120}
              height={120}
              className="object-contain mb-2"
            />
            {/* Title & Subtitle */}
            <CardTitle className="text-3xl font-bold text-center dark:text-white text-black">PrepR</CardTitle>
            <div className="text-sm font-medium text-center mb-2 dark:text-white/60 text-gray-600">AI Coding Interview Arena</div>
            {/* Typing Animation */}
            <div className="text-xl md:text-2xl font-semibold min-h-[2.5rem] flex items-center justify-center w-full dark:text-white text-black">
              <TypingAnimation
                texts={typingTexts}
                speed={80}
                deleteSpeed={40}
                pauseTime={1500}
                className="dark:text-white text-black"
              />
            </div>
            {/* Google Login Button */}
            <Button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              size="lg"
              className="w-full h-12 bg-black hover:bg-neutral-900 text-white border border-white/10 shadow-none text-lg font-semibold flex items-center justify-center gap-3 dark:bg-black dark:text-white dark:border-white/10 bg-gray-900 text-white border-gray-200 hover:bg-gray-800 transition-colors duration-200"
            >
              {isLoading ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Signing you in...</span>
                </div>
              ) : (
                <>
                  <span className="inline-flex items-center justify-center">
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google Logo" width={24} height={24} className="mr-2 bg-white rounded-full p-0.5" />
                  </span>
                  Continue with Google
                </>
              )}
            </Button>
            {/* About the Creator Button */}
            <button
              onClick={() => setShowCreatorModal(true)}
              className="mt-2 px-3 py-1 text-xs font-semibold rounded-lg bg-gray-100 hover:bg-gray-200 text-black dark:bg-white/10 dark:hover:bg-white/20 dark:text-white transition-colors"
            >
              About the Creator
            </button>
          </Card>
        </div>
        {/* Crafted by Section */}
        <div className="flex flex-col items-center gap-2 p-4 mt-8 mb-4 bg-gray-100 border border-gray-200 rounded-xl max-w-md mx-auto z-20 dark:bg-black/80 dark:border-white/10">
          <span className="font-medium text-sm text-gray-700 dark:text-white/70">Crafted by Saswata Kumar Dash</span>
          <a
            href="https://skds.site"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:underline dark:text-blue-400"
            tabIndex={0}
          >
            Visit Portfolio
          </a>
          {/* Visitor Counter */}
          <div className="mt-2 pt-2 border-t border-gray-300 dark:border-white/20">
            <VisitorCounter />
          </div>
        </div>
        <CreatorModal open={showCreatorModal} onOpenChange={setShowCreatorModal} />
      </div>
    </ThemeProvider>
  )
}
