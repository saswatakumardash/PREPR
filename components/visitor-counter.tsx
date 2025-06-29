"use client"

import { useState, useEffect } from "react"
import { Users, Eye } from "lucide-react"

interface VisitorCounterProps {
  className?: string
}

export function VisitorCounter({ className = "" }: VisitorCounterProps) {
  const [count, setCount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [note, setNote] = useState<string | null>(null)

  useEffect(() => {
    // Show a fallback count immediately for better UX
    setCount(0)
    
    const trackVisit = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        // Try the robust Supabase API first, fallback to simple counter
        let incrementResponse = await fetch('/api/visitor-count', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        // If Supabase API fails, use fallback
        if (!incrementResponse.ok) {
          console.log('Supabase API not available, using fallback')
          incrementResponse = await fetch('/api/visitor-count-fallback', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          })
        }

        if (incrementResponse.ok) {
          const data = await incrementResponse.json()
          setCount(data.count)
          if (data.note) {
            setNote(data.note)
          }
        } else {
          setError('Failed to load visitor count')
        }
      } catch (err) {
        console.error('Error tracking visit:', err)
        setError('Failed to load visitor count')
      } finally {
        setIsLoading(false)
      }
    }

    // Delay the API call slightly to prioritize UI rendering
    const timer = setTimeout(trackVisit, 100)
    return () => clearTimeout(timer)
  }, [])

  if (error) {
    return (
      <div className={`flex items-center gap-2 text-xs text-red-500 dark:text-red-400 ${className}`}>
        <Eye className="w-3 h-3" />
        <span>Visitor count unavailable</span>
      </div>
    )
  }

  return (
    <div className={`flex items-center gap-2 text-xs font-medium ${className}`}>
      <div className="flex items-center gap-1">
        <Users className="w-3 h-3 text-blue-600 dark:text-blue-400" />
        <span className="text-gray-700 dark:text-white/70">Visitors:</span>
      </div>
      <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
        {count?.toLocaleString() || '0'}
      </span>
      {isLoading && (
        <div className="w-2 h-2 border border-blue-600 border-t-transparent rounded-full animate-spin ml-1" />
      )}
      {note && (
        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
          ({note})
        </span>
      )}
    </div>
  )
} 