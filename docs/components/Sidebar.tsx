'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getSidebarForPath, type SidebarItem } from '@/lib/navigation'

interface SidebarProps {
  items: SidebarItem[]
}

export function Sidebar({ items }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:block w-64 flex-shrink-0 border-r border-white/10 bg-[#14120B]">
      <nav className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto p-6">
        {items.map((section, idx) => (
          <div key={idx} className="mb-8">
            <h3 className="text-sm font-semibold text-white mb-2">
              {section.text}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.link
                return (
                  <li key={item.link}>
                    <Link
                      href={item.link}
                      className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                        isActive
                          ? 'bg-white/10 text-white font-medium'
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {item.text}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}
