"use client"

import { useState, useEffect } from "react"
import { Users } from "lucide-react"

interface VisitorCounterProps {
  className?: string
}

export function VisitorCounter({ className = "" }: VisitorCounterProps) {
  const [count, setCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchCount = async () => {
      try {
        setIsLoading(true)
        
        // Get current count from Supabase
        const response = await fetch('/api/visitor-count', {
          method: 'GET',
        })

        if (response.ok) {
          const data = await response.json()
          setCount(data.count || 0)
        }
      } catch (error) {
        console.error('Error fetching visitor count:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCount()
  }, [])

  const incrementCount = async () => {
    try {
      const response = await fetch('/api/visitor-count', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const data = await response.json()
        setCount(data.count || 0)
      }
    } catch (error) {
      console.error('Error incrementing visitor count:', error)
    }
  }

  // Increment on first load only
  useEffect(() => {
    const hasIncremented = sessionStorage.getItem('visitor_incremented')
    if (!hasIncremented) {
      incrementCount()
      sessionStorage.setItem('visitor_incremented', 'true')
    }
  }, [])

  return (
    <div className={`flex items-center gap-2 text-xs font-medium ${className}`}>
      <div className="flex items-center gap-1">
        <Users className="w-3 h-3 text-blue-600 dark:text-blue-400" />
        <span className="text-gray-700 dark:text-white/70">Visitors:</span>
      </div>
      <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
        {count.toLocaleString()}
      </span>
      
      {isLoading && (
        <div className="w-2 h-2 border border-blue-600 border-t-transparent rounded-full animate-spin ml-1" />
      )}
    </div>
  )
}