import { notFound } from 'next/navigation'
import { getMarkdownContent } from '@/lib/markdown'
import { getSidebarForPath } from '@/lib/navigation'
import { Sidebar } from '@/components/Sidebar'
import { MDXComponents } from '@/components/MDXComponents'

interface PageProps {
  params: {
    slug?: string[]
  }
}

export default async function DocsPage({ params }: PageProps) {
  const slug = params.slug || []
  
  // Determine the file path
  let filePath: string
  if (slug.length === 0) {
    filePath = 'index.md'
  } else {
    const section = slug[0]
    const rest = slug.slice(1)
    
    if (section === 'cli' && rest.length === 0) {
      filePath = 'cli/index.md'
    } else if (section === 'cli') {
      filePath = `cli/${rest.join('/')}.md`
    } else if (rest.length === 0) {
      filePath = `${section}/index.md`
    } else {
      filePath = `${section}/${rest.join('/')}.md`
    }
  }

  const content = await getMarkdownContent(filePath)
  
  if (!content) {
    notFound()
  }

  const sidebarItems = getSidebarForPath(`/${slug[0] || ''}`)

  return (
    <div className="flex bg-[#14120B]">
      {sidebarItems.length > 0 && <Sidebar items={sidebarItems} />}
      <article className="flex-1 max-w-4xl mx-auto px-6 py-12">
        <MDXComponents content={content.content} />
      </article>
    </div>
  )
}

// Generate static params for all markdown files
export async function generateStaticParams() {
  const sections = ['guide', 'reference', 'cli', 'ecosystem']
  const params: { slug: string[] }[] = []

  for (const section of sections) {
    const files = await import('@/lib/markdown').then(m => m.getAllMarkdownFiles(section))
    
    for (const file of files) {
      const relativePath = file.replace(`${section}/`, '').replace('.md', '')
      if (relativePath === 'index') {
        params.push({ slug: [section] })
      } else {
        params.push({ slug: [section, ...relativePath.split('/')] })
      }
    }
  }

  // Add CLI index
  params.push({ slug: ['cli'] })

  return params
}

