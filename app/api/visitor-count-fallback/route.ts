import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory counter with localStorage-like persistence
// This works immediately but resets on deployment
let visitorCount = 0

// Try to get initial count from environment variable
if (process.env.INITIAL_VISITOR_COUNT) {
  visitorCount = parseInt(process.env.INITIAL_VISITOR_COUNT, 10) || 0
}

export async function GET() {
  try {
    return NextResponse.json({ 
      count: visitorCount,
      persistent: false,
      unlimited: false,
      note: "Fallback counter (resets on deployment)",
      setup: "Use Supabase for unlimited, persistent counting"
    })
  } catch (error) {
    console.error('Error reading visitor count:', error)
    return NextResponse.json({ 
      count: 0,
      persistent: false,
      unlimited: false
    })
  }
}

export async function POST() {
  try {
    visitorCount += 1
    return NextResponse.json({ 
      count: visitorCount,
      persistent: false,
      unlimited: false,
      note: "Fallback counter (resets on deployment)",
      setup: "Use Supabase for unlimited, persistent counting"
    })
  } catch (error) {
    console.error('Error incrementing visitor count:', error)
    return NextResponse.json({ 
      count: visitorCount,
      persistent: false,
      unlimited: false
    })
  }
} 