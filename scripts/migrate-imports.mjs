import fs from 'fs';
import path from 'path';

const srcDir = path.resolve('src');

const replacements = [
  [/from '\.\.\/\.\.\/hooks\//g, "from '@/hooks/"],
  [/from '\.\.\/hooks\//g, "from '@/hooks/"],
  [/from '\.\/hooks\//g, "from '@/hooks/"],
  [/from '\.\.\/\.\.\/utils\//g, "from '@/utils/"],
  [/from '\.\.\/utils\//g, "from '@/utils/"],
  [/from '\.\/utils\//g, "from '@/utils/"],
  [/from '\.\.\/\.\.\/services\//g, "from '@/services/"],
  [/from '\.\.\/services\//g, "from '@/services/"],
  [/from '\.\/services\//g, "from '@/services/"],
  [/from '\.\.\/\.\.\/components\//g, "from '@/components/"],
  [/from '\.\.\/components\//g, "from '@/components/"],
  [/from '\.\/components\//g, "from '@/components/"],
  [/from '\.\.\/\.\.\/images\//g, "from '@/images/"],
  [/from '\.\.\/images\//g, "from '@/images/"],
  [/from '\.\/images\//g, "from '@/images/"],
  [/from '\.\/pages'/g, "from '@/pages'"],
  [/from '\.\.\/pages'/g, "from '@/pages'"],
  [/from '\.\/app'/g, "from '@/app'"],
  [/from '\.\.\/actions\//g, "from '@/services/actions/"],
  [/from '\.\.\/types\/index'/g, "from '@/services/types'"],
  [/from '\.\.\/types\/'/g, "from '@/services/types'"],
  [/from '\.\.\/types'/g, "from '@/services/types'"],
  [/from '\.\.\/store'/g, "from '@/services/store'"],
];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }
    if (!/\.(ts|tsx)$/.test(entry.name)) continue;

    let content = fs.readFileSync(fullPath, 'utf8');
    let changed = false;

    for (const [pattern, replacement] of replacements) {
      const next = content.replace(pattern, replacement);
      if (next !== content) {
        content = next;
        changed = true;
      }
    }

    if (changed) {
      fs.writeFileSync(fullPath, content);
      console.log('updated:', fullPath);
    }
  }
}

walk(srcDir);
