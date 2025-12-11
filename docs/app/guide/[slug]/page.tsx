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

export default async function GuidePage({ params }: PageProps) {
  const filePath = `guide/${params.slug}.md`
  const content = await getMarkdownContent(filePath)
  
  if (!content) {
    notFound()
  }

  const sidebarItems = getSidebarForPath('/guide')

  return (
    <div className="flex bg-[#14120B]">
      <Sidebar items={sidebarItems} />
      <article className="flex-1 max-w-4xl mx-auto px-6 py-12">
        <MDXComponents content={content.content} />
      </article>
    </div>
  )
}

// Generate static params for all guide pages
export async function generateStaticParams() {
  const files = [
    'getting-started',
    'format-overview',
    'llm-prompts',
    'benchmarks',
    'compression-efficiency-benchmark',
    'compression-efficiency-visual-summary',
    'llm-comprehension-benchmark',
  ]
  
  return files.map((file) => ({
    slug: file,
  }))
}

