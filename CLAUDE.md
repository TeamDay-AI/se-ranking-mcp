# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an MCP (Model Context Protocol) server that connects AI assistants to SE Ranking's SEO APIs. It provides ~190 tools organized into two API backends:
- **Data API** (`DATA_` prefix, host `api.seranking.com`): SEO analytics — keyword research, backlinks, domain analysis, SERP, website audits, account/credit info. Requires `DATA_API_TOKEN`.
- **Project API** (`PROJECT_` prefix, host `api4.seranking.com`): operations on projects owned by the authenticated account — rank tracking, competitors, backlink monitoring, marketing plan, sub-accounts, AIRT (AI Result Tracker). Requires `PROJECT_API_TOKEN`.

Tokens are not interchangeable. The Docker quickstart sets only `SERANKING_API_TOKEN` (Data-only); any `PROJECT_*` tool needs `PROJECT_API_TOKEN` set explicitly.

## Common Commands

```bash
# Build
npm run build

# Run tests (compiles first)
npm test

# Run only E2E tests (requires E2E_ENABLED=true and valid API tokens)
npm run test:e2e

# Watch mode for tests
npm run test:watch

# Lint and format
npm run lint
npm run lint:fix
npm run format

# Type checking
npm run typecheck

# Start servers
npm run start        # Stdio mode (standard MCP)
npm run start-http   # HTTP mode (Express server on port 5000)
```

## Architecture

### Tool Pattern

All tools extend `BaseTool` (`src/tools/base-tool.ts`) which provides:
- `apiType`: Set to `ApiType.DATA` or `ApiType.PROJECT` (defaults to `DATA`)
- `toolName(name)`: Prefixes with API type (e.g., `DATA_getDomainKeywords`)
- `registerTool(server)`: Abstract method each tool implements
- `annotations(kind)`: Returns MCP tool annotations for one of `'read' | 'write' | 'writeIdempotent' | 'destructive'`. An ESLint `no-restricted-syntax` rule blocks any `server.registerTool(...)` call whose options object doesn't declare `annotations` — use `this.annotations(...)` on every new tool.
- HTTP helpers:
  - `makeGetRequest(path, params)` — GET with query params
  - `makeBinaryGetRequest(path, params, mimeType?)` — GET that returns a binary blob as an MCP embedded resource (used for ZIP/image responses)
  - `makePostRequest(path, queryParams, formParams)` — POST multipart/form-data; `formParams` may contain `Blob`/`File` values which are passed through as-is for file uploads
  - `makeJsonPostRequest(path, body)` — POST with `Content-Type: application/json`
  - `makeBodylessPostRequest(path)` — POST with no body and no `Content-Type`. Use this for endpoints that reject `Content-Type: application/json` + `{}` (e.g. reset, recheck, delete on Project API `/audit/{id}/…`)
  - `makePutRequest(path, body)` — PUT with JSON body
  - `makePatchRequest(path, queryParams, body)` — PATCH with JSON body
  - `makeDeleteRequest(path, params)` — DELETE with query params
  - `makeJsonDeleteRequest(path, body)` — DELETE with JSON body
- `transformFilterParams()`: Converts `filter_volume_from` to `filter[volume][from]` for API calls

Example tool structure:
```typescript
export class GetDomainPages extends BaseTool {
    registerTool(server: McpServer): void {
        server.registerTool(
            this.toolName('getDomainPages'),  // Becomes DATA_getDomainPages
            {
                title: 'Domain Pages',
                description: 'Data Tool: ...',
                inputSchema: {
                    target: z.string().describe('...'),
                    // ... Zod schema definitions
                },
            },
            async (params) => this.makeGetRequest('/v1/domain/pages', this.transformFilterParams(params)),
        );
    }
}
```

### Directory Structure

```
src/
├── index.ts              # Stdio entry point
├── http-server.ts        # HTTP entry point (Express)
├── seo-api-mcp-server.ts # Main server - registers all tools
├── prompts.ts            # 5 built-in prompts for common workflows
├── tools/
│   ├── base-tool.ts      # Abstract base class
│   ├── data/             # Data API tools (~67 tools)
│   │   ├── account/      # Credit balance, subscription
│   │   ├── ai-search/
│   │   ├── backlinks/
│   │   ├── domain/
│   │   ├── keywords/
│   │   ├── serp/
│   │   └── website-audit/
│   │       └── schemas/  # Shared Zod schemas for Data-side audits
│   └── project/          # Project API tools (~122 tools)
│       ├── account/
│       ├── airt/         # AI Result Tracker (brands, LLM engines, prompts, prompt-groups)
│       ├── analytics/
│       ├── backlink-checker/
│       ├── competitors/
│       ├── keyword-groups/
│       ├── marketing-plan/
│       ├── project-groups/
│       ├── project-management/
│       ├── sub-accounts/
│       ├── system/
│       ├── url-tags/
│       └── website-audit/
│           └── schemas/  # Shared Zod schemas for Project-side audits
tests/
└── e2e/                  # E2E tests (disabled by default)
```

### Shared Zod schemas

Audit settings on the Project API side are shared across `createAudit` and `updateAuditSettings` via `src/tools/project/website-audit/schemas/audit-settings.ts`. Data side has its own parallel schema at `src/tools/data/website-audit/schemas/audit-settings.ts` (used by `createStandardAudit` and `createAdvancedAudit`).

**Do NOT share schemas across the Data ↔ Project boundary.** The two APIs live on different hosts and are owned by separate teams; a cross-API shared Zod would turn a one-sided backend change into a silent client-side bug. Overlap in field content is not the same as a shared contract.

### Token Resolution

BaseTool resolves tokens in this order:
1. Token provider function (set via `setTokenProvider()`)
2. Environment variables:
   - Data API: `DATA_API_TOKEN`, `SERANKING_DATA_API_TOKEN`, `SERANKING_API_TOKEN`
   - Project API: `PROJECT_API_TOKEN`, `SERANKING_PROJECT_API_TOKEN`
3. Empty string (a missing-token error is thrown before the request)

`SERANKING_API_TOKEN` authenticates **Data only** — it is deliberately not a fallback for Project, since the two backends have separate tokens.

## Adding New Tools

1. Create a new file in the appropriate `src/tools/data/` or `src/tools/project/` subdirectory
2. Extend `BaseTool` and set `apiType` if needed (defaults to `DATA`)
3. Implement `registerTool()` with:
   - A Zod `inputSchema` (all optional fields marked `.optional()`; use `.describe()` on every field — the descriptions are shown to the model)
   - An `annotations: this.annotations('read' | 'write' | 'writeIdempotent' | 'destructive')` block (the ESLint rule will block the PR otherwise)
4. Import and add the class to `dataTools` or `projectTools` array in `src/seo-api-mcp-server.ts`
5. If the tool touches an endpoint that accepts no body, use `makeBodylessPostRequest` (not `makeJsonPostRequest` with `{}` — Project API returns 400 Bad Request for the latter on several endpoints)

## Testing

E2E tests make real API calls and are disabled by default. To run them:

```bash
# Create .env with:
DATA_API_TOKEN=your-data-api-token
PROJECT_API_TOKEN=your-project-api-token
E2E_ENABLED=true

npm run test:e2e
```

Test pattern uses a mock server to capture the handler:
```typescript
const getHandler = (tool: BaseTool) => {
    let handler: any;
    const mockRegister = {
        registerTool: (_name: string, _def: any, cb: any) => { handler = cb; },
    } as unknown as McpServer;
    tool.register(mockRegister);
    return handler;
};
```

## API Rate Limits

- Data API: 10 requests/second
- Project API: 5 requests/second
