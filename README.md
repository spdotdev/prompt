# PROMPT

A static, no-backend mockup of an AI chat interface (sidebar, chat thread, syntax-highlighted code blocks, file modal). Everything is client-side and driven by mock data — there's no real LLM behind it.

- Live: <https://spdotdev.github.io/prompt/>

## Stack

- [Vite](https://vite.dev/) — dev server & build
- [Highlight.js](https://highlightjs.org/) — code block syntax highlighting
- [js-yaml](https://github.com/nodeca/js-yaml) — parses `public/config.yaml` at runtime

## Getting started

```sh
npm install
npm run dev       # local dev server
npm run build     # production build to dist/
npm run preview   # preview the production build
npm run lint      # ESLint
```

## Structure

```
public/config.yaml   # runtime app config (name, version, theme colors), fetched at load
src/main.js           # app wiring: dropdowns, chat input, mock "FILL" content, files modal
src/config.js         # loads config.yaml and applies theme colors as CSS vars
src/content.js        # mock chat messages/code blocks used by the FILL dropdown
src/style.css
src/assets/logo.png   # favicon
index.html
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds with Vite and publishes `dist/` to GitHub Pages (Pages source: GitHub Actions). `vite.config.js` sets `base: '/prompt/'` to match the Pages subpath — update it if the repo is ever renamed or moved to a custom domain.

## CI

- **CI** (`ci.yml`) — build check on PRs and pushes to non-main branches.
- **Code Quality** (`code-quality.yml`) — ESLint on PRs and `main`.
- **Security** (`security.yml`) — CodeQL static analysis + `npm audit` on PRs, `main`, and a weekly schedule.
