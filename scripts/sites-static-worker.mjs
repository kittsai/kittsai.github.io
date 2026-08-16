import { mkdir, rename, writeFile } from 'node:fs/promises';

const output = new URL('../dist/', import.meta.url);
const staticDir = new URL('../dist/static/', import.meta.url);
const serverDir = new URL('../dist/server/', import.meta.url);

await mkdir(staticDir, { recursive: true });
for (const entry of await import('node:fs/promises').then(({ readdir }) => readdir(output, { withFileTypes: true }))) {
  if (entry.name !== 'static' && entry.name !== 'server') {
    await rename(new URL(entry.name, output), new URL(entry.name, staticDir));
  }
}
await mkdir(serverDir, { recursive: true });

const worker = `export default {
  async fetch(request, env) {
    if (!env.ASSETS) {
      return new Response('Static asset binding unavailable', { status: 503 });
    }
    return env.ASSETS.fetch(request);
  }
};
`;

await writeFile(new URL('index.js', serverDir), worker);
