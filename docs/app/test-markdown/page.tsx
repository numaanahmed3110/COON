import { getMarkdownContent } from '@/lib/markdown'

export default async function TestPage() {
  const testFiles = [
    'guide/getting-started.md',
    'reference/api.md',
    'cli/index.md',
    'ecosystem/implementations.md',
  ]

  const results = await Promise.all(
    testFiles.map(async (file) => {
      const content = await getMarkdownContent(file)
      return { file, found: !!content }
    })
  )

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Markdown File Test</h1>
      <div className="space-y-2">
        {results.map((result) => (
          <div key={result.file} className="p-2 border rounded">
            <span className={result.found ? 'text-green-600' : 'text-red-600'}>
              {result.found ? '✓' : '✗'}
            </span>
            {' '}
            {result.file}
          </div>
        ))}
      </div>
      <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded">
        <p>Current working directory: {process.cwd()}</p>
      </div>
    </div>
  )
}

