"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select"
import { MonacoEditor } from "./monaco-editor"
import { PageHeader } from "./page-header"
import { AIResponseDisplay } from "./ai-response-display"
import { Loader2, Code, Play, AlertCircle, Sparkles } from "lucide-react"
import { analyzeCode, generateCodingQuestion } from "@/lib/actions"
import { Input } from "@/components/ui/input"

const COMPANY_CATEGORIES = {
  FAANG: [
    "Meta (Facebook)",
    "Apple",
    "Amazon",
    "Netflix",
    "Google",
    "Microsoft",
    "Tesla",
    "Uber",
    "Airbnb",
    "LinkedIn",
    "Twitter (X)",
    "Spotify",
    "Dropbox",
    "Salesforce",
    "Adobe",
  ],
  Other: [
    "TCS",
    "Infosys",
    "Wipro",
    "Accenture",
    "Cognizant",
    "HCL",
    "Tech Mahindra",
    "Capgemini",
    "IBM",
    "Oracle",
    "SAP",
    "Deloitte",
    "PwC",
    "EY",
    "KPMG",
  ],
  OtherCompany: ["Other Company (Custom)"],
  Startup: ["Startup (Custom)"],
}

const QUESTIONS = {
  // FAANG Companies
  "Meta (Facebook)": {
    Easy: "Given an array of integers, find two numbers that add up to a target sum.",
    Medium: "Design a data structure for Least Recently Used (LRU) cache.",
    Hard: "Merge k sorted linked lists and return it as one sorted list.",
  },
  Apple: {
    Easy: "Reverse a string without using built-in reverse function.",
    Medium: "Find the longest substring without repeating characters.",
    Hard: "Design a system to handle millions of concurrent users.",
  },
  Amazon: {
    Easy: "Find the maximum element in an array.",
    Medium: "Implement a queue using two stacks.",
    Hard: "Design Amazon's recommendation system architecture.",
  },
  Netflix: {
    Easy: "Check if a string is a palindrome.",
    Medium: "Find the kth largest element in an array.",
    Hard: "Design a video streaming service like Netflix.",
  },
  Google: {
    Easy: "Given an array of integers, return indices of two numbers that add up to a target.",
    Medium: "Given a string s, find the length of the longest substring without repeating characters.",
    Hard: "Design Google Search's ranking algorithm.",
  },
  Microsoft: {
    Easy: "Implement a function to check if a binary tree is balanced.",
    Medium: "Find all anagrams in a string.",
    Hard: "Design Microsoft Teams' real-time messaging system.",
  },
  Tesla: {
    Easy: "Calculate the distance between two points.",
    Medium: "Implement a system to track vehicle locations.",
    Hard: "Design Tesla's autonomous driving decision system.",
  },
  Uber: {
    Easy: "Calculate the fare for a ride given distance and time.",
    Medium: "Design a system to match drivers with riders.",
    Hard: "Design Uber's real-time location tracking system.",
  },
  Airbnb: {
    Easy: "Find available properties in a given date range.",
    Medium: "Implement a booking system with conflict resolution.",
    Hard: "Design Airbnb's search and recommendation engine.",
  },
  LinkedIn: {
    Easy: "Find mutual connections between two users.",
    Medium: "Implement a system to suggest connections.",
    Hard: "Design LinkedIn's news feed algorithm.",
  },
  "Twitter (X)": {
    Easy: "Count characters in a tweet (considering emojis).",
    Medium: "Design a system to detect trending hashtags.",
    Hard: "Design Twitter's timeline generation system.",
  },
  Spotify: {
    Easy: "Create a playlist from given songs.",
    Medium: "Implement a music recommendation algorithm.",
    Hard: "Design Spotify's real-time music streaming architecture.",
  },
  Dropbox: {
    Easy: "Calculate storage space used by files.",
    Medium: "Implement file synchronization logic.",
    Hard: "Design Dropbox's distributed file storage system.",
  },
  Salesforce: {
    Easy: "Validate customer data fields.",
    Medium: "Implement a CRM contact management system.",
    Hard: "Design Salesforce's multi-tenant architecture.",
  },
  Adobe: {
    Easy: "Apply basic image filters (brightness, contrast).",
    Medium: "Implement undo/redo functionality for image editing.",
    Hard: "Design Adobe Creative Cloud's collaborative editing system.",
  },

  // Other Companies
  TCS: {
    Easy: "Write a function to reverse a string.",
    Medium: "Find the maximum sum of a contiguous subarray.",
    Hard: "Implement a distributed caching system.",
  },
  Infosys: {
    Easy: "Check if a number is prime.",
    Medium: "Implement a binary search tree.",
    Hard: "Design a banking transaction processing system.",
  },
  Wipro: {
    Easy: "Find the factorial of a number using recursion.",
    Medium: "Implement a stack using arrays.",
    Hard: "Design a healthcare management system.",
  },
  Accenture: {
    Easy: "Sort an array using bubble sort.",
    Medium: "Implement a hash table with collision handling.",
    Hard: "Design a consulting project management platform.",
  },
  Cognizant: {
    Easy: "Find the largest element in a 2D array.",
    Medium: "Implement breadth-first search in a graph.",
    Hard: "Design a financial risk assessment system.",
  },
  HCL: {
    Easy: "Convert decimal to binary.",
    Medium: "Implement a priority queue.",
    Hard: "Design an IT service management platform.",
  },
  "Tech Mahindra": {
    Easy: "Find the GCD of two numbers.",
    Medium: "Implement depth-first search in a tree.",
    Hard: "Design a telecommunications network management system.",
  },
  Capgemini: {
    Easy: "Check if a string contains only digits.",
    Medium: "Implement a circular queue.",
    Hard: "Design a digital transformation consulting platform.",
  },
  IBM: {
    Easy: "Find the sum of digits in a number.",
    Medium: "Implement a trie data structure.",
    Hard: "Design IBM Watson's AI processing pipeline.",
  },
  Oracle: {
    Easy: "Find duplicate elements in an array.",
    Medium: "Implement database indexing algorithm.",
    Hard: "Design Oracle's distributed database system.",
  },
  SAP: {
    Easy: "Calculate compound interest.",
    Medium: "Implement enterprise resource planning logic.",
    Hard: "Design SAP's ERP integration architecture.",
  },
  Deloitte: {
    Easy: "Calculate tax based on income brackets.",
    Medium: "Implement audit trail tracking system.",
    Hard: "Design Deloitte's consulting analytics platform.",
  },
  PwC: {
    Easy: "Validate financial data formats.",
    Medium: "Implement risk assessment algorithms.",
    Hard: "Design PwC's audit automation system.",
  },
  EY: {
    Easy: "Calculate depreciation using different methods.",
    Medium: "Implement compliance checking system.",
    Hard: "Design EY's financial advisory platform.",
  },
  KPMG: {
    Easy: "Generate financial reports from data.",
    Medium: "Implement fraud detection algorithms.",
    Hard: "Design KPMG's advisory services platform.",
  },
}

