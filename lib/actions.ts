"use server"

import { GoogleGenerativeAI } from "@google/generative-ai"

// Use the API key directly
const GEMINI_API_KEY = "AIzaSyA-kJB3cIho71woOkWCpYO_LOh1Hc7gZkk"

// Initialize the Google AI client once
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)

export async function analyzeCode(prompt: string): Promise<string> {
  try {
    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })

    // Enhanced prompt for better formatting
    const enhancedPrompt = `${prompt}

Please format your response in a clean, structured way with clear sections. Use simple formatting without markdown symbols like *, #, or **. Structure your response as:

ANALYSIS OVERVIEW:
[Brief summary]

CODE CORRECTNESS:
[Your assessment]

TIME & SPACE COMPLEXITY:
[Analysis with explanations]

CODE QUALITY:
[Best practices review]

IMPROVEMENTS:
[Specific suggestions]

SCORE: X/10

INTERVIEW TIPS:
[Helpful advice]

Keep the language conversational and encouraging while being thorough.`

    // Generate content
    const result = await model.generateContent(enhancedPrompt)
    const response = await result.response
    const text = response.text()

    if (!text || text.trim() === "") {
      throw new Error("Empty response from Gemini API")
    }

    // Clean up the response to remove markdown formatting
    const cleanedText = text
      .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold markdown
      .replace(/\*(.*?)\*/g, "$1") // Remove italic markdown
      .replace(/#{1,6}\s/g, "") // Remove heading markdown
      .replace(/`{1,3}(.*?)`{1,3}/g, "$1") // Remove code markdown
      .replace(/^\s*[-*+]\s/gm, "• ") // Convert markdown lists to bullet points
      .trim()

    return cleanedText
  } catch (error) {
    console.error("Gemini API Error:", error)
    throw new Error("Failed to analyze code. Please try again.")
  }
}

export async function evaluateHRAnswer(prompt: string): Promise<string> {
  try {
    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })

    // Enhanced prompt for better formatting
    const enhancedPrompt = `${prompt}

Please format your response in a clean, structured way without markdown symbols. Structure your response as:

ANSWER STRENGTHS:
[What was good about the response]

AREAS FOR IMPROVEMENT:
[What could be better]

BETTER APPROACH:
[Suggestions for improvement]

EXAMPLE RESPONSE:
[A sample better answer]

SCORE: X/10

FINAL TIPS:
[Encouraging advice]

Keep the tone supportive and constructive.`

    // Generate content
    const result = await model.generateContent(enhancedPrompt)
    const response = await result.response
    const text = response.text()

    if (!text || text.trim() === "") {
      throw new Error("Empty response from Gemini API")
    }

    // Clean up the response to remove markdown formatting
    const cleanedText = text
      .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold markdown
      .replace(/\*(.*?)\*/g, "$1") // Remove italic markdown
      .replace(/#{1,6}\s/g, "") // Remove heading markdown
      .replace(/`{1,3}(.*?)`{1,3}/g, "$1") // Remove code markdown
      .replace(/^\s*[-*+]\s/gm, "• ") // Convert markdown lists to bullet points
      .trim()

    return cleanedText
  } catch (error) {
    console.error("Gemini API Error:", error)
    throw new Error("Failed to evaluate HR answer. Please try again.")
  }
}

export async function generateCodingQuestion(company: string, difficulty: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })
    const prompt = `Generate a realistic coding interview question for the following company and difficulty level. Only return the question statement, no explanations or answers.

Company: ${company}
Difficulty: ${difficulty}

Format:
[Problem Statement]`
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    if (!text || text.trim() === "") {
      throw new Error("Empty response from Gemini API")
    }
    // Clean up the response to remove markdown formatting
    const cleanedText = text
      .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold markdown
      .replace(/\*(.*?)\*/g, "$1") // Remove italic markdown
      .replace(/#{1,6}\s/g, "") // Remove heading markdown
      .replace(/`{1,3}(.*?)`{1,3}/g, "$1") // Remove code markdown
      .replace(/^\s*[-*+]\s/gm, "• ") // Convert markdown lists to bullet points
      .trim()
    return cleanedText
  } catch (error) {
    console.error("Gemini API Error (generateCodingQuestion):", error)
    throw new Error("Failed to generate coding question. Please try again.")
  }
}
