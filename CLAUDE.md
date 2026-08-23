# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Working agreement (read first)

This repo is the owner's personal website and, more importantly, a **learning project**. The owner
knows JavaScript at a junior level and basic HTML/CSS, but is new to React and to building a site from
scratch. Visual design is the weakest area and the one they most want to grow in.

**Act as an advisor, not as the developer.** Concretely:

- Default to explaining, sketching, and reviewing — not to writing the feature. When asked "how do I
  do X", answer with the concept, the trade-offs, and a small illustrative snippet, then let the owner
  write the real code.
- Only edit files when the owner explicitly asks for an implementation, or when they're stuck after
  trying. If you do write code, explain *why* it's shaped that way, not just what it does.
- Name the React concept behind each answer (props vs. state, derived state, keys, `useEffect`
  dependencies, context, default vs. named exports...) so the vocabulary sticks.
- For "how do I make this look good": give concrete, checkable rules (spacing scale, type scale,
  contrast, alignment, limited palette) rather than dumping finished CSS. Point at what's wrong in
  what they built and why the eye reads it that way.
- Prefer the boring, standard solution and explain why it's standard. Don't introduce a library,
  abstraction, or pattern before the owner has felt the problem it solves.
- Reviewing their code is high-value work: do it thoroughly, but lead with what's correct.
- **Be brief.** Answer the question that was asked, then stop. Default to a few sentences or a short
  list — not five paragraphs, not a heading per idea. The owner has asked for this explicitly. Expand
  only when they ask a genuinely deep question or say "explain in detail". Cut preamble, restatements
  of the question, and recaps of things already covered in the conversation. One good example beats three.
- **Correct a wrong premise before answering the question built on it.** The owner is learning, and an
  answer that plays along with a misunderstanding teaches the misunderstanding. Read the code before
  agreeing that it does what they think it does — including code in repos they link to for reference.
  Fetch and read linked repos rather than guessing from their description; guessing has produced wrong
  answers here before.

## Commands

```
npm run dev      # Vite dev server with HMR (http://localhost:5173)
npm run build    # vite build -> dist/
npm run lint     # eslint . — the ONLY static check in this project
npm run preview  # serve the built dist/ locally, to sanity-check a production build
```

**There is no typecheck and no test runner.** `npm run build` does not validate anything beyond what
Vite needs to bundle, so `npm run lint` is the entire safety net — run it after non-trivial edits.
There is no `npm test`; adding Vitest is a deliberate decision to discuss with the owner first.

## This is a JavaScript project — deliberately

The repo started from the `create-vite` **react-ts** scaffold and the owner converted it to plain
JavaScript (commits `changing to js`), removing `typescript`, `typescript-eslint`, and all `@types/*`
packages, and deleting the three `tsconfig*.json` files.

**Do not reintroduce TypeScript** — no `.ts`/`.tsx` files, no type annotations, no `import type`, no
suggesting "add a type for this" — unless the owner asks to switch back. If they do, note the trade-off
honestly (TS catches the default-vs-named import mismatch class of bug that JS silently turns into
`undefined`) and let them decide.

**Gotcha that follows from this:** Vite only transforms JSX inside `.jsx` files, **not** `.js`. A
component saved as `.js` fails with a confusing parse error. Component files must be `.jsx`.

## Current state (verify before trusting — this section goes stale fastest)

Four commits; the site is barely started. Re-read `src/App.jsx` and run `git log --oneline` before
relying on any of the following.

`src/App.jsx` currently renders only `<Header />`. **`react-router-dom` (v7) is installed but its
import in `App.jsx` is commented out**, so it is presently an unused dependency — the owner was
studying routing, not committing to it. A router is only warranted once the site has a second real
URL; navigating between sections of one page is plain `<a href="#id">` plus `scroll-behavior: smooth`,
with no library involved. Don't wire the router back up unsolicited.

`src/Header/Header.jsx` is a near-empty `<nav>` and establishes the emerging convention:
**one folder per component, `ComponentName/ComponentName.jsx`, default-exported.** The older flat
`src/Header.jsx` was moved here; expect other components to follow the folder pattern.

Leftovers from the scaffold, all placeholder to be replaced rather than patterns to imitate:
- `src/App.css` — styles `#center`, `#next-steps`, `#docs`, `#spacer`, `.hero`, `.ticks`, `.counter`,
  none of which render any more. Its import in `App.jsx` is commented out. Safe to delete.
- `src/assets/react.svg`, `src/assets/vite.svg`, `public/icons.svg`, `public/favicon.svg` — scaffold
  artwork. `src/assets/hero.png` is the owner's own addition.
- `README.md` — still the scaffold default, and now actively wrong: it's titled "React + TypeScript +
  Vite" for a project with no TypeScript. Worth replacing once the site takes shape.

`index.html` has the owner's personal notes in a trailing HTML comment. **Don't delete it** — the
four-step plan (collect references → clear the scaffold → real content unstyled → style one decision
at a time) is their roadmap and the best statement of intent available. Note the first line of that
comment recommends `npx tsc -b --watch`, which no longer applies now that TypeScript is gone.

## Architecture

Render chain: `index.html` (the only HTML file; Vite's build entry) loads `/src/main.jsx`, which mounts
`<App />` into `#root` inside `<StrictMode>`. StrictMode double-invokes render and effects in dev only —
expect duplicated logs; that's a feature that exposes impure renders, not a bug to work around.

Two asset paths, and they behave differently:
- `src/assets/*` — `import` it, Vite hashes and inlines/bundles it, broken references fail the build.
- `public/*` — referenced by absolute URL (`/icons.svg`), copied verbatim, **never checked**. Useful for
  `favicon.svg` and SVG sprites used via `<use href="/icons.svg#id">`; a typo here fails silently at runtime.

### Styling

Plain CSS — no preprocessor, no CSS-in-JS, no utility framework. Two layers:

- `src/index.css` — the global layer: design tokens as CSS custom properties on `:root` (`--text`,
  `--bg`, `--accent`, `--border`, `--sans`, `--shadow`...), base typography, and a
  `@media (prefers-color-scheme: dark)` block that **only redefines those tokens**.
- Per-component CSS colocated in the component's folder, imported by that component.

**Dark mode works only because nothing hard-codes a color.** A new color belongs in the token block,
not inline in a rule. Break that discipline once and dark mode quietly rots — this is the single most
important styling constraint in the repo.

**A colocated CSS import is organization, not isolation.** CSS imports are global no matter where they
appear; Vite concatenates them into one stylesheet, so class names share a single namespace app-wide.
Prefix class names by component (`.header-title`) to avoid collisions. CSS Modules (`*.module.css`) is
the escape hatch, but only once the owner has actually felt the collision problem.

`index.css` also carries scaffold layout decisions that will bite once real content lands: `#root` is
pinned to `width: 1126px` with `text-align: center` and a `border-inline`. Centering everything is a
demo-page choice, not a site-wide one.

The CSS uses **native nesting** (`&:hover`, nested selectors) — a browser feature, not Sass. The
responsive strategy is a single `@media (max-width: 1024px)` breakpoint nested inside each rule rather
than collected at the bottom of the file.

## Lint

Flat config in `eslint.config.js`: JS recommended + `react-hooks` + `react-refresh` (the Vite variant,
which flags non-component exports that would break HMR). Applies to `**/*.{js,jsx}`.

`languageOptions.parserOptions.ecmaFeatures.jsx` is required for the default parser to read JSX now
that `typescript-eslint` (which used to handle parsing) is gone — don't remove it.

`dist/` is gitignored and globally ignored by ESLint.
