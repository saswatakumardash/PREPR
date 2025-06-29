import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory counter with localStorage-like persistence
// This works immediately but resets on deployment
let visitorCount = 0
let activeViewers = 0

// Try to get initial count from environment variable
if (process.env.INITIAL_VISITOR_COUNT) {
  visitorCount = parseInt(process.env.INITIAL_VISITOR_COUNT, 10) || 0
}

export async function GET() {
  try {
    return NextResponse.json({ 
      count: visitorCount,
      activeViewers: activeViewers,
      persistent: false,
      unlimited: false,
      note: "Fallback counter (resets on deployment)",
      setup: "Use Supabase for unlimited, persistent counting"
    })
  } catch (error) {
    console.error('Error reading visitor count:', error)
    return NextResponse.json({ 
      count: 0, 
      activeViewers: 0,
      persistent: false,
      unlimited: false
    })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action } = body

    if (action === 'heartbeat') {
      // Simple active viewer tracking for fallback
      activeViewers = Math.max(1, activeViewers) // At least 1 if someone is here
      return NextResponse.json({ activeViewers })
    }

    // Regular visit - increment the count
    visitorCount += 1
    activeViewers = Math.max(1, activeViewers) // At least 1 if someone is here
    
    return NextResponse.json({ 
      count: visitorCount,
      activeViewers: activeViewers,
      persistent: false,
      unlimited: false,
      note: "Fallback counter (resets on deployment)",
      setup: "Use Supabase for unlimited, persistent counting"
    })
  } catch (error) {
    console.error('Error incrementing visitor count:', error)
    return NextResponse.json({ 
      count: visitorCount, 
      activeViewers: activeViewers,
      persistent: false,
      unlimited: false
    })
  }
} 