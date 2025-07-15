import type { Metadata } from 'next'
import './globals.css'
import NextAuthSessionProvider from './session-provider'

export const metadata: Metadata = {
  title: 'PrepR - Ace Your Coding Interviews & Placements',
  description: 'Master your coding interviews with intelligent feedback and comprehensive practice sessions',
  generator: 'PrepR',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <NextAuthSessionProvider>
          {children}
        </NextAuthSessionProvider>
      </body>
    </html>
  )
}
