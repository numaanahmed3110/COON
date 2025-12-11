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

export default async function EcosystemPage({ params }: PageProps) {
  const filePath = `ecosystem/${params.slug}.md`
  const content = await getMarkdownContent(filePath)
  
  if (!content) {
    notFound()
  }

  const sidebarItems = getSidebarForPath('/ecosystem')

  return (
    <div className="flex bg-[#14120B]">
      <Sidebar items={sidebarItems} />
      <article className="flex-1 max-w-4xl mx-auto px-6 py-12">
        <MDXComponents content={content.content} />
      </article>
    </div>
  )
}

// Generate static params for all ecosystem pages
export async function generateStaticParams() {
  const files = [
    'implementations',
    'tools-and-playgrounds',
  ]
  
  return files.map((file) => ({
    slug: file,
  }))
}

