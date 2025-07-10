"use client"

import type React from "react"

interface ContentAreaProps {
  children: React.ReactNode
  className?: string
}

export const ContentArea = ({ children, className = "" }: ContentAreaProps) => {
  return (
    <main className={`flex-1 bg-gray-50 overflow-y-auto relative z-0 ${className}`}>
      <div className="p-6">{children}</div>
    </main>
  )
}
