# COON Documentation Site

This is the Next.js + Tailwind CSS documentation site for COON (Code-Oriented Object Notation).

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## Project Structure

```
docs/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout
│   ├── guide/             # Guide pages
│   ├── reference/         # Reference pages
│   ├── cli/               # CLI documentation
│   └── ecosystem/         # Ecosystem pages
├── components/            # React components
│   ├── Navbar.tsx
│   ├── Sidebar.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   └── ...
├── lib/                   # Utility functions
│   ├── navigation.ts      # Navigation config
│   ├── markdown.ts        # Markdown processing
│   └── mdx.ts             # MDX setup
├── public/                # Static assets
└── content/               # Markdown content (optional)
```

## Features

- ✅ Next.js 14 with App Router
- ✅ Tailwind CSS with custom brand colors
- ✅ Dark mode support
- ✅ MDX for markdown processing
- ✅ Syntax highlighting
- ✅ Responsive design
- ✅ Sidebar navigation
- ✅ Search placeholder (ready for implementation)

## Migration from VitePress

This site was migrated from VitePress to Next.js + Tailwind. The markdown files remain in their original locations and are read directly by the Next.js app.

## Customization

### Colors

Edit `tailwind.config.js` to customize brand colors:

```js
colors: {
  brand: {
    1: '#FFEDAC',
    2: '#E8D89A',
    3: '#D1C288',
  },
}
```

### Navigation

Edit `lib/navigation.ts` to update navigation items and sidebar configuration.

## Deployment

This site can be deployed to:
- Vercel (recommended)
- Netlify
- Any Node.js hosting platform

For Vercel:

```bash
vercel
```

