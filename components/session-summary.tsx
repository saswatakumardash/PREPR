"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader } from "./page-header"
import { Download, FileText, Code, MessageSquare } from "lucide-react"
import type { SessionData } from "@/types"

interface SessionSummaryProps {
  sessionData: SessionData | null
}

export function SessionSummary({ sessionData }: SessionSummaryProps) {
  const handleExportPDF = () => {
    const content = `
PrepR - AI Coding Interview Arena
Session Summary
Generated on: ${new Date().toLocaleString()}

=== CODING ROUND ===
Company: ${sessionData?.coding?.company || "Not completed"}
Difficulty: ${sessionData?.coding?.difficulty || "Not completed"}
Question: ${sessionData?.coding?.question || "Not completed"}

Code:
${sessionData?.coding?.code || "No code written"}

AI Feedback:
${sessionData?.coding?.feedback || "No feedback available"}

=== HR ROUND ===
${
  sessionData?.hrQuestions
    ?.map(
      (q, i) => `
Question ${i + 1}: ${q.question}
Answer: ${q.answer}
Feedback: ${q.feedback || "No feedback available"}
`,
    )
    .join("\n") || "HR Round not completed"
}
    `.trim()

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `prepr-session-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (!sessionData || (!sessionData.coding?.code && !sessionData.hrQuestions?.some((q) => q.answer))) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Session Summary"
          description="Review your performance and export your session data"
          icon={<FileText className="h-8 w-8 text-indigo-600" />}
        />

        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
            <FileText className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No Session Data</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Complete the Coding Round or HR Round to see your session summary and get detailed performance insights.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader
          title="Session Summary"
          description="Review your performance and export your session data"
          icon={<FileText className="h-8 w-8 text-indigo-600" />}
        />
        <Button
          onClick={handleExportPDF}
          className="gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
        >
          <Download className="h-4 w-4" />
          Export Summary
        </Button>
      </div>

      {sessionData.coding?.code && (
        <Card className="hover:shadow-md transition-shadow border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
              <Code className="h-5 w-5" />
              Coding Round Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div>
                <span className="font-medium text-blue-700 dark:text-blue-300">Company:</span>
                <p className="text-sm">{sessionData.coding.company}</p>
              </div>
              <div>
                <span className="font-medium text-blue-700 dark:text-blue-300">Difficulty:</span>
                <p className="text-sm">{sessionData.coding.difficulty}</p>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Problem Statement:
              </h4>
              <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">{sessionData.coding.question}</p>
            </div>

            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Code className="h-4 w-4" />
                Your Solution:
              </h4>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                {sessionData.coding.code}
              </pre>
            </div>

            {sessionData.coding.feedback && (
              <div>
                <h4 className="font-medium mb-3 text-green-700 dark:text-green-300">AI Feedback & Analysis:</h4>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                  <pre className="text-sm whitespace-pre-wrap leading-relaxed">{sessionData.coding.feedback}</pre>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {sessionData.hrQuestions?.some((q) => q.answer) && (
        <Card className="hover:shadow-md transition-shadow border-purple-200 dark:border-purple-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
              <MessageSquare className="h-5 w-5" />
              HR Round Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {sessionData.hrQuestions
              .filter((q) => q.answer)
              .map((question, index) => (
                <div key={question.id} className="border-b pb-6 last:border-b-0">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold text-sm">
                      {index + 1}
                    </div>
                    <h4 className="font-medium">{question.question}</h4>
                  </div>

                  <div className="ml-9 space-y-3">
                    <div>
                      <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Your Answer:</span>
                      <p className="text-sm text-muted-foreground mt-1 bg-muted/50 p-3 rounded-lg">{question.answer}</p>
                    </div>

                    {question.feedback && (
                      <div>
                        <span className="text-sm font-medium text-green-700 dark:text-green-300">AI Feedback:</span>
                        <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg mt-1 border border-green-200 dark:border-green-800">
                          <pre className="text-sm whitespace-pre-wrap leading-relaxed">{question.feedback}</pre>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      )}

      <div className="text-center text-sm text-muted-foreground bg-muted/30 p-4 rounded-lg">
        <p>Session completed on {sessionData.timestamp?.toLocaleString() || new Date().toLocaleString()}</p>
        <p className="mt-1">Keep practicing to improve your interview skills! 🚀</p>
      </div>
    </div>
  )
}
