# PROMPT

Static, no-backend mockup of an AI chat UI. Vanilla JS + Vite, no framework, no real LLM — all chat content is mock data. See README.md for stack/setup/structure.

## Conventions

- No framework: DOM is built with template literals + `innerHTML`, elements wired up in `src/main.js`'s `app` object (grabbed by `getElementById`). Follow this pattern rather than introducing a component library.
- `public/config.yaml` is fetched at runtime (not imported) via `fetch(\`${import.meta.env.BASE_URL}config.yaml\`)` in `src/config.js`. Any new runtime-loaded static asset must go in `public/` for the same reason — Vite only copies `public/` verbatim into `dist/`, it doesn't bundle root-level files referenced by a raw path string.
- All internal absolute paths must go through `import.meta.env.BASE_URL` (or Vite's asset handling), not hardcoded `/...` strings — the site is served from the `/prompt/` subpath on GitHub Pages (`vite.config.js` sets `base: '/prompt/'`), and a bare `/` root path 404s in production even though it works in local dev.
- Mock chat content lives in `src/content.js` (`mockContent`, `mockCodeContent`), loaded via the FILL dropdown — extend these arrays rather than hardcoding new demo messages in `main.js`.

## Deploy

`.github/workflows/deploy.yml` builds and deploys `dist/` to GitHub Pages on every push to `main`. Pages source is set to "GitHub Actions" (not the legacy branch/root mode) — don't change that in repo settings or pushes will silently stop deploying via the workflow.

## Deploy (set 2026-10-13, HARD RULE, user decision)
Production on d051 always runs the latest `main` of this project. When the user asks for a change and it is merged to main, deploy it yourself right away, without asking: push or merge, watch CI and the deploy to the end, and check the server runs that commit. If this project uses tags, deploy the latest tag every time. Anything not in main is local testing and is never deployed. A failing deploy is reported first as broken, with what it blocks. Never open PRs unless asked.
