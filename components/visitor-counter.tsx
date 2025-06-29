"use client"

import { useState, useEffect, useRef } from "react"
import { Users, Eye } from "lucide-react"

interface VisitorCounterProps {
  className?: string
}

export function VisitorCounter({ className = "" }: VisitorCounterProps) {
  const [count, setCount] = useState<number | null>(null)
  const [activeViewers, setActiveViewers] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isNewVisitor, setIsNewVisitor] = useState<boolean | null>(null)
  const heartbeatInterval = useRef<NodeJS.Timeout | null>(null)
  const hasTrackedVisit = useRef<boolean>(false)

  useEffect(() => {
    // Show a fallback count immediately for better UX
    setCount(0)
    setActiveViewers(0)
    
    const trackVisit = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        // Check if we've already tracked this visit in this session
        const sessionKey = 'visitor_tracked_' + new Date().toDateString()
        const alreadyTracked = localStorage.getItem(sessionKey)
        
        if (alreadyTracked) {
          // Already tracked today, just get current count and update live viewers
          const response = await fetch('/api/visitor-count', {
            method: 'GET',
          })
          
          if (response.ok) {
            const data = await response.json()
            setCount(data.count)
            setActiveViewers(data.activeViewers || 0)
            setIsNewVisitor(false)
            startHeartbeat()
          }
        } else {
          // First visit today, increment the count
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
            setActiveViewers(data.activeViewers || 0)
            setIsNewVisitor(true)
            
            // Mark as tracked for today
            localStorage.setItem(sessionKey, 'true')
            hasTrackedVisit.current = true
            
            // Start heartbeat for active viewer tracking
            startHeartbeat()
          } else {
            setError('Failed to load visitor count')
          }
        }
      } catch (err) {
        console.error('Error tracking visit:', err)
        setError('Failed to load visitor count')
      } finally {
        setIsLoading(false)
      }
    }

    // Always start heartbeat for live viewer tracking, regardless of new visit
    const startLiveTracking = async () => {
      try {
        // Send initial heartbeat to register as active viewer
        await fetch('/api/visitor-count', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'heartbeat'
          })
        })
        
        // Start regular heartbeat
        startHeartbeat()
      } catch (error) {
        console.error('Error starting live tracking:', error)
      }
    }

    // Delay the API call slightly to prioritize UI rendering
    const timer = setTimeout(async () => {
      await trackVisit()
      // Always start live tracking, even for returning visitors
      await startLiveTracking()
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  // Cleanup heartbeat on unmount
  useEffect(() => {
    return () => {
      if (heartbeatInterval.current) {
        clearInterval(heartbeatInterval.current)
      }
    }
  }, [])

  const startHeartbeat = () => {
    // Send heartbeat every 30 seconds to keep track of active viewers
    heartbeatInterval.current = setInterval(async () => {
      try {
        const response = await fetch('/api/visitor-count', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'heartbeat'
          })
        })

        if (response.ok) {
          const data = await response.json()
          setActiveViewers(data.activeViewers || 0)
        }
      } catch (error) {
        console.error('Heartbeat error:', error)
      }
    }, 30000) // 30 seconds
  }

  if (error || count === null) {
    return null;
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
      
      {activeViewers !== null && activeViewers > 0 && (
        <>
          <div className="flex items-center gap-1 ml-2">
            <Eye className="w-3 h-3 text-green-600 dark:text-green-400" />
            <span className="text-gray-700 dark:text-white/70">Live:</span>
          </div>
          <span className="font-mono font-bold text-green-600 dark:text-green-400">
            {activeViewers}
          </span>
        </>
      )}
      
      {isLoading && (
        <div className="w-2 h-2 border border-blue-600 border-t-transparent rounded-full animate-spin ml-1" />
      )}
      {isNewVisitor && (
        <span className="text-xs text-green-600 dark:text-green-400 ml-1">
          (New!)
        </span>
      )}
    </div>
  )
}