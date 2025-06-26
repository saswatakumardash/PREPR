// Environment configuration
export const ENV = {
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",
  NODE_ENV: process.env.NODE_ENV || "development",
  IS_PRODUCTION: process.env.NODE_ENV === "production",
}

// Safe logging for debugging (server-side only)
if (typeof window === "undefined") {
  console.log("🔍 PrepR Environment Status:")
  console.log("- NODE_ENV:", ENV.NODE_ENV)
  console.log("- GEMINI_API_KEY:", ENV.GEMINI_API_KEY ? "✅ Set" : "❌ Not set")

  if (ENV.GEMINI_API_KEY) {
    console.log("🚀 AI features are ready!")
  }
}
