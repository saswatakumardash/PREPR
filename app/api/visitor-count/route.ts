import { NextResponse } from 'next/server'

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL!
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN!
const KEY = 'visitor_count'

async function upstashFetch(command: string, ...args: (string | number)[]) {
  const body = JSON.stringify([command, KEY, ...args])
  const res = await fetch(UPSTASH_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${UPSTASH_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body,
  })
  return res.json()
}

export async function GET() {
  const data = await upstashFetch('GET')
  const count = parseInt(data.result || '0', 10)
  return NextResponse.json({ count })
}

export async function POST() {
  const data = await upstashFetch('INCR')
  const count = parseInt(data.result || '0', 10)
  return NextResponse.json({ count })
} 