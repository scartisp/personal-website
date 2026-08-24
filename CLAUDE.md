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
- Name the React or CSS concept behind each answer (props vs. state, derived state, keys, `useEffect`
  dependencies, normal flow vs. out-of-flow, main axis vs. cross axis) so the vocabulary sticks.
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
  answer that plays along with a misunderstanding teaches the misunderstanding. Read the CSS before
  agreeing that a rule does what they think it does — several questions here have been built on a
  property that is silently doing nothing. Fetch and read linked repos rather than guessing from their
  description; guessing has produced wrong answers here before.

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

## Architecture

Render chain: `index.html` (the only HTML file; Vite's build entry) loads `/src/main.jsx`, which mounts
`<App />` into `#root` inside `<StrictMode>`. StrictMode double-invokes render and effects in dev only —
expect duplicated logs; that's a feature that exposes impure renders, not a bug to work around.

`src/App.jsx` composes the page as a flat list of section components — currently `<Header />` and
`<Home />`. **`react-router-dom` (v7) is installed but its import in `App.jsx` is commented out**, so it
is presently an unused dependency — the owner was studying routing, not committing to it. A router is
only warranted once the site has a second real URL; navigating between sections of one page is plain
`<a href="#id">` plus `scroll-behavior: smooth`, with no library involved. Don't wire the router back
up unsolicited.

**Component convention: one folder per component, `ComponentName/ComponentName.jsx`, default-exported,
with a lowercase `componentname.css` beside it** that the component imports. Note the casing split —
the `.jsx` is PascalCase, the `.css` is lowercase. Follow it for new components.

Two asset paths, and they behave differently:
- `src/assets/*` — `import` it, Vite hashes and inlines/bundles it, broken references fail the build.
  Currently the three header icons (`github-logo.png`, `li-logo.png`, `download-icon.png`).
- `public/*` — referenced by absolute URL, copied verbatim, **never checked**. A typo here fails
  silently at runtime. `public/resume.pdf` is load-bearing: `Header.jsx` links to it with
  `<a href="/resume.pdf" download>`. `favicon.svg` and `icons.svg` are scaffold leftovers.

Fonts are Google Fonts (Handjet, Mozilla Text) loaded by `<link>` in `index.html` and exposed as the
`--Handjet` / `--Mozilla` tokens. Those tokens are named after the *typeface*, not its role, so
changing the display font means editing every rule that references it — worth mentioning if the owner
hits that pain, but it's their call.

### The fixed-header offset system

The one mechanism that spans files. `--header-size: 88px` is defined in `index.css` and consumed in
three places that must stay in sync:

- `header.css` — `.site-header { position: fixed; height: var(--header-size) }`
- `index.css` — `body { padding-top: var(--header-size) }` reserves the space the fixed header vacated
- `index.css` — `html { scroll-padding-top: var(--header-size) }` stops the header from covering a
  section heading when an `#id` anchor jumps to it

Change the header's height only through that token.

**The recurring bug in this repo:** copying `position: fixed; inset-inline: 0` out of `header.css` into
a content component. The header *should* be fixed; content should not. A fixed element is out of
normal flow and contributes zero height to the document, which makes the page unscrollable and the
section invisible to everything below it. `.home` in `src/Home/home.css` has this right now. Check for
it before debugging any "my layout is wrong / the page won't scroll" question.

### Styling

Plain CSS — no preprocessor, no CSS-in-JS, no utility framework. Two layers:

- `src/index.css` — the global layer: a `*, *::before, *::after { box-sizing: border-box }` reset,
  design tokens as CSS custom properties on `:root` (sizing: `--header-size`, `--title-size`,
  `--sub-title-size`, `--home-name-size`; fonts: `--Handjet`, `--Mozilla`; color: `--bg`, `--text`,
  `--border`, `--accent`), and base `html`/`body` rules.
- Per-component CSS colocated in the component's folder, imported by that component.

**A colocated CSS import is organization, not isolation.** CSS imports are global no matter where they
appear; Vite concatenates them into one stylesheet, so class names share a single namespace app-wide.
Prefix class names by component (`.header-nav`, `.home-name`) to avoid collisions. CSS Modules
(`*.module.css`) is the escape hatch, but only once the owner has actually felt the collision problem.

Dark mode: the `@media (prefers-color-scheme: dark)` block in `index.css` exists but is **entirely
commented out**, with a TODO noting the PNG icons need dark variants. Two things already work against
turning it back on — `--accent:` is declared empty (an invalid value), and `home.css` hard-codes
`#73000A` for `.last-name`. If the owner wants dark mode back, the fix is to make every color a token
first; a new color belongs in the token block, not inline in a rule.

The `#73000A` dark red is currently the site's only accent color and it's the natural candidate for
`--accent`.

## Known dead code

- `src/App.css` — pure scaffold. Styles `#center`, `#next-steps`, `#docs`, `#spacer`, `.hero`,
  `.ticks`, `.counter`, none of which render any more. Its import in `App.jsx` is commented out. This
  is also the only file using native CSS nesting and the `@media (max-width: 1024px)` breakpoint, so
  don't cite it as evidence of the project's conventions — the owner's own CSS has no media queries
  yet, meaning **the site is currently not responsive at all**. Safe to delete.
- `README.md` — still the scaffold default, titled "React + TypeScript + Vite" for a project with no
  TypeScript. Worth replacing once the site takes shape.
- `public/favicon.svg`, `public/icons.svg` — scaffold artwork.

## Roadmap

`index.html` has the owner's personal notes in a trailing HTML comment. **Don't delete it** — the
four-step plan (collect references → clear the scaffold → real content unstyled → style one decision
at a time) is their roadmap and the best statement of intent available. Note the first line of that
comment recommends `npx tsc -b --watch`, which no longer applies now that TypeScript is gone.

Work happens on topic branches (`header`, `about-section`) merged toward `main`; `origin` has `main`
and `header`. The current branch name is usually the best signal of what section is being built.

## Lint

Flat config in `eslint.config.js`: JS recommended + `react-hooks` + `react-refresh` (the Vite variant,
which flags non-component exports that would break HMR). Applies to `**/*.{js,jsx}`.

`languageOptions.parserOptions.ecmaFeatures.jsx` is required for the default parser to read JSX now
that `typescript-eslint` (which used to handle parsing) is gone — don't remove it.

`dist/` is gitignored and globally ignored by ESLint.
