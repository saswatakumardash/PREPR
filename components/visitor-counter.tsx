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
        console.log('Fetching visitor count...')
        
        // Get current count from Supabase
        const response = await fetch('/api/visitor-count', {
          method: 'GET',
        })

        console.log('GET response status:', response.status)

        if (response.ok) {
          const data = await response.json()
          console.log('GET response data:', data)
          setCount(data.count || 0)
        } else {
          console.error('GET request failed:', response.status)
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
      console.log('Incrementing visitor count...')
      const response = await fetch('/api/visitor-count', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      console.log('POST response status:', response.status)

      if (response.ok) {
        const data = await response.json()
        console.log('POST response data:', data)
        setCount(data.count || 0)
      } else {
        console.error('POST request failed:', response.status)
        const errorData = await response.json()
        console.error('Error data:', errorData)
      }
    } catch (error) {
      console.error('Error incrementing visitor count:', error)
    }
  }

  // Increment on first load only
  useEffect(() => {
    const hasIncremented = sessionStorage.getItem('visitor_incremented')
    console.log('Has incremented before:', hasIncremented)
    if (!hasIncremented) {
      console.log('First visit, incrementing count...')
      incrementCount()
      sessionStorage.setItem('visitor_incremented', 'true')
    } else {
      console.log('Returning visitor, not incrementing')
    }
  }, [])

  console.log('Current count state:', count)

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