# Hard Materials, Honest Errors

A standalone web report: a meta-review of AI and ab initio simulation errors in nine classes of high-value hard materials, and the discovery roadmap they imply. 23 chapters, 475 references.

## Stack

- Vite 7 + React 19 + TypeScript
- Tailwind CSS v3 + shadcn/ui
- react-router (SPA), GSAP, framer-motion, KaTeX, MiniSearch

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build    # tsc -b && vite build -> dist/
npm run preview  # preview the production build
```

## Deploy (Netlify)

The repo includes `netlify.toml` (build: `npm run build`, publish: `dist`, SPA redirect), so importing the repo into Netlify auto-configures the site:

1. Go to https://app.netlify.com/start and choose **GitHub**.
2. Select `alexwelcing/hard-materials-honest-errors`.
3. Netlify reads `netlify.toml` — just click **Deploy**.

Every push to `main` then triggers an automatic production deploy.
