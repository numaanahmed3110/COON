'use client'

import { useState } from 'react'

interface CodeBlockProps {
  children: React.ReactNode
  className?: string
  'data-language'?: string
}

export function CodeBlock({ children, className, 'data-language': language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    const text = typeof children === 'string' 
      ? children 
      : String(children).replace(/\n$/, '')
    
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group">
      <pre className="overflow-x-auto rounded-lg p-4 bg-[#14120B] border border-white/10">
        <code className={`${className} text-white`}>{children}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 px-2 py-1 text-xs bg-white/10 hover:bg-white/20 rounded opacity-0 group-hover:opacity-100 transition-opacity text-white border border-white/20"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  )
}
