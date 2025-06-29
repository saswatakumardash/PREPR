import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory counter (resets on deployment but works for the session)
let visitorCount = 0

// Initialize from environment variable if available
if (process.env.INITIAL_VISITOR_COUNT) {
  visitorCount = parseInt(process.env.INITIAL_VISITOR_COUNT, 10) || 0
}

export async function GET() {
  try {
    return NextResponse.json({ 
      count: visitorCount,
      note: "Session-based counter (resets on deployment)"
    })
  } catch (error) {
    console.error('Error reading visitor count:', error)
    return NextResponse.json({ count: 0 })
  }
}

export async function POST() {
  try {
    visitorCount += 1
    return NextResponse.json({ 
      count: visitorCount,
      note: "Session-based counter (resets on deployment)"
    })
  } catch (error) {
    console.error('Error incrementing visitor count:', error)
    return NextResponse.json({ count: 0 })
  }
} 