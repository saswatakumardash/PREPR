"use client"

import dynamic from 'next/dynamic';

const Login3DEffect = dynamic(() => import('./auth/login-3d-effect'), { ssr: false });

export function Loading() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative bg-black">
      {/* 3D Effect as background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Login3DEffect />
      </div>
      {/* Overlay loading text */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">PrepR</h2>
        <p className="text-white/80 mb-6 drop-shadow">Loading your interview arena...</p>
        <div className="flex items-center justify-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  )
}