const LANGUAGE_OPTIONS = [
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
  { label: "C++", value: "cpp" },
  { label: "C", value: "c" },
  { label: "Go", value: "go" },
  { label: "Rust", value: "rust" },
  { label: "PHP", value: "php" },
  { label: "Ruby", value: "ruby" },
  { label: "Swift", value: "swift" },
  { label: "Kotlin", value: "kotlin" },
  { label: "C#", value: "csharp" },
  { label: "Scala", value: "scala" },
  { label: "Perl", value: "perl" },
  { label: "R", value: "r" },
  { label: "SQL", value: "sql" },
  { label: "Shell", value: "shell" },
]

interface CodingRoundProps {
  onSessionUpdate: (session: any) => void
}

export function CodingRound({ onSessionUpdate }: CodingRoundProps) {
  const [company, setCompany] = useState<string>("")
  const [difficulty, setDifficulty] = useState<string>("")
  const [code, setCode] = useState<string>("")
  const [feedback, setFeedback] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>("")
  const [language, setLanguage] = useState<string>("typescript")
  const [question, setQuestion] = useState<string>("")
  const [questionLoading, setQuestionLoading] = useState(false)
  const [questionCache, setQuestionCache] = useState<Record<string, string>>({})
  const [customCompany, setCustomCompany] = useState("")

  const effectiveCompany =
    company === "Other Company (Custom)" || company === "Startup (Custom)"
      ? customCompany.trim() || company
      : company

  const currentQuestion =
    effectiveCompany && difficulty
      ? question || "Loading question..."
      : "Please select a company and difficulty level to see the coding challenge."

  useEffect(() => {
    if (!effectiveCompany || !difficulty) {
      setQuestion("")
      return
    }
    const cacheKey = `${effectiveCompany}__${difficulty}`
    if (questionCache[cacheKey]) {
      setQuestion(questionCache[cacheKey])
      return
    }
    setQuestionLoading(true)
    setQuestion("Loading question...")
    generateCodingQuestion(effectiveCompany, difficulty)
      .then((q) => {
        setQuestion(q)
        setQuestionCache((prev) => ({ ...prev, [cacheKey]: q }))
      })
      .catch(() => {
        setQuestion("Failed to load question. Please try again.")
      })
      .finally(() => setQuestionLoading(false))
  }, [effectiveCompany, difficulty])

  const handleRunWithAI = async () => {
    if (!code.trim()) {
      setError("Please write some code before getting AI feedback.")
      return
    }

    setLoading(true)
    setError("")
    setFeedback("")

    try {
      const prompt = `
Analyze this coding solution for the following problem:

**Company:** ${effectiveCompany}
**Difficulty:** ${difficulty}
**Problem:** ${currentQuestion}

**Code Solution:**
\`\`\`
${code}
\`\`\`

Please provide comprehensive feedback including:
1. Code correctness and logic analysis
2. Time and space complexity evaluation
3. Code quality and best practices assessment
4. Specific suggestions for improvement
5. Overall score out of 10
6. Interview tips for this type of question

Format your response with clear sections and be constructive yet thorough.
    `

      const aiResponse = await analyzeCode(prompt)
      setFeedback(aiResponse)

      onSessionUpdate({
        company: effectiveCompany,
        difficulty,
        question: currentQuestion,
        code,
        feedback: aiResponse,
      })
    } catch (error) {
      console.error("Error analyzing code:", error)
      setError(error instanceof Error ? error.message : "Failed to get AI feedback. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Coding Round"
        description="Practice coding problems from top tech companies with AI-powered feedback and analysis"
        icon={<Code className="h-8 w-8 text-blue-600" />}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300 card-hover">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              Select Company
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={company} onValueChange={setCompany}>
              <SelectTrigger className="w-full h-12">
                <SelectValue placeholder="Choose your target company" />
              </SelectTrigger>
              <SelectContent className="max-h-80">
                <SelectGroup>
                  <SelectLabel className="text-blue-600 font-semibold">🚀 FAANG & Top Tech</SelectLabel>
                  {COMPANY_CATEGORIES.FAANG.map((comp) => (
                    <SelectItem key={comp} value={comp} className="py-2">
                      {comp}
                    </SelectItem>
                  ))}
                </SelectGroup>

                <SelectGroup>
                  <SelectLabel className="text-purple-600 font-semibold">🏢 Other Companies</SelectLabel>
                  {COMPANY_CATEGORIES.Other.map((comp) => (
                    <SelectItem key={comp} value={comp} className="py-2">
                      {comp}
                    </SelectItem>
                  ))}
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel className="text-gray-600 font-semibold">🌐 Other</SelectLabel>
                  {COMPANY_CATEGORIES.OtherCompany.map((comp) => (
                    <SelectItem key={comp} value={comp} className="py-2">
                      {comp}
                    </SelectItem>
                  ))}
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel className="text-pink-600 font-semibold">🚀 Startup</SelectLabel>
                  {COMPANY_CATEGORIES.Startup.map((comp) => (
                    <SelectItem key={comp} value={comp} className="py-2">
                      {comp}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {(company === "Other Company (Custom)" || company === "Startup (Custom)") && (
              <div className="mt-4">
                <Input
                  value={customCompany}
                  onChange={(e) => setCustomCompany(e.target.value)}
                  placeholder={company === "Startup (Custom)" ? "Enter startup name" : "Enter company name"}
                  className="w-full h-10 text-base rounded-lg border border-gray-400 dark:border-gray-600 px-3 py-2 mt-2"
                />
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 card-hover">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              Difficulty Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger className="w-full h-12">
                <SelectValue placeholder="Choose difficulty level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Easy" className="py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    Easy - Beginner Friendly
                  </div>
                </SelectItem>
                <SelectItem value="Medium" className="py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    Medium - Intermediate Level
                  </div>
                </SelectItem>
                <SelectItem value="Hard" className="py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    Hard - Advanced Challenge
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      <Card className="hover:shadow-lg transition-all duration-300 card-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Problem Statement
            {effectiveCompany && (
              <span className="ml-auto text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full">
                {effectiveCompany}
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900/20 p-6 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">{currentQuestion}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-all duration-300 card-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5" />
            Code Editor
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap items-center gap-4 mb-2">
            <label className="font-medium text-sm text-slate-700 dark:text-slate-300">Language:</label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent className="max-h-72">
                <SelectGroup>
                  {LANGUAGE_OPTIONS.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value} className="py-2">
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <MonacoEditor value={code} onChange={setCode} language={language} theme="vs-dark" />
          <div className="flex justify-center">
            <Button
              onClick={handleRunWithAI}
              disabled={loading || !effectiveCompany || !difficulty}
              size="lg"
              className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Analyzing Your Code...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Get AI Feedback
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

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

      {feedback && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-green-500" />
            <h3 className="text-xl font-bold text-green-700 dark:text-green-300">AI Analysis & Feedback</h3>
          </div>
          <AIResponseDisplay response={feedback} type="coding" />
        </div>
      )}
    </div>
  )
}
