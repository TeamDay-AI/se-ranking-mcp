/**
 * Per-request credential isolation using AsyncLocalStorage.
 *
 * Importing this module sets up a global token provider that reads
 * credentials from the current async context. Use `tokenStore.run()`
 * to inject per-request tokens:
 *
 *   tokenStore.run({ data: 'xxx', project: 'yyy' }, async () => {
 *     // all BaseTool.getToken() calls here resolve to the injected tokens
 *   });
 *
 * When no async context is active (e.g. stdio mode), the provider
 * returns undefined and BaseTool falls back to environment variables.
 */
import { AsyncLocalStorage } from 'node:async_hooks';

import { ApiType, setTokenProvider } from './tools/base-tool.js';

export interface TokenContext {
  data?: string;
  project?: string;
}

export const tokenStore = new AsyncLocalStorage<TokenContext>();

// Wire the AsyncLocalStorage-backed provider into BaseTool.
// Returns undefined when no context is active, allowing env var fallback.
setTokenProvider((apiType: ApiType): string | undefined => {
  const ctx = tokenStore.getStore();
  if (!ctx) return undefined;
  return apiType === ApiType.DATA ? ctx.data : ctx.project;
});
