import { writeFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const out = new URL('../out/', import.meta.url);
await access(new URL('index.html', out));
await writeFile(new URL('.nojekyll', out), '');
await writeFile(new URL('preview-config.json', out), JSON.stringify({
  basePath: (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(/\/$/, ''),
}, null, 2));
console.log(`Static website ready: ${fileURLToPath(out)}`);
