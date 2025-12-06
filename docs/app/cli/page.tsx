import { getMarkdownContent } from '@/lib/markdown'
import { getSidebarForPath } from '@/lib/navigation'
import { Sidebar } from '@/components/Sidebar'
import { MDXComponents } from '@/components/MDXComponents'

export default async function CLIPage() {
  const content = await getMarkdownContent('cli/index.md')
  
  if (!content) {
    return <div>Content not found</div>
  }

  const sidebarItems = getSidebarForPath('/cli')

  return (
    <div className="flex bg-[#14120B]">
      <Sidebar items={sidebarItems} />
      <article className="flex-1 max-w-4xl mx-auto px-6 py-12">
        <MDXComponents content={content.content} />
      </article>
    </div>
  )
}

