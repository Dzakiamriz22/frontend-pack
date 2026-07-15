// frontend-pack — OpenCode Frontend Skill Pack plugin.
//
// Registers 38 frontend skills + 21 slash commands for production UI generation
// at Apple/Linear/Vercel quality. Auto-loads AI slop detection and UI review
// on every generated output.
//
// OpenCode loads this as a server plugin:
//   { "plugin": ["./plugin/frontend-pack"] }

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pluginRoot = path.resolve(__dirname, '..', '..');

// Skill names map to their directory and trigger patterns.
// Used for command routing: /design -> loads ['design', 'typography', 'color-system']
const COMMAND_SKILLS = {
  design:           ['design', 'typography', 'color-system', 'spacing'],
  dashboard:        ['design', 'react', 'nextjs', 'tailwind', 'shadcn', 'component-architecture'],
  landing:          ['design', 'tailwind', 'tailwind-animation', 'responsive'],
  auth:             ['design', 'react', 'nextjs', 'shadcn', 'forms', 'accessibility'],
  profile:          ['design', 'react', 'shadcn', 'forms', 'state-management'],
  settings:         ['design', 'react', 'shadcn', 'forms', 'server-actions'],
  table:            ['design', 'shadcn', 'tables', 'react', 'performance'],
  form:             ['design', 'shadcn', 'forms', 'react', 'accessibility', 'ux-writing'],
  pricing:          ['design', 'tailwind', 'responsive', 'typography', 'micro-interactions'],
  sidebar:          ['design', 'shadcn', 'react', 'nextjs', 'responsive'],
  navbar:           ['design', 'shadcn', 'react', 'responsive'],
  footer:           ['design', 'shadcn', 'react', 'responsive'],
  'ui-review':      ['ui-review', 'ai-slop-detector', 'accessibility', 'typography', 'color-system', 'spacing'],
  'refactor-ui':    ['refactor-ui', 'ai-slop-detector', 'accessibility', 'component-splitting', 'cleanup'],
  mobile:           ['mobile', 'responsive', 'design', 'accessibility'],
  animate:          ['framer-motion', 'page-transitions', 'micro-interactions', 'tailwind-animation'],
  'design-system':  ['design-system', 'color-system', 'typography', 'spacing', 'tailwind'],
  tailwind:         ['tailwind', 'tailwind-layout', 'tailwind-animation', 'responsive'],
  shadcn:           ['shadcn', 'forms', 'tables', 'dialogs', 'command-palette', 'charts'],
  react:            ['react', 'hooks', 'component-architecture', 'state-management'],
  next:             ['nextjs', 'app-router', 'server-components', 'server-actions'],
};

// All skill directories
const ALL_SKILLS = Object.keys(COMMAND_SKILLS);

function parseCommandFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return null;
  const description = match[1].match(/description:\s*(.+)/)?.[1]?.trim();
  return { description, template: match[2].trim() };
}

function loadSkill(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (!match) return null;
    const name = match[1].match(/name:\s*(.+)/)?.[1]?.trim();
    const description = match[1].match(/description:\s*(.+)/)?.[1]?.trim();
    return { name, description, content: match[2].trim() };
  } catch {
    return null;
  }
}

export default async ({ client } = {}) => {
  const log = (level, message) => {
    try { client && client.app && client.app.log({ body: { service: 'frontend-pack', level, message } }); } catch (e) {}
  };

  const skillsBaseDir = path.resolve(pluginRoot, 'skills');
  const commandDir = path.resolve(pluginRoot, '.opencode', 'command');

  return {
    config: async (config) => {
      // Register slash commands
      if (!config.command) config.command = {};
      try {
        for (const file of fs.readdirSync(commandDir).filter((f) => f.endsWith('.md'))) {
          const name = path.basename(file, '.md');
          const parsed = parseCommandFile(path.join(commandDir, file));
          if (parsed) {
            config.command[name] = parsed;
          }
        }
        log('info', `Registered ${fs.readdirSync(commandDir).filter(f => f.endsWith('.md')).length} commands`);
      } catch (e) {
        log('error', `Failed to register commands: ${e.message}`);
      }

      // Register all skill directories
      config.skills = config.skills || {};
      config.skills.paths = config.skills.paths || [];
      try {
        for (const skillName of fs.readdirSync(skillsBaseDir)) {
          const skillPath = path.join(skillsBaseDir, skillName);
          if (fs.statSync(skillPath).isDirectory()) {
            const skmd = path.join(skillPath, 'SKILL.md');
            if (fs.existsSync(skmd)) {
              if (!config.skills.paths.includes(skillPath)) {
                config.skills.paths.push(skillPath);
              }
            }
          }
        }
        log('info', `Registered ${config.skills.paths.length} skill directories`);
      } catch (e) {
        log('error', `Failed to register skills: ${e.message}`);
      }
    },

    // Inject active skill rules into system prompt based on context
    'experimental.chat.system.transform': async (_input, output) => {
      try {
        const skillsDir = path.resolve(pluginRoot, 'skills');
        for (const skillName of ALL_SKILLS) {
          const skmd = path.join(skillsDir, skillName, 'SKILL.md');
          if (fs.existsSync(skmd)) {
            const skill = loadSkill(skmd);
            if (skill) {
              output.system.push({
                role: 'system',
                content: `[skill:${skill.name}] ${skill.description}`,
              });
            }
          }
        }
      } catch (e) {
        // silent
      }
    },

    // Route slash commands to load relevant skills
    'command.execute.before': async (input) => {
      if (!input || !input.command) return;
      const command = input.command.toLowerCase();
      const skillsToLoad = COMMAND_SKILLS[command];
      if (!skillsToLoad) return;

      const skillsDir = path.resolve(pluginRoot, 'skills');
      const loaded = [];
      for (const skillName of skillsToLoad) {
        const skmd = path.join(skillsDir, skillName, 'SKILL.md');
        if (fs.existsSync(skmd)) {
          loaded.push(skillName);
        }
      }
      log('info', `/${command} loading skills: ${loaded.join(', ')}`);
    },
  };
};
