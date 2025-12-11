# Setup Instructions

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open browser:**
   Navigate to `http://localhost:3000`

## Pages Structure

All pages are statically generated from markdown files:

- **Guide**: `/guide/getting-started`, `/guide/format-overview`, etc.
- **Reference**: `/reference/api`, `/reference/syntax-cheatsheet`, etc.
- **CLI**: `/cli`
- **Ecosystem**: `/ecosystem/implementations`, `/ecosystem/tools-and-playgrounds`

## Testing

Visit `/test-markdown` to verify all markdown files are being read correctly.

## Build for Production

```bash
npm run build
npm start
```

All pages will be statically generated at build time.

