export interface Flashcard {
  id: number
  topic: string
  question: string
  answer: string
}

export interface HRQuestion {
  id: number
  question: string
  answer: string
  feedback?: string
}

export interface AIResponse {
  feedback: string
  score?: number
  suggestions?: string[]
}

export interface CodingSession {
  company: string
  difficulty: string
  question: string
  code: string
  feedback?: string
}

export interface SessionData {
  coding: CodingSession
  hrQuestions: HRQuestion[]
  timestamp: Date
}
