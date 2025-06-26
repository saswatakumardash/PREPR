"use client"

import type React from "react"

interface PageHeaderProps {
  title: string
  description: string
  icon?: React.ReactNode
}

export function PageHeader({ title, description, icon }: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 mb-8 border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-500/10 to-blue-500/10 rounded-full blur-2xl" />

      <div className="relative">
        <div className="flex items-center gap-4 mb-3">
          {icon && (
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200/50 dark:border-slate-700/50">
              {icon}
            </div>
          )}
          <h2
            className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100"
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            {title}
          </h2>
        </div>
        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium max-w-3xl">
          {description}
        </p>
      </div>
    </div>
  )
}
