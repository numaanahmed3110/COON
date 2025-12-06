interface CustomBlockProps {
  type?: 'tip' | 'warning' | 'danger' | 'info'
  title?: string
  children: React.ReactNode
}

export function CustomBlock({ type = 'info', title, children }: CustomBlockProps) {
  const titles = {
    tip: 'Tip',
    warning: 'Warning',
    danger: 'Danger',
    info: 'Info',
  }

  return (
    <div className="border-l-4 border-white/30 bg-white/5 p-4 my-4 rounded-r text-white">
      {title && (
        <div className="font-semibold mb-2 text-white">{title}</div>
      )}
      <div className="text-white/90">{children}</div>
    </div>
  )
}
