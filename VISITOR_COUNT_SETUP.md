# Visitor Count Setup Guide

## Problem
The original visitor count implementation used file-based storage (`visitor-count.json`), which doesn't work on Vercel because:
- Vercel's serverless functions are stateless
- File writes don't persist between deployments
- Each function invocation runs in an isolated environment

## Solutions

### Solution 1: Simple In-Memory Counter (Current Implementation)
**File:** `app/api/visitor-count-simple/route.ts`
- ✅ Works on Vercel
- ✅ No external dependencies
- ❌ Resets on every deployment
- ❌ Not persistent across server restarts

**Usage:** Already implemented in `components/visitor-counter.tsx`

### Solution 2: Vercel KV (Recommended for Production)
**File:** `app/api/visitor-count/route.ts`
- ✅ Persistent across deployments
- ✅ Works reliably on Vercel
- ✅ No resets
- ❌ Requires Vercel KV setup

**Setup Steps:**
1. Install Vercel KV: `npm install @vercel/kv`
2. Set up Vercel KV in your Vercel dashboard
3. Add environment variables to Vercel:
   ```
   KV_URL=your-kv-url
   KV_REST_API_URL=your-kv-rest-api-url
   KV_REST_API_TOKEN=your-kv-token
   KV_REST_API_READ_ONLY_TOKEN=your-read-only-token
   ```
4. Update `components/visitor-counter.tsx` to use `/api/visitor-count` instead of `/api/visitor-count-simple`

### Solution 3: External Counter Service
You can also use external services like:
- **CountAPI.xyz** (free)
- **Supabase** (free tier available)
- **PlanetScale** (free tier available)
- **MongoDB Atlas** (free tier available)

## Environment Variables

Create a `.env.local` file in your project root:

```env
# For simple counter (optional)
INITIAL_VISITOR_COUNT=0

# For Vercel KV (if using Solution 2)
KV_URL=your-kv-url
KV_REST_API_URL=your-kv-rest-api-url
KV_REST_API_TOKEN=your-kv-token
KV_REST_API_READ_ONLY_TOKEN=your-read-only-token
```

## Testing

1. **Local Testing:**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000` and check the visitor counter

2. **Vercel Testing:**
   - Deploy to Vercel
   - Check if the visitor counter works
   - Monitor Vercel function logs for any errors

## Current Status

- ✅ Simple counter implemented and working
- ✅ Vercel KV implementation ready (requires setup)
- ✅ Fallback error handling implemented
- ✅ Component updated to use simple counter by default

## Next Steps

1. **For immediate fix:** The simple counter is already working
2. **For production:** Set up Vercel KV for persistent counting
3. **For testing:** Deploy to Vercel and verify the simple counter works

## Troubleshooting

If you see "Visitor count unavailable":
1. Check browser console for errors
2. Check Vercel function logs
3. Verify API endpoints are accessible
4. Ensure environment variables are set correctly (if using Vercel KV) 