"use client"

import { useState, useEffect } from "react"
import { ThemeProvider } from "@/contexts/theme-context"
import { CodingRound } from "@/components/coding-round"
import { HRRound } from "@/components/hr-round"
import { Flashcards } from "@/components/flashcards"
import { SessionSummary } from "@/components/session-summary"
import { LoginPage } from "@/components/auth/login-page"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { SessionData, HRQuestion } from "@/types"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CreatorModal } from "@/components/creator-modal"
import { Loading } from "@/components/loading"
import { useSession, signOut } from "next-auth/react"

export default function App() {
  const { data: session, status } = useSession();

  const [sessionData, setSessionData] = useState<SessionData>({
    coding: {
      company: "",
      difficulty: "",
      question: "",
      code: "",
    },
    hrQuestions: [],
    timestamp: new Date(),
  })

  const [showCreatorModal, setShowCreatorModal] = useState(false)

  if (status === "loading") {
    return <Loading />
  }

  if (!session) {
    return (
      <ThemeProvider defaultTheme="dark" storageKey="prepr-ui-theme">
        <LoginPage />
      </ThemeProvider>
    )
  }

  const handleCodingSessionUpdate = (codingSession: any) => {
    setSessionData((prev) => ({
      ...prev,
      coding: codingSession,
      timestamp: new Date(),
    }))
  }

  const handleHRSessionUpdate = (hrQuestions: HRQuestion[]) => {
    setSessionData((prev) => ({
      ...prev,
      hrQuestions,
      timestamp: new Date(),
    }))
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="prepr-ui-theme">
      <div className="min-h-screen bg-black text-foreground flex flex-col" style={{ fontFamily: 'Inter, system-ui, Segoe UI, sans-serif', fontSize: '1.12rem', letterSpacing: '-0.01em' }}>
        {/* Header */}
        <Header onShowCreator={() => setShowCreatorModal(true)} onLogout={() => signOut({ callbackUrl: "/" })} />

        {/* Main Content */}
        <main className="flex-1">
          <div className="container mx-auto px-4 py-12">
            <Tabs defaultValue="coding" className="w-full">
              {/* Enhanced Tab Navigation */}
              <div className="mb-10">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-neutral-900 p-1 rounded-xl h-auto border border-neutral-800">
                  <TabsTrigger
                    value="coding"
                    className="data-[state=active]:bg-background data-[state=active]:shadow-md transition-all duration-200 py-3 px-4 rounded-lg font-medium"
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-sm md:text-base">Coding</span>
                      <span className="text-xs text-muted-foreground">Practice Problems</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger
                    value="hr"
                    className="data-[state=active]:bg-background data-[state=active]:shadow-md transition-all duration-200 py-3 px-4 rounded-lg font-medium"
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-sm md:text-base">HR Round</span>
                      <span className="text-xs text-muted-foreground">Interview Prep</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger
                    value="flashcards"
                    className="data-[state=active]:bg-background data-[state=active]:shadow-md transition-all duration-200 py-3 px-4 rounded-lg font-medium"
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-sm md:text-base">Flashcards</span>
                      <span className="text-xs text-muted-foreground">Quick Review</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger
                    value="summary"
                    className="data-[state=active]:bg-background data-[state=active]:shadow-md transition-all duration-200 py-3 px-4 rounded-lg font-medium"
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-sm md:text-base">Summary</span>
                      <span className="text-xs text-muted-foreground">Your Progress</span>
                    </div>
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Tab Content with Page-like Styling */}
              <div className="animate-in fade-in-50 duration-300">
                <TabsContent value="coding" className="mt-0">
                  <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-8 shadow-lg">
                    <CodingRound onSessionUpdate={handleCodingSessionUpdate} />
                  </div>
                </TabsContent>

                <TabsContent value="hr" className="mt-0">
                  <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-8 shadow-lg">
                    <HRRound onSessionUpdate={handleHRSessionUpdate} />
                  </div>
                </TabsContent>

                <TabsContent value="flashcards" className="mt-0">
                  <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-8 shadow-lg">
                    <Flashcards />
                  </div>
                </TabsContent>

                <TabsContent value="summary" className="mt-0">
                  <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-8 shadow-lg">
                    <SessionSummary sessionData={sessionData} />
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </main>

        {/* Footer */}
        <Footer />

        {/* Creator Modal */}
        <CreatorModal open={showCreatorModal} onOpenChange={setShowCreatorModal} />
      </div>
    </ThemeProvider>
  )
}
