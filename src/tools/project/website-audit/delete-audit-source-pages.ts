import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import { ApiType, BaseTool } from '../../base-tool.js';

export class ProjectDeleteAuditSourcePages extends BaseTool {
    protected apiType = ApiType.PROJECT;

    registerTool(server: McpServer): void {
        server.registerTool(
            this.toolName('deleteAuditSourcePages'),
            {
                title: 'Delete Audit Source Pages',
                description:
                    'Project Tool: Removes an uploaded source-pages list from an audit. Does not toggle source_file off — leave that to updateAuditSettings if you want to disable custom-list crawling entirely.',
                inputSchema: {
                    audit_id: z.number().int().describe('Unique identifier of the audit.'),
                    list_id: z
                        .number()
                        .int()
                        .describe('Identifier of the source-pages list to remove (from listAuditSourcePages).'),
                },
                annotations: this.annotations('destructive'),
            },
            async (params: { audit_id: number; list_id: number }) =>
                this.makeDeleteRequest(
                    `/audit/${params.audit_id}/source-pages/${params.list_id}`,
                    {},
                ),
        );
    }
}
