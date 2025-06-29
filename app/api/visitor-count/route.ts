import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

const VISITOR_COUNT_TABLE = 'visitor_counts'
const ACTIVE_VIEWERS_TABLE = 'active_viewers'
const SITE_ID = 'main-site' // Unique identifier for your site

// Initialize visitor count in database if it doesn't exist
async function initializeVisitorCount() {
  try {
    const { data, error } = await supabase
      .from(VISITOR_COUNT_TABLE)
      .select('count')
      .eq('site_id', SITE_ID)
      .single()

    if (error && error.code === 'PGRST116') {
      // Record doesn't exist, create it
      const { error: insertError } = await supabase
        .from(VISITOR_COUNT_TABLE)
        .insert({ site_id: SITE_ID, count: 0, created_at: new Date().toISOString() })
      
      if (insertError) {
        console.error('Error creating visitor count record:', insertError)
        return 0
      }
      return 0
    }

    if (error) {
      console.error('Error fetching visitor count:', error)
      return 0
    }

    return data?.count || 0
  } catch (error) {
    console.error('Error in initializeVisitorCount:', error)
    return 0
  }
}

// Get active viewers count
async function getActiveViewers() {
  try {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString()
    
    const { data, error } = await supabase
      .from(ACTIVE_VIEWERS_TABLE)
      .select('*')
      .eq('site_id', SITE_ID)
      .gte('last_seen', fiveMinutesAgo)

    if (error) {
      console.error('Error fetching active viewers:', error)
      return 0
    }

    return data?.length || 0
  } catch (error) {
    console.error('Error in getActiveViewers:', error)
    return 0
  }
}

export async function GET() {
  try {
    const [totalCount, activeViewers] = await Promise.all([
      initializeVisitorCount(),
      getActiveViewers()
    ])
    
    return NextResponse.json({ 
      count: totalCount,
      activeViewers,
      persistent: true,
      unlimited: true
    })
  } catch (error) {
    console.error('Error reading visitor count:', error)
    return NextResponse.json({ count: 0, activeViewers: 0, error: 'Database error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, sessionId } = body

    if (action === 'heartbeat') {
      // Update active viewer heartbeat
      await updateActiveViewer(sessionId)
      const activeViewers = await getActiveViewers()
      return NextResponse.json({ activeViewers })
    }

    // Check if this is a new visitor by looking for a session cookie
    const cookieSessionId = request.cookies.get('visitor_session')?.value
    
    if (!cookieSessionId) {
      // This is a new visitor, increment the count
      const { data, error } = await supabase.rpc('increment_visitor_count', {
        site_id_param: SITE_ID
      })

      if (error) {
        // If RPC function doesn't exist, fallback to manual increment
        console.log('RPC function not found, using fallback method')
        return await fallbackIncrement()
      }

      // Create response with session cookie
      const response = NextResponse.json({ 
        count: data || 0,
        persistent: true,
        unlimited: true,
        newVisitor: true
      })

      // Set a session cookie that expires in 24 hours
      const newSessionId = generateSessionId()
      response.cookies.set('visitor_session', newSessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 // 24 hours
      })

      // Add to active viewers
      await addActiveViewer(newSessionId)

      return response
    } else {
      // Returning visitor, just return current count without incrementing
      const [count, activeViewers] = await Promise.all([
        initializeVisitorCount(),
        getActiveViewers()
      ])
      
      // Update active viewer heartbeat
      await updateActiveViewer(cookieSessionId)
      
      return NextResponse.json({ 
        count,
        activeViewers,
        persistent: true,
        unlimited: true,
        newVisitor: false
      })
    }
  } catch (error) {
    console.error('Error handling visitor count:', error)
    return await fallbackIncrement()
  }
}

// Add new active viewer
async function addActiveViewer(sessionId: string) {
  try {
    await supabase
      .from(ACTIVE_VIEWERS_TABLE)
      .upsert({
        session_id: sessionId,
        site_id: SITE_ID,
        last_seen: new Date().toISOString(),
        created_at: new Date().toISOString()
      })
  } catch (error) {
    console.error('Error adding active viewer:', error)
  }
}

// Update active viewer heartbeat
async function updateActiveViewer(sessionId: string) {
  try {
    await supabase
      .from(ACTIVE_VIEWERS_TABLE)
      .update({ last_seen: new Date().toISOString() })
      .eq('session_id', sessionId)
      .eq('site_id', SITE_ID)
  } catch (error) {
    console.error('Error updating active viewer:', error)
  }
}

// Generate a unique session ID
function generateSessionId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

// Fallback method if RPC function is not available
async function fallbackIncrement() {
  try {
    // Get current count
    const currentCount = await initializeVisitorCount()
    
    // Increment and update
    const { data, error } = await supabase
      .from(VISITOR_COUNT_TABLE)
      .update({ 
        count: currentCount + 1,
        updated_at: new Date().toISOString()
      })
      .eq('site_id', SITE_ID)
      .select('count')
      .single()

    if (error) {
      console.error('Error updating visitor count:', error)
      return NextResponse.json({ count: currentCount, error: 'Update failed' }, { status: 500 })
    }

    return NextResponse.json({ 
      count: data?.count || currentCount + 1,
      persistent: true,
      unlimited: true
    })
  } catch (error) {
    console.error('Error in fallback increment:', error)
    return NextResponse.json({ count: 0, error: 'Database error' }, { status: 500 })
  }
} 