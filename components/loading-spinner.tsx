"use client"

import { Loader2 } from "lucide-react"

interface LoadingSpinnerProps {
  text?: string
  size?: "sm" | "md" | "lg"
}

export function LoadingSpinner({ text = "Loading...", size = "md" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  }

  return (
    <div className="flex items-center justify-center gap-2 py-8">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-blue-500`} />
      <span className="text-muted-foreground animate-pulse">{text}</span>
    </div>
  )
}
