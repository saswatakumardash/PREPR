import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

const VISITOR_COUNT_TABLE = 'visitor_counts'
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

export async function GET() {
  try {
    const count = await initializeVisitorCount()
    
    return NextResponse.json({ 
      count: count,
      persistent: true,
      unlimited: true
    })
  } catch (error) {
    console.error('Error reading visitor count:', error)
    return NextResponse.json({ count: 0, error: 'Database error' }, { status: 500 })
  }
}

export async function POST() {
  try {
    // Use PostgreSQL's atomic increment to handle concurrent requests
    const { data, error } = await supabase.rpc('increment_visitor_count', {
      site_id_param: SITE_ID
    })

    if (error) {
      console.error('Error with RPC function:', error)
      return NextResponse.json({ error: 'Database function not available' }, { status: 500 })
    }

    return NextResponse.json({ 
      count: data || 0,
      persistent: true,
      unlimited: true
    })
  } catch (error) {
    console.error('Error incrementing visitor count:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
} 