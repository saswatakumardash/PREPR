"use client"

import { useTheme } from "next-themes"
import dynamic from "next/dynamic"

const Monaco = dynamic(() => import("@monaco-editor/react"), { ssr: false })

interface MonacoEditorProps {
  value: string
  onChange: (value: string) => void
  language?: string
  theme?: string
}

export function MonacoEditor({ value, onChange, language = "typescript", theme }: MonacoEditorProps) {
  const { theme: appTheme } = useTheme()
  const resolvedTheme = theme || (appTheme === "light" ? "vs-light" : "vs-dark")
  return (
    <div className={`w-full rounded-lg overflow-hidden border max-w-full overflow-x-auto overflow-y-auto ${appTheme === "light" ? "border-gray-300 bg-white" : "border-gray-700 bg-neutral-950"}`}>
      <Monaco
        height="400px"
        language={language}
        theme={resolvedTheme}
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
