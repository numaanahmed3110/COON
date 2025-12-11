'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import { CodeBlock } from './CodeBlock'
import { CustomBlock } from './CustomBlock'

interface MDXComponentsProps {
  content: string
}

export function MDXComponents({ content }: MDXComponentsProps) {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none text-white">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '')
            const language = match ? match[1] : ''
            
            if (!inline && language) {
              return (
                <CodeBlock className={className} {...props}>
                  {String(children).replace(/\n$/, '')}
                </CodeBlock>
              )
            }
            return (
              <code className={`${className} text-white bg-white/10`} {...props}>
                {children}
              </code>
            )
          },
          pre({ children, ...props }: any) {
            return <pre {...props}>{children}</pre>
          },
          table({ children, ...props }: any) {
            return (
              <div className="overflow-x-auto my-4">
                <table className="min-w-full border-collapse border border-white/20" {...props}>
                  {children}
                </table>
              </div>
            )
          },
          th({ children, ...props }: any) {
            return (
              <th className="border border-white/20 px-3 py-2 bg-white/5 font-semibold text-white" {...props}>
                {children}
              </th>
            )
          },
          td({ children, ...props }: any) {
            return (
              <td className="border border-white/20 px-3 py-2 text-white" {...props}>
                {children}
              </td>
            )
          },
          h1({ children, ...props }: any) {
            return <h1 className="text-white" {...props}>{children}</h1>
          },
          h2({ children, ...props }: any) {
            return <h2 className="text-white" {...props}>{children}</h2>
          },
          h3({ children, ...props }: any) {
            return <h3 className="text-white" {...props}>{children}</h3>
          },
          p({ children, ...props }: any) {
            return <p className="text-white/90" {...props}>{children}</p>
          },
          li({ children, ...props }: any) {
            return <li className="text-white/90" {...props}>{children}</li>
          },
          a({ children, ...props }: any) {
            return <a className="text-white/80 hover:text-white" {...props}>{children}</a>
          },
          strong({ children, ...props }: any) {
            return <strong className="text-white" {...props}>{children}</strong>
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
