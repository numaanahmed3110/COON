import { notFound } from 'next/navigation'
import { getMarkdownContent } from '@/lib/markdown'
import { getSidebarForPath } from '@/lib/navigation'
import { Sidebar } from '@/components/Sidebar'
import { MDXComponents } from '@/components/MDXComponents'

interface PageProps {
  params: {
    slug: string
  }
}

export default async function ReferencePage({ params }: PageProps) {
  const filePath = `reference/${params.slug}.md`
  const content = await getMarkdownContent(filePath)
  
  if (!content) {
    notFound()
  }

  const sidebarItems = getSidebarForPath('/reference')

  return (
    <div className="flex bg-[#14120B]">
      <Sidebar items={sidebarItems} />
      <article className="flex-1 max-w-4xl mx-auto px-6 py-12">
        <MDXComponents content={content.content} />
      </article>
    </div>
  )
}

// Generate static params for all reference pages
export async function generateStaticParams() {
  const files = [
    'api',
    'syntax-cheatsheet',
    'spec',
    'efficiency-formalization',
  ]
  
  return files.map((file) => ({
    slug: file,
  }))
}

