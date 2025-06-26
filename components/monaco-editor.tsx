"use client"

import { useEffect, useRef } from "react"
import dynamic from "next/dynamic"

const Monaco = dynamic(() => import("@monaco-editor/react"), { ssr: false })

interface MonacoEditorProps {
  value: string
  onChange: (value: string) => void
  language?: string
  theme?: string
}

export function MonacoEditor({ value, onChange, language = "typescript", theme = "vs-dark" }: MonacoEditorProps) {
  return (
    <div className="w-full rounded-lg overflow-hidden border border-gray-700 shadow-lg bg-gradient-to-br from-gray-900/80 to-blue-900/60">
      <Monaco
        height="400px"
        language={language}
        theme={theme}
        value={value}
        onChange={(val) => onChange(val || "")}
        options={{
          fontSize: 16,
          fontFamily: 'JetBrains Mono, Menlo, Consolas, Monaco, "Liberation Mono", "Courier New", monospace',
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap: "off",
          scrollBeyondLastColumn: 5,
          scrollbar: {
            vertical: 'visible',
            horizontal: 'visible',
            useShadows: true,
            alwaysConsumeMouseWheel: false,
          },
          smoothScrolling: true,
          automaticLayout: true,
          lineNumbers: "on",
          renderLineHighlight: "all",
          formatOnPaste: true,
          formatOnType: true,
          tabSize: 2,
        }}
        className="bg-transparent"
      />
    </div>
  )
}
