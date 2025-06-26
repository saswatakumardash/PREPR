"use client"

export function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
            <span className="text-3xl font-black text-white">P</span>
          </div>
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20 animate-pulse"></div>
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl font-bold text-slate-800 mb-2">PrepR</h2>
        <p className="text-slate-600 mb-6">AI Coding Interview Arena</p>

        {/* Loading Spinner */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>

        <p className="text-sm text-slate-500 mt-4">Loading your interview arena...</p>
      </div>
    </div>
  )
}
