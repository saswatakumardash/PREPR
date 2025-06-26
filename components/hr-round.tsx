"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { PageHeader } from "./page-header"
import { AIResponseDisplay } from "./ai-response-display"
import { Loader2, MessageSquare, AlertCircle, Sparkles } from "lucide-react"
import type { HRQuestion } from "@/types"
import { evaluateHRAnswer } from "@/lib/actions"

const HR_QUESTIONS = [
  { id: 1, question: "Tell me about yourself", answer: "" },
  { id: 2, question: "What are your strengths?", answer: "" },
  { id: 3, question: "Why should we hire you?", answer: "" },
]

interface HRRoundProps {
  onSessionUpdate: (questions: HRQuestion[]) => void
}

export function HRRound({ onSessionUpdate }: HRRoundProps) {
  const [questions, setQuestions] = useState<HRQuestion[]>(HR_QUESTIONS)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>("")

  const handleAnswerChange = (id: number, answer: string) => {
    setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, answer } : q)))
  }

  const handleEvaluate = async () => {
    const unanswered = questions.filter((q) => !q.answer.trim())
    if (unanswered.length > 0) {
      setError("Please answer all questions before evaluation.")
      return
    }

    setLoading(true)
    setError("")

    try {
      const evaluatedQuestions = await Promise.all(
        questions.map(async (q) => {
          const prompt = `
Evaluate this HR interview answer:

**Question:** ${q.question}
**Answer:** ${q.answer}

Please provide constructive feedback including:
1. Strengths of the answer
2. Areas for improvement
3. Suggestions for better responses
4. Score out of 10

Be encouraging but honest in your evaluation.
        `

          const feedback = await evaluateHRAnswer(prompt)
          return { ...q, feedback }
        }),
      )

      setQuestions(evaluatedQuestions)
      onSessionUpdate(evaluatedQuestions)
    } catch (error) {
      console.error("Error evaluating HR answers:", error)
      setError(error instanceof Error ? error.message : "Failed to get AI feedback. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="HR Round"
        description="Practice common HR questions and get personalized feedback"
        icon={<MessageSquare className="h-8 w-8 text-purple-600" />}
      />

      {error && (
        <Card className="border-red-200 dark:border-red-800 bg-gradient-to-br from-red-50/50 to-orange-50/50 dark:from-red-900/10 dark:to-orange-900/10">
          <CardHeader>
            <CardTitle className="text-red-700 dark:text-red-300 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white/80 dark:bg-slate-800/80 p-4 rounded-xl border border-red-200/50 dark:border-red-800/50 backdrop-blur-sm">
              <p className="text-red-700 dark:text-red-300 font-medium">{error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-6">
        {questions.map((question, index) => (
          <Card key={question.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold">
                  {index + 1}
                </div>
                {question.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Type your answer here... Be specific and provide examples where possible."
                value={question.answer}
                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                className="min-h-[120px] resize-none"
              />
              {question.feedback && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-green-500" />
                    <h4 className="font-semibold text-green-700 dark:text-green-300">AI Feedback:</h4>
                  </div>
                  <AIResponseDisplay response={question.feedback} type="hr" />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center pt-4">
        <Button
          onClick={handleEvaluate}
          disabled={loading}
          size="lg"
          className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Evaluating Answers...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Evaluate All Answers
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
