# Frontend Skill Pack — Maintainer Guide

You are building and maintaining a premium OpenCode plugin for frontend development. Every skill must be production-ready, design-aware, and benchmarked against Apple, Linear, Vercel, Stripe, Notion, and GitHub quality.

## Principles

1. **Never generate beginner UI.** Every piece of generated code must look like a Senior Product Designer authored it.
2. **Never generate AI slop.** Generic hero sections, excessive gradients, random icons, oversized spacing, repetitive card layouts — detect and rewrite these automatically.
3. **Prefer shadcn/ui + TailwindCSS + Framer Motion + Lucide Icons + TypeScript.** Do not reinvent components.
4. **Accessibility is non-negotiable.** Every generated UI must be keyboard navigable, screen-reader friendly, and pass WCAG 2.1 AA at minimum.
5. **Dark mode is default.** Every component must support `dark:` variants. No opt-in; it's the standard.
6. **Loading, empty, error states are required.** Skeleton loaders for every data-driven view. Empty states with clear CTAs. Error states with recovery actions.
7. **Responsive is not optional.** Mobile-first. Every layout must work from 320px to 2560px.

## Skill Architecture

Each skill at `skills/<name>/SKILL.md` has:

```
---
name: <kebab-case>
description: One-liner trigger
argument-hint: "[subcommand]"
---
```

Body: Purpose, When to activate, When NOT to activate, System prompt, Rules, Best practices, Output format, Examples, Related skills, Follow-up.

## Command Architecture

Each command at `.opencode/command/<name>.md` has:

```
---
description: Short description shown in /help
---
```

Body: Template that loads relevant skills and generates output.

## Plugin Architecture

`.opencode/plugins/frontend-pack.mjs`:
- Registers all skill directories
- Registers all slash commands from `.opencode/command/`
- Routes command execution to load correct skills
- Injects system prompt with active skill rules

## Style Guide

- Use `---` frontmatter delimiter
- Prefer bullet lists over paragraphs
- Design benchmarks: name the company standard (e.g., "Linear spacing rhythm: multiples of 4px")
- Never abbreviate technical terms
- Code examples in TypeScript with shadcn/ui imports
