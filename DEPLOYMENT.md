# 🚀 Deployment Guide

## Deploy Web Demo

The COON web demo is a single HTML file that can be deployed to any static hosting service.

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   cd demo
   vercel --prod
   ```

3. **Done!** Your demo is live at `https://your-project.vercel.app`

### Option 2: Netlify

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy**:
   ```bash
   cd demo
   netlify deploy --prod --dir .
   ```

3. **Done!** Your demo is live at `https://your-site.netlify.app`

### Option 3: GitHub Pages

1. **Create `demo` branch**:
   ```bash
   git checkout -b demo
   ```

2. **Copy demo files to root**:
   ```bash
   cp demo/index.html index.html
   git add index.html
   git commit -m "Deploy demo to GitHub Pages"
   git push origin demo
   ```

3. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: `demo` branch
   - Save

4. **Done!** Demo available at `https://yourusername.github.io/COON`

### Option 4: Local Preview

Simply open `demo/index.html` in your browser:

```bash
# Windows
start demo/index.html

# Mac
open demo/index.html

# Linux
xdg-open demo/index.html
```

---

## Publish Python Package to PyPI

### Prerequisites

```bash
pip install build twine
```

### Build Package

```bash
python -m build
```

This creates:
- `dist/coon_compress-0.1.0.tar.gz`
- `dist/coon_compress-0.1.0-py3-none-any.whl`

### Upload to Test PyPI (Optional)

```bash
twine upload --repository testpypi dist/*
```

### Upload to PyPI

```bash
twine upload dist/*
```

### After Publishing

Users can install with:
```bash
pip install coon-compress
```

---

## Docker Deployment (Optional)

Create `Dockerfile`:

```dockerfile
FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY coon/ ./coon/
COPY setup.py .

RUN pip install -e .

ENTRYPOINT ["coon"]
CMD ["--help"]
```

Build and run:

```bash
docker build -t coon .
docker run coon stats examples/login_screen.dart
```

---

## CI/CD with GitHub Actions

Create `.github/workflows/publish.yml`:

```yaml
name: Publish to PyPI

on:
  release:
    types: [published]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-python@v4
        with:
          python-version: '3.10'
      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install build twine
      - name: Build package
        run: python -m build
      - name: Publish to PyPI
        env:
          TWINE_USERNAME: __token__
          TWINE_PASSWORD: ${{ secrets.PYPI_API_TOKEN }}
        run: twine upload dist/*
```

---

## Monitoring & Analytics

Add analytics to the web demo by including in `demo/index.html`:

```html
<!-- Google Analytics (optional) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR_GA_ID');
</script>
```

---

## Custom Domain (Vercel)

1. Deploy to Vercel
2. Go to project Settings → Domains
3. Add your custom domain (e.g., `coon.yoursite.com`)
4. Update DNS records as instructed
5. Done!

---

**Ready to deploy?** Start with Vercel for the easiest setup!
