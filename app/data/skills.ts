export interface SkillGroup {
  icon: string
  title: string
  items: string[]
}

export const skillLinks: Record<string, string> = {
  Javascript: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  TypeScript: 'https://www.typescriptlang.org/',
  'C#': 'https://learn.microsoft.com/en-us/dotnet/csharp/',
  Python: 'https://www.python.org/',
  'Vue 3': 'https://vuejs.org/',
  'Nuxt.js': 'https://nuxt.com/',
  'Node.js': 'https://nodejs.org/',
  Webpack: 'https://webpack.js.org/',
  Vite: 'https://vitejs.dev/',
  Docker: 'https://www.docker.com/',
  'Shadcn UI': 'https://ui.shadcn.com/',
  Antd: 'https://ant.design/',
  TailwindCSS: 'https://tailwindcss.com/',
  'Element Plus': 'https://element-plus.org/',
  Pinia: 'https://pinia.vuejs.org/',
  'TanStack Query': 'https://tanstack.com/query',
  MySQL: 'https://www.mysql.com/'
}

export const skillGroups: SkillGroup[] = [
  {
    icon: 'code',
    title: 'Primary Stack',
    items: ['Vue 3', 'Nuxt.js', 'TypeScript', 'TailwindCSS']
  },
  {
    icon: 'layers',
    title: 'Ecosystem',
    items: ['Javascript', 'Node.js', 'Pinia', 'TanStack Query']
  },
  {
    icon: 'design_services',
    title: 'UI Libraries',
    items: ['Shadcn UI', 'Antd', 'Element Plus']
  },
  {
    icon: 'build',
    title: 'Tools',
    items: ['Vite', 'Webpack', 'Docker', 'MySQL']
  }
]

export const initSnippet = `import { Architect } from '@portfolio/core';
import { MinimalistTheme } from '@portfolio/themes';

const system = new Architect({
    focus: 'Frontend Engineering',
    aesthetic: MinimalistTheme,
    stack: ['Vue 3', 'Nuxt.js', 'TypeScript', 'TailwindCSS'],
});

system.render();`
