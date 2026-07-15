# Installation Guide

One-time setup. Takes ~30 seconds.

## Prerequisites

- [OpenCode](https://opencode.ai) (latest version)
- [Git](https://git-scm.com)

> Node.js is **not** required. No build step.

---

## 1. Clone

```bash
git clone https://github.com/Dzakiamriz22/frontend-pack.git ~/.config/opencode/plugin/frontend-pack
```

Downloads all 38 skills, 21 commands, and the plugin engine.

---

## 2. Configure

Edit `~/.config/opencode/opencode.json`:

```json
{
  "plugin": ["./plugin/frontend-pack"]
}
```

With other plugins (e.g. ponytail):

```json
{
  "plugin": ["@dietrichgebert/ponytail", "./plugin/frontend-pack"]
}
```

---

## 3. Verify

Open OpenCode and run:

```
/help
```

You should see Frontend Pack commands listed. Try it:

```
/design landing
```

The AI generates a landing page with hero, features grid, testimonials, CTA, dark mode, loading states, and responsive layout.

---

## Updating

```bash
cd ~/.config/opencode/plugin/frontend-pack
git pull
```

---

## Uninstalling

1. Remove `"./plugin/frontend-pack"` from `opencode.json`
2. Delete the directory:

```bash
rm -rf ~/.config/opencode/plugin/frontend-pack
```

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Commands not in `/help` | Check `opencode.json` — `plugin` must be an array |
| Clone fails | Ensure Git is installed and you have internet |
| Path not found on Windows | Use `%USERPROFILE%\.config\opencode\plugin` |
| Skills feel incomplete | Run `/ui-review` to score and auto-fix |

---

Questions? [Open an issue](https://github.com/Dzakiamriz22/frontend-pack/issues).
