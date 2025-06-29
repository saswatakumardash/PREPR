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
      count,
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
      // If RPC function doesn't exist, fallback to manual increment
      console.log('RPC function not found, using fallback method')
      return await fallbackIncrement()
    }

    return NextResponse.json({ 
      count: data || 0,
      persistent: true,
      unlimited: true
    })
  } catch (error) {
    console.error('Error incrementing visitor count:', error)
    return await fallbackIncrement()
  }
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