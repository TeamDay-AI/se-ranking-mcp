import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import { ApiType, BaseTool } from '../../base-tool.js';

export class ProjectGetAuditSettings extends BaseTool {
    protected apiType = ApiType.PROJECT;

    registerTool(server: McpServer): void {
        server.registerTool(
            this.toolName('getAuditSettings'),
            {
                title: 'Get Audit Settings',
                description:
                    'Project Tool: Returns the current audit configuration — crawl sources, limits, thresholds, schedule, notification recipients, disabled issue codes, ignored external URL patterns (disallow_ext), and audit engine version. Use this before calling updateAuditSettings for partial updates, especially when modifying the disabled_issues list (which is a replace operation).',
                inputSchema: {
                    audit_id: z.number().int().describe('Unique identifier of the audit.'),
                },
                annotations: this.annotations('read'),
            },
            async (params: { audit_id: number }) =>
                this.makeGetRequest(`/audit/${params.audit_id}/settings`, {}),
        );
    }
}
