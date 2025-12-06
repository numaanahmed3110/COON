'use client'

import { useState, useEffect } from 'react'

export function Search() {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        // Focus search input or open search modal
        const input = document.getElementById('search-input') as HTMLInputElement
        if (input) {
          input.focus()
          setIsOpen(true)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // TODO: Implement search functionality
  // This is a placeholder component
  // You can integrate with:
  // - Client-side search (e.g., fuse.js, minisearch)
  // - Server-side search API
  // - External service (e.g., Algolia)

  return (
    <div className="relative">
      <div className="relative flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-md text-sm w-[240px]">
        <svg
          className="w-4 h-4 text-white/40 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          id="search-input"
          type="text"
          placeholder="Search docs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          className="flex-1 bg-transparent outline-none text-white placeholder:text-white/40 pr-12"
        />
        <kbd className="absolute right-1 inline-flex items-center justify-center gap-0.5 px-1.5 py-1 text-[10px] font-medium text-white bg-white/10 border border-white/10 rounded font-mono leading-none pointer-events-none">
          <span>⌘</span>
          <span className="ml-1 text-[13px]">K</span>
        </kbd>
      </div>
      
      {isOpen && query && (
        <div className="absolute top-full mt-2 w-full bg-[#1e1e1e] border border-white/10 rounded-lg shadow-lg p-2 min-h-[200px]">
          <p className="text-sm text-white/60 p-4 text-center">
            Search functionality coming soon
          </p>
        </div>
      )}
    </div>
  )
}

