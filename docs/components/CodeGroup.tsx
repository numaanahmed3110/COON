'use client'

import { useState } from 'react'

interface Tab {
  label: string
  content: React.ReactNode
}

interface CodeGroupProps {
  children: React.ReactNode
  tabs?: string[]
}

export function CodeGroup({ children, tabs }: CodeGroupProps) {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="my-4">
      {tabs && tabs.length > 0 && (
        <div className="flex gap-1 border-b border-white/10 mb-4">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === idx
                  ? 'border-white/30 text-white'
                  : 'border-transparent text-white/60 hover:text-white/80'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      )}
      <div>{children}</div>
    </div>
  )
}
