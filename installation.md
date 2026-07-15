# Installation Guide

## Prerequisites

- OpenCode (latest version)
- Node.js 18+

## Step 1: Clone or copy the plugin

```bash
# Clone from GitHub
git clone https://github.com/yourname/frontend-pack.git ~/.config/opencode/plugin/frontend-pack

# Or copy the directory
cp -r frontend-pack ~/.config/opencode/plugin/frontend-pack
```

## Step 2: Install dependencies

```bash
cd ~/.config/opencode/plugin/frontend-pack
npm install
```

## Step 3: Add to OpenCode config

Edit `~/.config/opencode/opencode.json`:

```json
{
  "plugin": ["./plugin/frontend-pack"]
}
```

If you have other plugins, add it to the array:

```json
{
  "plugin": ["@dietrichgebert/ponytail", "./plugin/frontend-pack"]
}
```

## Step 4: Verify installation

Open OpenCode and type:

```
/help
```

You should see the Frontend Pack commands listed.

Try a command:

```
/design landing
```

## npm Installation (when published)

```bash
npm install -g @yourname/frontend-pack
```

Then add to `opencode.json`:

```json
{
  "plugin": ["@yourname/frontend-pack"]
}
```

## Updating

```bash
cd ~/.config/opencode/plugin/frontend-pack
git pull
```

## Uninstalling

Remove `"./plugin/frontend-pack"` from your `opencode.json` plugin array.

Optionally delete the directory:

```bash
rm -rf ~/.config/opencode/plugin/frontend-pack
```
