"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TypingAnimation } from "../typing-animation"
import { Chrome, Sparkles, Code, Users, Trophy, ArrowRight } from "lucide-react"
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
      <div className="min-h-screen bg-white dark:bg-black flex flex-col items-center justify-center p-4 relative" style={{ fontFamily: 'system-ui, Segoe UI, sans-serif', fontSize: '1.08rem' }}>
        {/* Theme Toggle Button */}
        <div className="absolute top-6 right-6 z-30">
          <ThemeToggle />
        </div>

        {/* Background Animation Removed */}

        <div className="relative z-10 w-full max-w-6xl mx-auto flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Branding & Animation */}
            <div className="text-center lg:text-left space-y-8">
              {/* Logo */}
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <div className="relative">
                  <Image
                    src="/logo-512.png"
                    alt="PrepR Logo"
                    width={120}
                    height={120}
                    className="object-contain drop-shadow-xl"
                  />
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur animate-pulse" />
                </div>
                <div>
                  <h1 className="text-5xl font-black text-slate-800 dark:text-slate-100">PrepR</h1>
                  <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">AI Coding Interview Arena</p>
                  {/* Creator Modal Trigger Button */}
                  <button
                    onClick={() => setShowCreatorModal(true)}
                    className="mt-2 px-3 py-1 text-xs font-semibold rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow hover:from-blue-600 hover:to-purple-700 transition-colors"
                  >
                    About the Creator
                  </button>
                </div>
              </div>

              {/* Typing Animation */}
              <div className="space-y-4">
                <div className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 min-h-[3rem] flex items-center justify-center lg:justify-start">
                  <TypingAnimation
                    texts={typingTexts}
                    speed={80}
                    deleteSpeed={40}
                    pauseTime={1500}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  />
                </div>
                <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                  Join thousands of developers preparing for their dream tech jobs with AI-powered feedback and
                  comprehensive practice sessions.
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Code, label: "Smart Code Analysis", color: "text-blue-500" },
                  { icon: Users, label: "HR Interview Prep", color: "text-purple-500" },
                  { icon: Trophy, label: "Track Progress", color: "text-green-500" },
                  { icon: Sparkles, label: "AI Feedback", color: "text-orange-500" },
                ].map((feature) => (
                  <div
                    key={feature.label}
                    className="flex items-center gap-3 p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300"
                  >
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                    <span className="font-medium text-slate-700 dark:text-slate-300">{feature.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Login Card */}
            <div className="flex justify-center">
              <Card className="w-full max-w-md bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-2xl">
                <CardHeader className="text-center space-y-4">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-3xl">🚀</span>
                  </div>
                  <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
                    Get Started <span className="text-2xl">✨</span>
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Sign in with Google to access your personalized interview preparation dashboard
                  </p>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Google Login Button */}
                  <Button
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    size="lg"
                    className="w-full h-12 bg-black hover:bg-neutral-900 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 group text-lg font-semibold flex items-center justify-center gap-3"
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
                        <span className="text-2xl">➡️</span>
                      </>
                    )}
                  </Button>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-muted" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">Trusted by developers worldwide</span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="text-center text-xs text-muted-foreground">
                    By continuing, you agree to our Terms of Service and Privacy Policy
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <CreatorModal open={showCreatorModal} onOpenChange={setShowCreatorModal} />

        {/* Crafted by Section */}
        <div className="flex flex-col items-center gap-4 p-6 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-black dark:to-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 max-w-2xl mx-auto mb-8 mt-8 z-20">
          <div className="flex items-center gap-4">
            <span className="text-slate-700 dark:text-slate-300 font-medium" style={{ fontFamily: 'system-ui, Segoe UI, sans-serif', fontSize: '1.1rem' }}>Crafted by Saswata Kumar Dash</span>
            <img src="/logo-512.png" alt="SKD Logo" width={120} height={120} className="object-contain" />
            <a
              href="https://skds.site"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:scale-110 transition-transform duration-200 cursor-pointer"
              tabIndex={0}
            >
              <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 7l-10 10M7 7h10v10" /></svg>
            </a>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}
