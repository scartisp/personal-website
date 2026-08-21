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
- Correct a wrong premise before answering the question built on it. The owner is learning, and an
  answer that plays along with a misunderstanding teaches the misunderstanding. Read the code before
  agreeing that it does what they think it does — including code in repos they link to for reference.

## Commands

```
npm run dev          # Vite dev server with HMR (http://localhost:5173)
npm run build        # tsc -b (typecheck, all projects) then vite build -> dist/
npm run lint         # eslint .
npm run preview      # serve the built dist/ locally, to sanity-check a production build
npx tsc -b --watch   # continuous typecheck across all files, not just the ones open in the editor
```

No test runner is installed. There is no `npm test` — don't assume Vitest/Jest exists; adding one is a
deliberate decision to discuss with the owner first.

`npm run dev` does **not** typecheck. Type errors only surface in the editor and in `npm run build`.
The owner's own note in `index.html` recommends keeping `npx tsc -b --watch` running, since the editor
only reports errors for open files — a rename that breaks a closed file is otherwise invisible.

## Current state (verify before trusting — this section goes stale fastest)

One commit (`initial commit`), and the tree is mid-refactor away from the `create-vite` **react-ts**
scaffold. Re-read `src/App.tsx` and run `git log --oneline` before relying on any of the following.

**`src/App.tsx` is currently a syntax error, so `npm run build` and `npm run lint` both fail:**

```
src/App.tsx(12,3): error TS1109: Expression expected.
```

The component has an empty `return ( )` with imports (`useState`, `reactLogo`, `viteLogo`, `heroImg`)
left dangling above it. **This is the owner's work in progress, not a bug to fix on sight.** They are
clearing the scaffold out by hand. Don't "repair" it into something that compiles unless asked, and
expect a red build until they finish. Once the syntax error is gone, `noUnusedLocals` will immediately
flag whichever of those imports are still unused.

Consequently `src/App.css` is now largely **orphaned**: `#center`, `#next-steps`, `#docs`, `#spacer`,
`.hero`, `.ticks`, and `.counter` style scaffold markup that no longer renders. Likewise
`src/assets/react.svg`, `src/assets/vite.svg`, `public/icons.svg`, and `public/favicon.svg` are scaffold
artwork; `src/assets/hero.png` is the owner's own addition. All of it is placeholder to be replaced, not
a pattern to imitate or preserve.

`README.md` is still the scaffold's default and documents nothing about this site. Replace it with a
real one when the site takes shape.

`index.html` has the owner's personal notes appended in a trailing HTML comment — the `tsc -b --watch`
reminder and their own four-step plan (collect references → clear the scaffold → real content unstyled →
style one decision at a time). **Don't delete it.** It's their roadmap and the best available statement
of what they intend to do next.

## Architecture

Render chain: `index.html` (the only HTML file; Vite's build entry) loads `/src/main.tsx`, which mounts
`<App />` into `#root` inside `<StrictMode>`. StrictMode double-invokes render and effects in dev only —
expect duplicated logs; that's a feature that exposes impure renders, not a bug to work around.

Single page, no router, and no `react-router-dom` dependency. A router is only warranted once the site
has a second real URL; navigation between sections of one page is plain `<a href="#id">` plus
`scroll-behavior: smooth`, with no library involved.

Two asset paths, and they behave differently:
- `src/assets/*` — `import` it, Vite hashes and inlines/bundles it, broken references fail the build.
- `public/*` — referenced by absolute URL (`/icons.svg`), copied verbatim, **never checked**. Useful for
  `favicon.svg` and SVG sprites used via `<use href="/icons.svg#id">`; a typo here fails silently at runtime.

Styling is plain CSS, no preprocessor and no CSS-in-JS. Two layers, worth keeping as the site is built out:
- `src/index.css` — global layer: design tokens as CSS custom properties on `:root` (`--text`, `--bg`,
  `--accent`, `--border`, `--sans`, `--shadow`...), base typography, and a `@media (prefers-color-scheme: dark)`
  block that **only redefines those tokens**. Dark mode works because nothing hard-codes a color. Preserve
  that discipline — a new color belongs in the token block, not inline in a rule.
- `src/App.css` — component-level rules, imported by the component that uses them. Note CSS imports are
  global regardless of where they're imported, so class names share one namespace across the whole app;
  CSS Modules (`*.module.css`) is the escape hatch if that starts to bite.

`index.css` also carries scaffold layout decisions that will bite once real content lands: `#root` is
pinned to `width: 1126px` with `text-align: center` and a `border-inline`. Centering everything is a
demo-page choice, not a site-wide one.

The CSS uses **native nesting** (`&:hover`, nested selectors) — a browser feature, not Sass. The
responsive strategy is a single `@media (max-width: 1024px)` breakpoint, nested inside each rule rather
than collected at the bottom of the file.

## TypeScript setup

`tsconfig.json` is a solution file with project references: `tsconfig.app.json` covers `src/` (browser
libs, `vite/client` types), `tsconfig.node.json` covers Vite's own config. That's why the build runs
`tsc -b` (build mode) rather than plain `tsc`. Editing `tsconfig.json` directly is almost never right —
change `tsconfig.app.json` for app code.

`strict` is **enabled** — the owner turned it on deliberately (the scaffold ships it off). Expect
`null`/`undefined` to be tracked and implicit `any` to be rejected. That's intended; don't loosen it to
make an error go away. `main.tsx` uses a non-null assertion, `getElementById('root')!`, which is the
standard way to satisfy `strict` at that one line.

Other settings that produce surprising errors for a TS newcomer:
- `verbatimModuleSyntax` — type-only imports must be written `import type { Foo } from './foo'`.
- `noUnusedLocals` / `noUnusedParameters` — an unused variable is a build failure, not a warning.
- `erasableSyntaxOnly` — `enum`, `namespace`, and constructor parameter properties are rejected; use
  union types and plain assignment instead.
- `noFallthroughCasesInSwitch` — a non-empty `case` that falls through needs an explicit `break`/`return`.

## Lint

Flat config in `eslint.config.js`: JS recommended + `typescript-eslint` recommended (non-type-aware) +
`react-hooks` + `react-refresh` (the Vite variant, which flags non-component exports that would break HMR).
Type-aware linting is available but off; the scaffold `README.md` documents how to enable
`recommendedTypeChecked` and the react-x/react-dom plugins if that's ever wanted.

`dist/` is gitignored and globally ignored by ESLint.
