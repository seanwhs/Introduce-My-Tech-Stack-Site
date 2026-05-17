# THE STACK — Multi-Surface Runtime Architecture

> A documentation website introducing a modern, production-grade web stack built for rapid delivery without sacrificing type safety, architectural control, or raw performance.

> This site is published at 
> https://seanwhs.github.io/Introduce-My-Tech-Stack-Site/
---

## Overview

**THE STACK** is a static, single-page documentation site that presents and explains a cohesive full-stack architecture spanning web, edge, desktop, and background worker execution surfaces. It is built with vanilla HTML, CSS, and JavaScript — styled with Tailwind CSS via CDN — with no build step required.

The site documents the following technology choices:

| Tool | Role |
|---|---|
| **Next.js** | UI composition & rendering (RSC, SSR, SSG, ISR) |
| **Bun** | Runtime, bundler, package manager, desktop compiler |
| **PostgreSQL** | Relational truth — transactional core data |
| **Appwrite** | Storage, realtime events, webhooks |
| **Clerk** | Managed identity, edge JWT verification |
| **Sanity** | Headless CMS, GROQ, Content Lake |
| **Inngest** | Durable event workflows, step functions, retries |

---

## File Structure

```
thestack/
├── index.html   # Page structure, Tailwind config, section markup
├── style.css    # Custom styles layered on top of Tailwind utilities
├── app.js       # All interactive behaviour (canvas, observers, filters)
└── README.md    # This file
```

No framework. No build pipeline. Drop the three files in any static host and it works.

---

## Features

### Design
- Dark terminal-meets-editorial aesthetic with a deliberate typographic hierarchy
- Three-font system: **Epilogue** (display headings), **Instrument Serif** (body italic), **JetBrains Mono** (labels, code, UI chrome)
- Per-section accent colours: emerald, violet, coral, amber
- Animated canvas grid drawn at runtime with dot intersections
- Subtle scanline sweep and hero glow parallax tied to mouse position

### Sections
1. **Hero** — stack overview, animated stat counters, hero tag pills
2. **Marquee** — continuous ticker of architectural properties
3. **Layers** — five operational layers with pill badges and a Bun distribution matrix table
4. **Tools** — filterable card grid for every tool in the stack, including an Inngest code example with click-to-copy
5. **Paths** — two career/product trajectories (Content Architect vs Systems Engineer) with comparison table
6. **Philosophy** — three core design principles around failure modelling and self-healing

### JavaScript behaviours (`app.js`)
- `IntersectionObserver` scroll reveal on all cards and rows
- Active nav link tracking as sections enter the viewport
- Tool category filter tabs with fade-in re-animation on switch
- Animated number counters for the stat boxes
- Click-to-copy on the Inngest code block
- Mouse-tracked parallax on hero glow blobs
- Nav frosted-glass activation on scroll
- Per-layer left-bar accent colours injected at runtime

---

## Usage

### Local (no server needed)
Open `index.html` directly in any modern browser. Because Tailwind is loaded from CDN and all assets are relative, no server is required for local viewing.

### Static hosting
Upload the three files (`index.html`, `style.css`, `app.js`) to any static host:

```
Vercel   →  vercel deploy
Netlify  →  drag-and-drop the folder
GitHub Pages  →  push to a gh-pages branch
```

### As part of a Next.js project
Place the files inside the `public/` directory and reference them at `/index.html`, or integrate the markup and styles into your existing Next.js pages as a dedicated route.

---

## Customisation

### Colours
All accent colours are defined as Tailwind theme extensions inside the `<script>` block in `index.html` and mirrored as CSS custom properties in `style.css`:

```js
// tailwind.config (inside index.html)
colors: {
  emerald: { DEFAULT: '#3dffa0', dim: 'rgba(61,255,160,0.12)' },
  violet:  { DEFAULT: '#8b7fff', dim: 'rgba(139,127,255,0.12)' },
  coral:   { DEFAULT: '#ff6b6b', dim: 'rgba(255,107,107,0.12)' },
  amber:   { DEFAULT: '#ffb347', dim: 'rgba(255,179,71,0.12)'  },
}
```

### Fonts
Swap the Google Fonts `<link>` in `index.html` and update the `fontFamily` keys in the Tailwind config and `style.css` font-family declarations.

### Adding a tool card
Copy any `.tool-card` block in `index.html` and set a `data-category` attribute matching one of the existing filter values (`compute`, `data`, `auth`, `workflow`) or add a new button to `#filterTabs` and handle it in `app.js`.

### Layer accent colours
The array in `app.js` controls the left-bar colour for each layer row:

```js
const colors = ['#3dffa0', '#4fa8ff', '#8b7fff', '#ff6b6b', '#ffb347'];
```

Reorder or replace hex values to retheme the layers section.

---

## Architecture documented in this site

The stack is organised into five operational layers wired together through asynchronous event pipelines rather than traditional synchronous call chains:

```
EDGE LAYER          →  Next.js Middleware + Clerk Auth (JWT at edge)
COMPUTE LAYER       →  Next.js App Router + Bun Runtime
DATA LAYER          →  PostgreSQL + Appwrite + Sanity
ORCHESTRATION       →  Inngest (durable step functions, retries, replay)
DISTRIBUTION        →  Bun compiled binary + native WebView shell
```

The central design principle is that **failure is a path, not an exception**. Every critical workflow is event-driven via Inngest, making the entire system replayable and self-healing without manual intervention.

---

## Browser Support

Targets evergreen browsers. Uses:
- `IntersectionObserver` (no polyfill; graceful degradation — content visible, animations skipped)
- `Canvas 2D API`
- `navigator.clipboard` (copy feature degrades silently in non-secure contexts)
- CSS custom properties, `backdrop-filter`, `grid`

---

## License

MIT — use freely, attribute optionally.
