"use client"

import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { VisitorCounter } from "./visitor-counter"

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 mt-12">
      <div className="container mx-auto px-4 py-8 flex flex-col items-center gap-6">
        {/* Main Brand Section */}
        <div className="flex items-center gap-4">
          <Image
            src="/logo-512.png"
            alt="PrepR Logo"
            width={120}
            height={120}
            className="object-contain"
          />
          <div>
            <h3 className="text-xl font-bold text-white">PrepR</h3>
            <p className="text-xs text-white/60 font-medium">AI Coding Interview Arena</p>
          </div>
        </div>
        {/* Portfolio Link */}
        <a
          href="https://skds.site"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition-colors duration-200"
        >
          Visit Portfolio
          <ExternalLink className="h-4 w-4" />
        </a>
        {/* Visitor Counter */}
        <div className="flex items-center justify-center">
          <VisitorCounter className="text-white" />
        </div>
        {/* Copyright */}
        <div className="text-center w-full border-t border-white/10 pt-4">
          <p className="text-xs text-white/50 font-medium">
            © 2025 Saswata Kumar Dash. All rights reserved.
          </p>
        </div>
      </div>
      {/* Allin Logo in bottom right */}
      <a
        href="https://theallin.tech"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-2 bottom-2 z-50 md:right-4 md:bottom-4"
        tabIndex={0}
      >
        <img src="/allin-logo.png" alt="Allin Logo" width={18} height={18} className="object-contain opacity-30 hover:opacity-60 transition-opacity" />
      </a>
    </footer>
  )
}
