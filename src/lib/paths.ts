/** Prefix local URLs when the site is hosted below a GitHub repository path. */
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(/\/$/, '');

export function withBasePath(path: string): string {
  return path.startsWith('/') ? `${basePath}${path}` : path;
}
