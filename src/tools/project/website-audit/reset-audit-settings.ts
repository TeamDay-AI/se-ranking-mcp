import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import { ApiType, BaseTool } from '../../base-tool.js';

export class ProjectResetAuditSettings extends BaseTool {
    protected apiType = ApiType.PROJECT;

    registerTool(server: McpServer): void {
        server.registerTool(
            this.toolName('resetAuditSettings'),
            {
                title: 'Reset Audit Settings',
                description:
                    'Project Tool: Restores all audit settings to their defaults (crawl sources, limits, thresholds, schedule, notifications, disabled issues, disallow_ext). Returns 200 with an empty body on success. Does not remove sitemaps or source-pages lists — use the dedicated delete tools for those.',
                inputSchema: {
                    audit_id: z.number().int().describe('Unique identifier of the audit to reset.'),
                },
                annotations: this.annotations('writeIdempotent'),
            },
            async (params: { audit_id: number }) =>
                this.makeBodylessPostRequest(`/audit/${params.audit_id}/settings/reset`),
        );
    }
}
