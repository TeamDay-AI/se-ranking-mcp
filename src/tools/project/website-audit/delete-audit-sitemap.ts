import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import { ApiType, BaseTool } from '../../base-tool.js';

export class ProjectDeleteAuditSitemap extends BaseTool {
    protected apiType = ApiType.PROJECT;

    registerTool(server: McpServer): void {
        server.registerTool(
            this.toolName('deleteAuditSitemap'),
            {
                title: 'Delete Audit Sitemap',
                description:
                    'Project Tool: Removes a sitemap from an audit\'s crawl sources. Does not toggle source_sitemap off — leave that to updateAuditSettings if you want to disable sitemap crawling entirely.',
                inputSchema: {
                    audit_id: z.number().int().describe('Unique identifier of the audit.'),
                    sitemap_id: z
                        .number()
                        .int()
                        .describe('Identifier of the sitemap to remove (from listAuditSitemaps).'),
                },
                annotations: this.annotations('destructive'),
            },
            async (params: { audit_id: number; sitemap_id: number }) =>
                this.makeDeleteRequest(
                    `/audit/${params.audit_id}/sitemaps/${params.sitemap_id}`,
                    {},
                ),
        );
    }
}
