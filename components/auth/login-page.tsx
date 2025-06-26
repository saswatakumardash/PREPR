"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TypingAnimation } from "../typing-animation"
import Image from "next/image"
import { signIn } from "next-auth/react"
import { CreatorModal } from "@/components/creator-modal"
import { ThemeProvider } from "@/contexts/theme-context"
import { ThemeToggle } from "@/components/theme-toggle"

interface LoginPageProps {
  onLogin?: () => void
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
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative" style={{ fontFamily: 'Inter, system-ui, Segoe UI, sans-serif', fontSize: '1.08rem' }}>
        {/* Dotted SVG background and animated dots */}
        <div className="dotted-bg" />
        <div className="animated-dot dot1" />
        <div className="animated-dot dot2" />
        <div className="animated-dot dot3" />
        {/* Theme Toggle Button */}
        <div className="absolute top-6 right-6 z-30">
          <ThemeToggle />
        </div>
        {/* Centered Card */}
        <div className="relative z-10 w-full max-w-md mx-auto flex-1 flex flex-col justify-center items-center">
          <Card className="w-full bg-neutral-950/95 border border-white/10 shadow-none rounded-xl p-8 flex flex-col items-center gap-6">
            {/* Logo */}
            <Image
              src="/logo-512.png"
              alt="PrepR Logo"
              width={64}
              height={64}
              className="object-contain mb-2"
            />
            {/* Title & Subtitle */}
            <CardTitle className="text-3xl font-bold text-white text-center">PrepR</CardTitle>
            <div className="text-sm text-white/60 font-medium text-center mb-2">AI Coding Interview Arena</div>
            {/* Typing Animation */}
            <div className="text-xl md:text-2xl font-semibold text-white min-h-[2.5rem] flex items-center justify-center w-full">
              <TypingAnimation
                texts={typingTexts}
                speed={80}
                deleteSpeed={40}
                pauseTime={1500}
                className="text-white"
              />
            </div>
            {/* Google Login Button */}
            <Button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              size="lg"
              className="w-full h-12 bg-black hover:bg-neutral-900 text-white border border-white/10 shadow-none text-lg font-semibold flex items-center justify-center gap-3"
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
              className="mt-2 px-3 py-1 text-xs font-semibold rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              About the Creator
            </button>
          </Card>
        </div>
        {/* Crafted by Section */}
        <div className="flex flex-col items-center gap-2 p-4 mt-8 mb-4 bg-black/80 border border-white/10 rounded-xl max-w-md mx-auto z-20">
          <span className="text-white/70 font-medium text-sm">Crafted by Saswata Kumar Dash for Allin</span>
          <a
            href="https://skds.site"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-400 hover:underline"
            tabIndex={0}
          >
            Visit Portfolio
          </a>
        </div>
        <CreatorModal open={showCreatorModal} onOpenChange={setShowCreatorModal} />
      </div>
    </ThemeProvider>
  )
}
