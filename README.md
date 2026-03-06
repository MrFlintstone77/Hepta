# ParioGO Design System

A React-based design system with documentation, optimized as an AI source of truth for frontend development.

## Structure

```
packages/
  tokens/      Design tokens (JSON + CSS + manifest)
  components/  React components (Button, Input, Card)
docs/          Documentation site
```

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:5173 (or the port shown) for the docs site.

## Build

```bash
npm run build
```

Outputs:

- `packages/tokens/dist/` – tokens.css, tokens.json, tokens.manifest.json
- `packages/components/dist/` – component library + components.manifest.json
- `docs/dist/` – static documentation site

## Usage in your app

```bash
npm install @pariogo/components @pariogo/tokens
```

```tsx
import '@pariogo/tokens/css';
import '@pariogo/components/styles.css';
import { Button, Input, Card } from '@pariogo/components';
```

## Theming

Set `data-theme="light"` or `data-theme="dark"` on `document.documentElement` to switch themes.

## AI Integration

- **tokens.manifest.json** – all tokens with descriptions, light/dark values
- **components.manifest.json** – component list, props, usage examples
- **.cursorrules** – guidance for AI when using this design system
