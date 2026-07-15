# Frontend Skill Pack for OpenCode

Premium frontend development skills for [OpenCode](https://opencode.ai). Generates production UI at Apple, Linear, Vercel, Stripe, and Notion quality.

## Features

- **38 specialized skills** — design, review, animation, accessibility, forms, tables, performance, and more
- **21 slash commands** — `/design`, `/dashboard`, `/landing`, `/auth`, `/table`, `/form`, `/ui-review`, `/refactor-ui`, etc.
- **AI slop detection** — auto-detects generic "AI-looking" UI and rewrites it
- **UI reviewer** — scores design quality 1-10; auto-refactors anything below 9
- **shadcn/ui + TailwindCSS + Framer Motion** — the full modern stack, no reinvention
- **Dark mode by default** — every component ships with `dark:` variants
- **Accessibility built in** — WCAG 2.1 AA, keyboard nav, screen reader support
- **Loading, empty, error states** — skeleton loaders, empty states with CTAs, error recovery

## Installation

Choose **one** method:

### A. Clone from GitHub (recommended)

```bash
git clone https://github.com/Dzakiamriz22/frontend-pack.git ~/.config/opencode/plugin/frontend-pack
```

Add to `opencode.json`:
```json
{
  "plugin": ["./plugin/frontend-pack"]
}
```

### B. npm (after publish)

```bash
npm install -g @dzakiamriz22/frontend-pack
```

Add to `opencode.json`:
```json
{
  "plugin": ["@dzakiamriz22/frontend-pack"]
}
```

## Quick Start

```
/design landing        → Generate a landing page
/dashboard admin       → Generate an admin dashboard
/auth login            → Generate a login page
/table users           → Generate a data table with CRUD
/form checkout         → Generate a checkout form
/ui-review             → Review and score current UI
/refactor-ui           → Refactor UI to fix issues
/animate page          → Add page transitions
```

## Usage

### Commands

| Command | Description |
|---------|-------------|
| `/design` | Open design canvas for any page/component |
| `/dashboard` | Generate dashboard layouts |
| `/landing` | Generate landing pages |
| `/auth` | Generate auth flows (login, register, forgot-password) |
| `/profile` | Generate user profile/settings pages |
| `/settings` | Generate settings pages |
| `/table` | Generate data tables with shadcn/ui |
| `/form` | Generate forms with React Hook Form + Zod |
| `/pricing` | Generate pricing pages |
| `/sidebar` | Generate sidebar navigation |
| `/navbar` | Generate navigation bars |
| `/footer` | Generate footer layouts |
| `/ui-review` | Review UI quality and score it |
| `/refactor-ui` | Auto-refactor UI issues |
| `/mobile` | Mobile-optimize current view |
| `/animate` | Add animations with Framer Motion |
| `/design-system` | Create/extend design system tokens |
| `/tailwind` | Tailwind utility and pattern help |
| `/shadcn` | shadcn/ui component help |
| `/react` | React component architecture help |
| `/next` | Next.js App Router patterns |

### Skills

38 skills are auto-loaded based on context. Key skills:

- **design** — Premium UI generation at Apple/Linear quality
- **ui-review** — Expert design review with 1-10 scoring
- **ai-slop-detector** — Detects and rewrites generic AI-looking UI
- **typography** — Professional typography scale and rhythm
- **color-system** — Color system design (OKLCH, accessible palettes)
- **spacing** — Consistent spacing with 4px/8px grid
- **accessibility** — WCAG 2.1 AA compliance
- **shadcn** — shadcn/ui component patterns
- **framer-motion** — Production animation patterns

See each skill's `SKILL.md` for full details.

## Design Standards

All generated UI targets:

- **Apple** — Pixel-perfect detail, precise alignment, premium feel
- **Linear** — Functional minimalism, excellent spacing, clean typography
- **Vercel** — Bold typography, geometric layouts, developer aesthetics
- **Stripe** — Clear hierarchy, ample whitespace, documentation-grade clarity
- **Notion** — Readable content, flexible layouts, unopinionated defaults
- **GitHub** — Dense information display, responsive tables, excellent mobile

## License

MIT
