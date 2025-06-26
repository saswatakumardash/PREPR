"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, TrendingUp, Lightbulb, Star, Target, Trophy } from "lucide-react"

interface AIResponseDisplayProps {
  response: string
  type: "coding" | "hr"
}

export function AIResponseDisplay({ response, type }: AIResponseDisplayProps) {
  // Parse the structured response
  const sections = parseResponse(response)

  const getIcon = (sectionTitle: string) => {
    const title = sectionTitle.toLowerCase()
    if (title.includes("score")) return <Star className="h-5 w-5 text-yellow-500" />
    if (title.includes("strength") || title.includes("correct"))
      return <CheckCircle className="h-5 w-5 text-green-500" />
    if (title.includes("improvement") || title.includes("quality"))
      return <TrendingUp className="h-5 w-5 text-blue-500" />
    if (title.includes("tip") || title.includes("advice")) return <Lightbulb className="h-5 w-5 text-orange-500" />
    if (title.includes("example") || title.includes("approach")) return <Target className="h-5 w-5 text-purple-500" />
    return <Trophy className="h-5 w-5 text-indigo-500" />
  }

  const getSectionColor = (sectionTitle: string) => {
    const title = sectionTitle.toLowerCase()
    if (title.includes("score")) return "border-yellow-200 dark:border-yellow-800 bg-yellow-50/50 dark:bg-yellow-900/10"
    if (title.includes("strength") || title.includes("correct"))
      return "border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/10"
    if (title.includes("improvement") || title.includes("quality"))
      return "border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/10"
    if (title.includes("tip") || title.includes("advice"))
      return "border-orange-200 dark:border-orange-800 bg-orange-50/50 dark:bg-orange-900/10"
    if (title.includes("example") || title.includes("approach"))
      return "border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-900/10"
    return "border-indigo-200 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-900/10"
  }

  return (
    <div className="space-y-4">
      {sections.map((section, index) => (
        <Card key={index} className={`${getSectionColor(section.title)} hover:shadow-md transition-all duration-300`}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3 text-lg">
              {getIcon(section.title)}
              <span className="font-semibold">{section.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white/80 dark:bg-slate-800/80 p-4 rounded-xl backdrop-blur-sm">
              {section.content.split("\n").map((line, lineIndex) => {
                if (line.trim() === "") return <br key={lineIndex} />

                // Handle bullet points
                if (line.startsWith("• ")) {
                  return (
                    <div key={lineIndex} className="flex items-start gap-2 mb-2">
                      <div className="w-2 h-2 bg-current rounded-full mt-2 flex-shrink-0 opacity-60" />
                      <p className="text-sm leading-relaxed">{line.substring(2)}</p>
                    </div>
                  )
                }

                // Handle score lines
                if (line.toLowerCase().includes("score:")) {
                  return (
                    <div
                      key={lineIndex}
                      className="flex items-center gap-2 p-3 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg mb-2"
                    >
                      <Star className="h-5 w-5 text-yellow-500" />
                      <span className="font-bold text-lg text-yellow-700 dark:text-yellow-300">{line}</span>
                    </div>
                  )
                }

                // Regular paragraphs
                return (
                  <p key={lineIndex} className="text-base leading-relaxed mb-2 text-slate-700 dark:text-slate-300" style={{ fontFamily: 'system-ui, Segoe UI, sans-serif' }}>
                    {line}
                  </p>
                )
              })}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function parseResponse(response: string) {
  const sections = []
  const lines = response.split("\n")
  let currentSection = { title: "", content: "" }

  for (const line of lines) {
    // Check if line is a section header (all caps with colon)
    if (line.match(/^[A-Z\s&]+:$/)) {
      // Save previous section if it exists
      if (currentSection.title) {
        sections.push({ ...currentSection })
      }
      // Start new section
      currentSection = {
        title: line.replace(":", ""),
        content: "",
      }
    } else if (line.trim()) {
      // Add content to current section
      currentSection.content += (currentSection.content ? "\n" : "") + line
    }
  }

  // Add the last section
  if (currentSection.title) {
    sections.push(currentSection)
  }

  // If no sections were found, treat the whole response as one section
  if (sections.length === 0) {
    sections.push({
      title: "AI Analysis",
      content: response,
    })
  }

  return sections
}
