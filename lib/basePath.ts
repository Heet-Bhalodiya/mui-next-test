export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/**
 * Adds the basePath to a given path
 * @param path - The path to prefix with basePath
 * @returns The path with basePath prefix
 */
export function withBasePath(path: string): string {
  if (!basePath) return path;

  // Remove trailing slash from basePath and leading slash from path
  const cleanBasePath = basePath.replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  return `${cleanBasePath}${cleanPath}`;
}

/**
 * Gets the asset URL with basePath
 * @param assetPath - The asset path (should start with /)
 * @returns The complete asset URL
 */
export function getAssetUrl(assetPath: string): string {
  return withBasePath(assetPath);
}
