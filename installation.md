# Installation Guide

<p align="center">
  <b>One-time setup. Takes ~30 seconds.</b>
</p>

<br>

## Prerequisites

- **OpenCode** (latest version) — [opencode.ai](https://opencode.ai)
- **Git** — [git-scm.com](https://git-scm.com)

> Node.js is **not** required. This plugin is pure markdown + JavaScript/TypeScript skill definitions. No build step.

<br>

---

## Step 1: Clone

```bash
git clone https://github.com/Dzakiamriz22/frontend-pack.git \
  ~/.config/opencode/plugin/frontend-pack
```

This downloads all 38 skills, 21 commands, and the plugin engine to your machine.

<br>

---

## Step 2: Configure

Edit `~/.config/opencode/opencode.json`:

**Standalone:**
```json
{
  "plugin": ["./plugin/frontend-pack"]
}
```

**With other plugins (e.g. ponytail):**
```json
{
  "plugin": ["@dietrichgebert/ponytail", "./plugin/frontend-pack"]
}
```

<br>

---

## Step 3: Verify

Open OpenCode and type:

```
/help
```

You should see Frontend Pack commands listed (design, dashboard, landing, auth, etc.).

Try it:

```
/design landing
```

The AI will generate a production-ready landing page with:
- Hero section
- Features grid
- Testimonials
- CTA
- Dark mode
- Loading, empty, error states
- Responsive layout

<br>

---

## Updating

```bash
cd ~/.config/opencode/plugin/frontend-pack
git pull
```

<br>

---

## Uninstalling

1. Remove `"./plugin/frontend-pack"` from `opencode.json`
2. Delete the directory:

```bash
rm -rf ~/.config/opencode/plugin/frontend-pack
```

<br>

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Commands not showing in `/help` | Check `opencode.json` syntax — `plugin` must be an array |
| Clone fails | Ensure Git is installed and you have internet access |
| Path not found on Windows | Use `%USERPROFILE%\.config\opencode\plugin` or the full path |
| Skills feel incomplete | Run `/ui-review` to score the output and auto-fix |

<br>

---

<p align="center">
  <sub>Questions? <a href="https://github.com/Dzakiamriz22/frontend-pack/issues">Open an issue</a></sub>
</p>
