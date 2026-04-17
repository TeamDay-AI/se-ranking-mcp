import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import { ApiType, BaseTool } from '../../base-tool.js';
import { auditSettingsSchema } from './schemas/audit-settings.js';

export class ProjectUpdateAuditSettings extends BaseTool {
    protected apiType = ApiType.PROJECT;

    registerTool(server: McpServer): void {
        server.registerTool(
            this.toolName('updateAuditSettings'),
            {
                title: 'Update Audit Settings',
                description:
                    'Project Tool: Updates the configuration of an existing audit. Partial update — only fields you include are changed. Exceptions: disabled_issues and schedule_wdays are replace operations (the array you send replaces the full list). Use getAuditSettings first to read the current disabled_issues list before modifying. Sitemaps, source-pages, and the backward-compatible /audit/{id}/edit title endpoint (see updateAuditTitle) have separate tools.',
                inputSchema: {
                    audit_id: z.number().int().describe('Unique identifier of the audit to update.'),
                    settings: auditSettingsSchema
                        .optional()
                        .describe('Settings to apply. Omit a field to leave it unchanged.'),
                },
                annotations: this.annotations('writeIdempotent'),
            },
            async (params: { audit_id: number; settings?: Record<string, unknown> }) => {
                const { audit_id, ...body } = params;
                return this.makeJsonPostRequest(`/audit/${audit_id}/settings`, body);
            },
        );
    }
}
