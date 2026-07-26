# Nextlinks presentation

A Reveal.js presentation built with React, TypeScript, and Vite. The deck uses the official [`@revealjs/react`](https://revealjs.com/react/) bindings.

## Requirements

- Node.js 20.19+ or 22.12+
- pnpm 11+

## Commands

```sh
pnpm install
pnpm dev       # start the local development server
pnpm lint      # run Oxlint
pnpm build     # type-check and create dist/
pnpm preview   # serve the production build locally
```

## Editing the deck

- Add and edit slides in `src/App.tsx`.
- Customize the Reveal.js theme tokens in `src/theme/achroma.scss`.
- Add deck-specific styles in `src/App.css`.
- Put static files in `public/` and reference them from `/` (for example, `/diagram.svg`).
- Pass Reveal.js options through `deckConfig` and register plugins in `plugins`.

The starter deck demonstrates horizontal slides, a vertical `Stack`, animated `Fragment` content, syntax-highlighted `Code`, and speaker notes.

## Theme

The **Achroma** theme in `src/theme/achroma.scss` follows Reveal.js's official Sass theme structure and maps the presentation variables to the same semantic OKLCH palette used by the Shadcn theme. Merriweather Sans, Fraunces, and Fira Code are bundled locally through Fontsource.

Dark mode is enabled by the `dark` class on `<html>` in `index.html`. Remove that class to use the light palette.

## Presenting

- **Arrow keys / Space**: navigate
- **S**: open speaker view
- **F**: fullscreen
- **O**: overview
- **B**: pause to a blank screen
