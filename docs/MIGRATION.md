# Migration from VitePress to Next.js + Tailwind

This document outlines the migration from VitePress to Next.js + Tailwind CSS.

## What Changed

### Stack
- **Before**: VitePress (Vue-based)
- **After**: Next.js 14 (React-based) + Tailwind CSS

### Key Features Migrated

✅ **Navigation & Sidebar**
- Converted VitePress navigation config to TypeScript
- Recreated sidebar component with React
- Maintained same navigation structure

✅ **Styling**
- Migrated CSS variables to Tailwind config
- Preserved brand colors (#FFEDAC, #E8D89A, #D1C288)
- Maintained dark mode support
- Recreated custom component styles

✅ **Content**
- Markdown files remain in original locations
- MDX processing with `next-mdx-remote`
- Syntax highlighting with `rehype-highlight`
- Support for code groups and custom blocks

✅ **Components**
- Hero section with features grid
- Navbar with logo and navigation
- Sidebar with active state
- Footer
- Code blocks with copy functionality
- Custom blocks (tip, warning, danger)

## File Structure

```
docs/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout
│   ├── guide/[slug]/      # Guide pages
│   ├── reference/[slug]/  # Reference pages
│   ├── cli/               # CLI docs
│   └── ecosystem/[slug]/  # Ecosystem pages
├── components/            # React components
├── lib/                   # Utilities
│   ├── navigation.ts      # Nav config (from .vitepress/config.ts)
│   ├── markdown.ts        # Markdown file reading
│   └── mdx.ts             # MDX processing
└── public/                # Static assets (unchanged)
```

## Running the Site

```bash
# Install dependencies
npm install

# Development
npm run dev

# Build
npm run build

# Production
npm start
```

## Differences from VitePress

1. **Markdown Processing**: Uses `next-mdx-remote` instead of VitePress's built-in MDX
2. **Styling**: Tailwind utility classes instead of CSS variables (though variables are still used)
3. **Components**: React components instead of Vue
4. **Routing**: Next.js App Router instead of VitePress file-based routing
5. **Search**: Placeholder component ready for implementation (was using VitePress local search)

## Next Steps

1. **Search Implementation**: Add client-side search (e.g., fuse.js) or integrate Algolia
2. **Code Groups**: Enhance CodeGroup component to properly parse tabbed code blocks
3. **Custom Blocks**: Improve parsing of `::: tip`, `::: warning` blocks from markdown
4. **Performance**: Add static generation for all pages
5. **SEO**: Add proper meta tags and Open Graph images

## Notes

- All markdown files remain in their original locations
- The site reads markdown files directly from the `docs/` directory
- Public assets (SVG icons) are in `public/` and work as before
- Dark mode is enabled by default (can be made toggleable later)

