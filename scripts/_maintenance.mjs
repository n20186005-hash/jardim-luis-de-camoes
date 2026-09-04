import fs from 'node:fs';
import path from 'node:path';

const root = 'c:/Users/Administrator/Documents/GitHub/jardimluisdecamoes';

// 1) remove superseded files
for (const rel of ['public/robots.txt', 'scripts/optimize-gallery.ps1']) {
  const p = path.join(root, rel);
  try {
    fs.unlinkSync(p);
    console.log('deleted', rel);
  } catch (e) {
    console.log('skip delete', rel, e.code);
  }
}

// 2) rename gallery files to SEO-friendly names (no spaces/parentheses)
const dir = path.join(root, 'public', 'gallery');
for (let n = 1; n <= 16; n++) {
  const from = path.join(dir, `jardim-luis-de-camoes (${n}).jpg`);
  const to = path.join(dir, `jardim-luis-de-camoes-${n}.jpg`);
  if (fs.existsSync(from)) {
    fs.renameSync(from, to);
    console.log('renamed ->', `jardim-luis-de-camoes-${n}.jpg`);
  } else {
    console.log('missing source', from);
  }
}

console.log('gallery now:', fs.readdirSync(dir).sort().join('\n'));
