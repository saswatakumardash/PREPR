"use client"

import Image from "next/image"
import { Heart, Code, Zap, ExternalLink, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-t border-slate-200 dark:border-slate-700 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center space-y-8">
          {/* Main Brand Section */}
          <div className="flex items-center gap-6">
            <Image
              src="/logo-512.png"
              alt="SKD Logo"
              width={64}
              height={64}
              className="object-contain drop-shadow-lg"
            />
            <div>
              <h3
                className="text-3xl font-black text-slate-800 dark:text-slate-100"
                style={{
                  fontFamily: "system-ui, -apple-system, sans-serif",
                }}
              >
                PrepR
              </h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium">AI Coding Interview Arena</p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-2xl">
            {[
              { icon: Code, label: "AI-Powered Analysis", color: "text-blue-600" },
              { icon: Zap, label: "Real-time Feedback", color: "text-purple-600" },
              { icon: Heart, label: "Student Focused", color: "text-green-600" },
              { icon: Mail, label: "Expert Support", color: "text-orange-600" },
            ].map((feature) => (
              <div key={feature.label} className="text-center">
                <feature.icon className={`h-6 w-6 mx-auto mb-2 ${feature.color}`} />
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{feature.label}</p>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="text-center bg-white/50 dark:bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50">
            <p className="text-slate-600 dark:text-slate-400 mb-3 font-medium">Need help or have questions?</p>
            <a
              href="https://skds.site"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors duration-200"
            >
              Visit Portfolio
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center border-t border-slate-200 dark:border-slate-700 pt-6 w-full">
            <p className="text-slate-600 dark:text-slate-400 font-medium">
              © 2025 All rights reserved to{" "}
              <span className="font-bold text-blue-600 dark:text-blue-400">Saswata Kumar Dash</span>
            </p>
            <p className="mt-2 text-slate-500 dark:text-slate-500 flex items-center justify-center gap-2">
              Built with passion
              <Heart className="h-4 w-4 text-red-500 animate-pulse" />
              for developers worldwide
            </p>
          </div>

          {/* Allin Logo absolutely positioned in bottom right corner for mobile optimization */}
        </div>
        <a
          href="https://theallin.tech"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed right-2 bottom-2 z-50 md:right-4 md:bottom-4"
          tabIndex={0}
        >
          <img src="/allin-logo.png" alt="Allin Logo" width={18} height={18} className="object-contain opacity-40" />
        </a>
      </div>
    </footer>
  )
}
