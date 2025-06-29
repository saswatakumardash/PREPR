import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const VISITOR_COUNT_FILE = path.join(process.cwd(), 'visitor-count.json')

// Initialize visitor count file if it doesn't exist
async function initializeVisitorCount() {
  try {
    await fs.access(VISITOR_COUNT_FILE)
  } catch {
    await fs.writeFile(VISITOR_COUNT_FILE, JSON.stringify({ count: 0, lastUpdated: new Date().toISOString() }))
  }
}

// Read current visitor count
async function getVisitorCount() {
  await initializeVisitorCount()
  const data = await fs.readFile(VISITOR_COUNT_FILE, 'utf-8')
  return JSON.parse(data)
}

// Increment visitor count
async function incrementVisitorCount() {
  const data = await getVisitorCount()
  data.count += 1
  data.lastUpdated = new Date().toISOString()
  await fs.writeFile(VISITOR_COUNT_FILE, JSON.stringify(data))
  return data
}

export async function GET() {
  try {
    const data = await getVisitorCount()
    return NextResponse.json({ count: data.count })
  } catch (error) {
    console.error('Error reading visitor count:', error)
    return NextResponse.json({ count: 0 }, { status: 500 })
  }
}

export async function POST() {
  try {
    const data = await incrementVisitorCount()
    return NextResponse.json({ count: data.count })
  } catch (error) {
    console.error('Error incrementing visitor count:', error)
    return NextResponse.json({ count: 0 }, { status: 500 })
  }
} 