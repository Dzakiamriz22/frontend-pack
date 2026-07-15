# Frontend Skill Pack

Premium frontend development skills for [OpenCode](https://opencode.ai). Generates production UI at Apple, Linear, Vercel, Stripe, and Notion quality.

<p align="center">
  <img src="https://img.shields.io/github/stars/Dzakiamriz22/frontend-pack?style=flat-square&color=111111&label=stars" alt="Stars">
  <img src="https://img.shields.io/github/v/release/Dzakiamriz22/frontend-pack?style=flat-square&color=111111&label=version" alt="Version">
  <img src="https://img.shields.io/badge/38-skills-111111?style=flat-square" alt="38 skills">
  <img src="https://img.shields.io/badge/21-commands-111111?style=flat-square" alt="21 commands">
  <img src="https://img.shields.io/badge/license-MIT-111111?style=flat-square" alt="MIT">
</p>

---

## Features

- **38 skills** — design, review, animation, accessibility, forms, tables, performance, code quality
- **21 slash commands** — `/design`, `/dashboard`, `/landing`, `/auth`, `/table`, `/form`, `/ui-review`, `/refactor-ui`
- **AI slop detector** — detects generic "AI-looking" UI and rewrites it
- **UI reviewer** — scores typography, spacing, hierarchy, accessibility, responsiveness, consistency, animations, states 1-10; auto-refactors below 9
- **shadcn/ui + TailwindCSS + Framer Motion** — full modern stack, no reinvention
- **Dark mode default** — every component ships with `dark:` variants
- **WCAG 2.1 AA** — keyboard nav, screen reader support, semantic HTML
- **Loading, empty, error states** — skeleton loaders, empty states with CTAs, error recovery

---

## Install

```bash
git clone https://github.com/Dzakiamriz22/frontend-pack.git ~/.config/opencode/plugin/frontend-pack
```

Add to `~/.config/opencode/opencode.json`:

```json
{
  "plugin": ["./plugin/frontend-pack"]
}
```

Restart OpenCode. Done.

---

## Quick start

```
/design landing        -> Landing page
/dashboard admin       -> Analytics dashboard
/auth login            -> Login/register with validation
/table users           -> Sortable, paginated data table
/form checkout         -> Multi-step form with Zod validation
/ui-review             -> Score current UI and auto-fix issues
/refactor-ui           -> Fix a11y, dark mode, loading states
/animate page          -> Page transitions with Framer Motion
```

---

## Commands

| Command | What it does |
|---------|--------------|
| `/design` | Generate any page or component |
| `/dashboard` | Analytics, admin, or metrics dashboard |
| `/landing` | Landing page with hero, features, CTA |
| `/auth` | Login, register, forgot/reset password |
| `/profile` | User profile with avatar, settings |
| `/settings` | App settings with server actions |
| `/table` | Data table with sort, filter, pagination |
| `/form` | Form with React Hook Form + Zod |
| `/pricing` | Pricing tiers with comparison |
| `/sidebar` | Collapsible sidebar navigation |
| `/navbar` | Top nav with mobile hamburger |
| `/footer` | Multi-column footer |
| `/ui-review` | Full design audit, scores 1-10 |
| `/refactor-ui` | Auto-fix a11y, spacing, dark mode |
| `/mobile` | Mobile-optimize touch targets |
| `/animate` | Framer Motion page transitions |
| `/design-system` | Design tokens, themes, components |
| `/tailwind` | Layout recipes, responsive patterns |
| `/shadcn` | shadcn/ui component help |
| `/react` | React patterns, hooks, composition |
| `/next` | Next.js App Router, server actions |

---

## Skills

Each command auto-loads relevant skills. Core skills:

| Skill | Purpose |
|-------|---------|
| **design** | UI generation at Apple/Linear quality |
| **ui-review** | Design review scoring 8 dimensions |
| **ai-slop-detector** | Detect and rewrite generic AI UI |
| **typography** | Type scale, font pairing, rhythm |
| **color-system** | OKLCH palettes, accessible contrast |
| **spacing** | 4px/8px grid system |
| **accessibility** | WCAG 2.1 AA compliance |
| **shadcn** | shadcn/ui component patterns |
| **framer-motion** | Production animations |
| **forms** | React Hook Form + Zod validation |
| **tables** | TanStack Table with pagination |
| **performance** | Core Web Vitals, bundle optimization |

38 skills total. Each lives in `skills/<name>/SKILL.md` with system prompt, rules, examples, and best practices.

---

## Design standards

All generated UI targets the quality of these companies:

| Company | What we learn |
|---------|--------------|
| **Apple** | Pixel-perfect alignment, precise spacing, premium feel |
| **Linear** | Functional minimalism, generous whitespace, clean palette |
| **Vercel** | Bold layouts, large typography, strong grids |
| **Stripe** | Clear hierarchy, documentation-grade clarity |
| **Notion** | Readable content-first layouts, minimal chrome |
| **GitHub** | Dense but scannable, responsive tables, excellent mobile |

---

## Project structure

```
frontend-pack/
├── .opencode/
│   ├── command/          # 21 command definitions
│   └── plugins/          # Plugin engine
├── skills/               # 38 skill directories
│   ├── design/
│   ├── ui-review/
│   ├── ai-slop-detector/
│   └── ...
├── examples/             # Usage guides
├── AGENTS.md             # Maintainer guide
└── installation.md       # Detailed setup
```

---

## Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature/my-skill`
3. Add or improve a skill in `skills/<name>/SKILL.md`
4. Commit: `git commit -m "feat: add my skill"`
5. Push: `git push origin feature/my-skill`
6. Open a pull request

See [AGENTS.md](AGENTS.md) for the skill architecture guide.

---

MIT License · [GitHub](https://github.com/Dzakiamriz22/frontend-pack) · Built for [OpenCode](https://opencode.ai)
