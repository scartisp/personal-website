# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Working agreement (read first)

This repo is the owner's personal website and, more importantly, a **learning project**. The owner
knows JavaScript at a junior level and basic HTML/CSS, but is new to React, to TypeScript, and to
building a site from scratch. Visual design is the weakest area and the one they most want to grow in.

**Act as an advisor, not as the developer.** Concretely:

- Default to explaining, sketching, and reviewing — not to writing the feature. When asked "how do I
  do X", answer with the concept, the trade-offs, and a small illustrative snippet, then let the owner
  write the real code.
- Only edit files when the owner explicitly asks for an implementation, or when they're stuck after
  trying. If you do write code, explain *why* it's shaped that way, not just what it does.
- Name the React/TypeScript concept behind each answer (props vs. state, derived state, keys,
  `useEffect` dependencies, structural typing, discriminated unions...) so the vocabulary sticks.
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

## Commands

```
npm run dev        # Vite dev server with HMR (http://localhost:5173)
npm run build      # tsc -b (typecheck, all projects) then vite build -> dist/
npm run lint       # eslint .
npm run preview    # serve the built dist/ locally, to sanity-check a production build
```

No test runner is installed. There is no `npm test` — don't assume Vitest/Jest exists; adding one is a
deliberate decision to discuss with the owner first.

`npm run dev` does **not** typecheck. Type errors only surface in the editor and in `npm run build`,
so run the build (or watch the editor) before assuming a change is clean.

## Current state

The working tree is an untouched `create-vite` **react-ts** scaffold: `src/App.tsx`, `src/App.css`,
and most of `src/index.css` are the Vite/React demo page, and `src/assets/*`, `public/icons.svg`,
`public/favicon.svg` are its artwork. **This is placeholder content to be replaced**, not a pattern to
imitate or preserve. Nothing has been committed yet.

## Architecture

Render chain: `index.html` (the only HTML file; Vite's build entry) loads `/src/main.tsx`, which mounts
`<App />` into `#root` inside `<StrictMode>`. StrictMode double-invokes render and effects in dev only —
expect duplicated logs; that's a feature that exposes impure renders, not a bug to work around.

Two asset paths, and they behave differently:
- `src/assets/*` — `import` it, Vite hashes and inlines/bundles it, broken references fail the build.
- `public/*` — referenced by absolute URL (`/icons.svg`), copied verbatim, **never checked**. Useful for
  `favicon.svg` and SVG sprites used via `<use href="/icons.svg#id">`; a typo here fails silently at runtime.

Styling is plain CSS, no preprocessor and no CSS-in-JS. Two layers, worth keeping as the site is built out:
- `src/index.css` — global layer: design tokens as CSS custom properties on `:root` (`--text`, `--bg`,
  `--accent`, `--border`, `--sans`, `--shadow`...), base typography, and a `@media (prefers-color-scheme: dark)`
  block that **only redefines those tokens**. Dark mode works because nothing hard-codes a color.
- `src/App.css` — component-level rules, imported by the component that uses them. Note CSS imports are
  global regardless of where they're imported, so class names share one namespace across the whole app;
  CSS Modules (`*.module.css`) is the escape hatch if that starts to bite.

The CSS uses **native nesting** (`&:hover`, nested selectors) — a browser feature, not Sass.

## TypeScript setup

`tsconfig.json` is a solution file with project references: `tsconfig.app.json` covers `src/` (browser
libs, `vite/client` types), `tsconfig.node.json` covers Vite's own config. That's why the build runs
`tsc -b` (build mode) rather than plain `tsc`. Editing `tsconfig.json` directly is almost never right —
change `tsconfig.app.json` for app code.

Compiler settings that will produce surprising errors for a TS newcomer:
- `verbatimModuleSyntax` — type-only imports must be written `import type { Foo } from './foo'`.
- `noUnusedLocals` / `noUnusedParameters` — an unused variable is a build failure, not a warning.
- `erasableSyntaxOnly` — `enum`, `namespace`, and constructor parameter properties are rejected; use
  union types and plain assignment instead.
- `strict` is **not** enabled by the scaffold. Turning it on early (in `tsconfig.app.json`) is the single
  highest-value TS decision for a learning project; discuss it before the codebase grows.

## Lint

Flat config in `eslint.config.js`: JS recommended + `typescript-eslint` recommended (non-type-aware) +
`react-hooks` + `react-refresh` (the Vite variant, which flags non-component exports that would break HMR).
Type-aware linting is available but off; `README.md` is still the scaffold's default and documents how to
enable `recommendedTypeChecked` and the react-x/react-dom plugins. Replace that README with a real one when
the site takes shape.
